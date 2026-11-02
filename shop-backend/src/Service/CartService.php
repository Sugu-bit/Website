<?php

namespace App\Service;

use App\Entity\Cart;
use App\Entity\User;
use App\Entity\ProductOption;
use App\Repository\CartRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;


class CartService
{
    private CartRepository $cartRepository;
    private EntityManagerInterface $entityManager;
    private ProductOptionService $productOptionService;
    private AuthorizationService $authorizationService;
    


    public function __construct(CartRepository $cartRepository, EntityManagerInterface $entityManager, ProductOptionService $productOptionService, AuthorizationService $authorizationService)
    {
        $this->cartRepository = $cartRepository;
        $this->entityManager = $entityManager;
        $this->productOptionService = $productOptionService;
        $this->authorizationService = $authorizationService;
    }

    public function getAllCartItems(): array
    {
        return $this->cartRepository->findAll();
    }

    public function getPaginatedCartItems(int $page, int $limit): array
    {
        return $this->cartRepository->findAllPaginated($page, $limit);
        
    }

    public function getUserCart(User $user): array
    {
        if (!$user) {
            throw new \Exception('User not found');
        }
        return $this->cartRepository->findCartItemsByUser($user);
    }

    public function getCartItemById(int $id): ?Cart
    {
        return $this->cartRepository->find($id);
    }

    public function getCartItemByIds(array $ids): array
    {
        return $this->cartRepository->findCartItemsByIds($ids);
    }

    public function getCartItemsByUserAndProductOption(User $user, ProductOption $productOption): array
    {
        if (!$user) {
            throw new \Exception('User not found');
        }

        if (!$productOption) {
            throw new \Exception('ProductOption not found');
        }

        return $this->cartRepository->findCartItemsByUserAndProductOption($user, $productOption);
    }

    public function createCartItem(User $user, array $data): Cart
    {
        // Lấy thông tin ProductOption từ ProductOptionService
        $productOption = $this->productOptionService->getProductOptionById($data['productOptionId']);
        if (!$productOption) {
            throw new \Exception('ProductOption not found');
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
        $existingCartItems = $this->getCartItemsByUserAndProductOption($user, $productOption);

        if (!empty($existingCartItems)) {
            // Nếu đã có, lấy mục giỏ hàng đầu tiên
            $cart = $existingCartItems[0];
            $newQuantity = $cart->getQuantity() + ($data['quantity'] ?? 1);

            if ($this->checkQuantity($productOption, $newQuantity)) {
                $cart->setQuantity($newQuantity);
            } else {
                throw new \Exception('Quantity exceeds the stock');
            }
        } else {
            // Nếu chưa có, tạo mới mục giỏ hàng
            $cart = new Cart();
            $cart->setUser($user)
                ->setProductOption($productOption)
                ->setCreatedAt(new \DateTime())
                ->setQuantity($data['quantity'] ?? 1);

            if (!$this->checkQuantity($productOption, $cart->getQuantity())) {
                throw new \Exception('Quantity exceeds the stock');
            }

            $this->entityManager->persist($cart);
        }

        // Lưu thay đổi vào cơ sở dữ liệu
        $this->entityManager->flush();

        return $cart;
    }

    public function checkQuantity(ProductOption $productOption, int $quantity): bool{
        if($productOption && $productOption->getStock() < $quantity){
            return false;
        }
        return true;
    }

    public function updateCartItem(int $id, array $data): Cart
    {
        $cart = $this->getCartItemById($id);

        if (!$cart) {
            throw new \Exception('Cart item not found');
        }

        $a =$this->authorizationService->checkPermission($data['userCurrent'], "edit_carts", $id, $cart->getUser()===$data['userCurrent']);
        if (!$a) {
            throw new AppException('E2021');
        }
        $cart->setQuantity($data['quantity'] ?? $cart->getQuantity());

        $this->entityManager->flush();

        return $cart;
    }

    public function deleteCartItem(int $id, User $user): void
    {
        $cart = $this->getCartItemById($id);

        if (!$cart) {
            throw new \Exception('Cart item not found');
        }
        $a = $this->authorizationService->checkPermission($user, "edit_carts", $id, $cart->getUser()===$user);
        if (!$a) {
            throw new AppException('E2021');
        }
        $this->entityManager->remove($cart);
        $this->entityManager->flush();
    }
}

<?php

namespace App\Service;

use App\Entity\Wishlist;
use App\Entity\User;
use App\Entity\Product;
use App\Repository\WishlistRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;


class WishlistService
{
    private WishlistRepository $wishlistRepository;
    private EntityManagerInterface $entityManager;
    private UserService $userService;
    private ProductService $productService;

    public function __construct(
        WishlistRepository $wishlistRepository,
        EntityManagerInterface $entityManager,
        UserService $userService,
        ProductService $productService
    ) {
        $this->wishlistRepository = $wishlistRepository;
        $this->entityManager = $entityManager;
        $this->userService = $userService;
        $this->productService = $productService;
    }

    public function getAllWishlistItems(): array
    {
        return $this->wishlistRepository->findAll();
    }

    public function getWishlistItemById(int $id): ?Wishlist
    {
        return $this->wishlistRepository->find($id);
    }

    public function createWishlistItem(array $data, User $user): Wishlist
    {
        $wishlist = new Wishlist();
        $product = $this->productService->getProductById($data['productId']);
        $wishlist->setUser($user)
                 ->setProduct($product)
                 ->setCreatedAt(new \DateTime());

        $this->entityManager->persist($wishlist);
        $this->entityManager->flush();

        return $wishlist;
    }

    public function deleteWishlistItem(int $id, User $user): void
    {
        $wishlist = $this->getWishlistItemById($id);

        if (!$wishlist) {
            throw new \Exception('Wishlist item not found');
        }
        if ($wishlist->getUser() != $user) {
            throw new AppException('E2021');
        }
        $this->entityManager->remove($wishlist);
        $this->entityManager->flush();
    }

    public function getWishlistItemsByUser(User $user): array
    {
        return $this->wishlistRepository->findByUser($user);
    }

    public function getWishlistItemsByProduct(Product $product): array
    {
        return $this->wishlistRepository->findByProduct($product);
    }

    public function getProductsByUser(User $user): array
    {   
        $wishlistItems = $this->getWishlistItemsByUser($user);
        $products = [];
        foreach ($wishlistItems as $item) {
            $products[] = $item->getProduct();
        }
        return $products;
    }
}

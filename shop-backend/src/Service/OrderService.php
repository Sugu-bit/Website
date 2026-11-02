<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Order;
use App\Repository\OrderRepository;
use App\Repository\OrderDetailRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;


class OrderService
{
    private OrderRepository $orderRepository;
    private EntityManagerInterface $entityManager;
    private UserService $userService;
    private CartService $cartService;
    private OrderDetailService $orderDetailService;
    private OrderDetailRepository $orderDetailRepository;
    private AuthorizationService $authorizationService;


    public function __construct(OrderRepository $orderRepository, EntityManagerInterface $entityManager, UserService $userService, CartService $cartService, OrderDetailService $orderDetailService, OrderDetailRepository $orderDetailRepository, AuthorizationService $authorizationService)
    {
        $this->orderRepository = $orderRepository;
        $this->entityManager = $entityManager;
        $this->userService = $userService;
        $this->cartService = $cartService;
        $this->orderDetailService = $orderDetailService;
        $this->orderDetailRepository = $orderDetailRepository;
        $this->authorizationService = $authorizationService;
    }

    public function findAllOrders(): array
    {
        return $this->orderRepository->findAll();
    }

    public function getAllOrders(): array
    {
        $orders = $this->orderRepository->findAll();
        $result = [];

        foreach ($orders as $order) {
            $orderDetails = $this->orderDetailRepository->findByOrder($order);
            $arr_prd = [];

            foreach ($orderDetails as $orderDetail) {
                $arr_prd[] = [
                    $orderDetail->getId(),
                    $orderDetail->getName(),
                    $orderDetail->getPrice(),
                    $orderDetail->getQuantity(),
                    $orderDetail->getUrl(),
                ];
            }

            $result[] = [$order, $arr_prd];
        }

        return $result;
    }

    public function getPaginatedOrders(int $page, int $limit): array
    {
        $orders = $this->orderRepository->findAllPaginated($page, $limit);
        $result = [];

        foreach ($orders as $order) {
            $orderDetails = $this->orderDetailRepository->findByOrder($order);
            $arr_prd = [];

            foreach ($orderDetails as $orderDetail) {
                $arr_prd[] = [
                    $orderDetail->getId(),
                    $orderDetail->getName(),
                    $orderDetail->getPrice(),
                    $orderDetail->getQuantity(),
                    $orderDetail->getUrl(),
                ];
            }

            $result[] = [$order, $arr_prd];
        }

        return $result;
    }

    public function findOrdersByUser(User $user): array
    {
        $orders = $this->orderRepository->findOrdersByUser($user);

        $result = [];
        foreach ($orders as $order) {
            $orderDetails = $this->orderDetailRepository->findByOrder($order);
            $arr_prd = [];

            foreach ($orderDetails as $orderDetail) {
                $arr_prd[] = [
                    $orderDetail->getId(),
                    $orderDetail->getName(),
                    $orderDetail->getPrice(),
                    $orderDetail->getQuantity(),
                    $orderDetail->getUrl(),
                ];
            }

            $result[] = [$order, $arr_prd];
        }

        return $result;
    }

    public function findOrderById(int $id): ?Order
    {
        return $this->orderRepository->find($id);
    }

    public function getOrderById(int $id): array
    {
        $order = $this->orderRepository->find($id);
        $arrOderDetail = $this->orderDetailRepository->findByOrder($order);
        $arr_prd = [];
        foreach ($arrOderDetail as $orderDetail) {
            $arr_prd[] = [$orderDetail->getId(), $orderDetail->getName(), $orderDetail->getPrice(), $orderDetail->getQuantity(), $orderDetail->getUrl()];
        }
        return [$order, $arr_prd];
    }

    public function createOrder(User $user, array $data): array
    {   
        $cartIds = $data['cart'] ?? [];
        if (empty($cartIds)) {
            throw new \Exception('Cart is empty');
        }

        $arrCart = $this->cartService->getCartItemByIds($cartIds);
        

        $subtotal = 0;
        $totalAmount = 0;
        if (count($arrCart)<1){
            throw new \Exception('Cart is empty');
        }
        foreach ($arrCart as $cartItem) {
            $productOption = $cartItem->getProductOption();
            $quantity = $cartItem->getQuantity();
            if ($quantity > $productOption->getStock()) {
                throw new \Exception('Sản phẩm bạn mua vượt quá số lượng tồn kho');
            }
            $subtotal += $quantity*$productOption->getPrice();
        }

        $totalAmount = $subtotal; // + phí vận chuyển - giảm giá (tính sau)

        $order = new Order();
        $order->setUser($user)
              ->setAddress($data['address'])
              ->setTotalAmount($totalAmount)
              ->setPaymentMethod($data['paymentMethod'] ?? throw new \Exception('Payment method is required'))
              ->setShippingStatus("Đơn hàng đã được tạo")
              ->setPaymentStatus(false)
            //   ->setShippingFee($data['shippingFee'] ?? 0.00)
            //   ->setProductDiscount(xử lí sau)
            //   ->setShipDiscount(xử lí sau)
              ->setCreatedAt(new \DateTime())
              ->setUpdatedAt(new \DateTime());
        
        $this->entityManager->persist($order);

        $arr = [];

        foreach ($arrCart as $cartItem){
            $orderDetail = $this->orderDetailService->createOrderDetail($cartItem, $order);
            $arr[] = [$orderDetail->getId(), $orderDetail->getName(), $orderDetail->getPrice(), $orderDetail->getQuantity(), $orderDetail->getUrl()];
        }
        $this->entityManager->flush();
        foreach ($arrCart as $cart){
            $this->entityManager->remove($cart);
        }
        $this->entityManager->flush();
        return [$order, $arr];
    }

    public function updateOrder(int $id, array $data): array
    {
        $order = $this->findOrderById($id);

        if (!$order) {
            throw new \Exception('Order not found');
        }

        $a =$this->authorizationService->checkPermission($data['userCurrent'], "update_shipping_status", $id, $order->getUser()===$data['userCurrent']);
        if (!$a) {
            throw new AppException('E2021');
        }

        $order->setAddress($data['address'])
            //   ->setTotalAmount("xử lí sau")
            //   ->setShippingStatus("Xử lí sau")
            //   ->setPaymentStatus("Xử lí sau")
            //   ->setShippingFee("Xử lí sau")
              ->setUpdatedAt(new \DateTime());
        $this->entityManager->flush();

        $arrOderDetail = $this->orderDetailRepository->findByOrder($order);
        $arr_prd = [];
        foreach ($arrOderDetail as $orderDetail) {
            $arr_prd[] = [$orderDetail->getId(), $orderDetail->getName(), $orderDetail->getPrice(), $orderDetail->getQuantity(), $orderDetail->getUrl()];
        }
        return  [$order, $arr_prd];
    }

    public function deleteOrder(int $id): void
    {
        $order = $this->findOrderById($id);

        if (!$order) {
            throw new \Exception('Order not found');
        }

        $this->entityManager->remove($order);
        $this->entityManager->flush();
    }
}

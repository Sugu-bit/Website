<?php

namespace App\Controller\Api;

use App\Service\OrderService;
use App\Service\AuthorizationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;
use App\Dto\OrderDto;

#[Route('/api/orders', name: 'order_')]
class OrderController extends AbstractController
{
    private OrderService $orderService;
    private AuthorizationService $authorizationService;

    public function __construct(OrderService $orderService, AuthorizationService $authorizationService)
    {
        $this->orderService = $orderService;
        $this->authorizationService = $authorizationService;
    }

    #[Route('/all', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        // Lấy tham số phân trang từ request
        $page = (int) $request->query->get('page', 1);
        $limit = (int) $request->query->get('limit', 10);

        if ($page < 1 || $limit < 1) {
            throw new AppException('Invalid pagination parameters');
        }

        // Kiểm tra quyền
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent) {
            throw new AppException('E2025');
        }

        $hasPermission = $this->authorizationService->checkPermission($userCurrent, "view_orders");
        if (!$hasPermission) {
            throw new AppException('E2020');
        }

        // Lấy danh sách đơn hàng theo phân trang
        $orders = $this->orderService->getPaginatedOrders($page, $limit);
        $orderDtos = array_map(fn($order) => new OrderDto($order), $orders);

        return $this->json($orderDtos);
    }

    #[Route('', name: 'user_orders', methods: ['GET'])]
    public function userOrders(Request $request): JsonResponse
    {
        $user = $request->attributes->get('user');

        if (!$user){
            throw new AppException('E2025');
        }

        try {
            $orders = $this->orderService->findOrdersByUser($user);
            $orderDtos = array_map(fn($order) => new OrderDto($order), $orders);
            return $this->json($orderDtos);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 500);
        }
    }

    #[Route('/{id}', name: 'detail', methods: ['GET'])]
    public function detail(int $id): JsonResponse
    {
        $order = $this->orderService->getOrderById($id);

        if (!$order) {
            throw new AppException('Order not found', 404);
        }
        return $this->json(new OrderDto($order));
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $user = $request->attributes->get('user');
        if (!$user){
            throw new AppException('E2025');
        }
        $data = json_decode($request->getContent(), true);

        try {
            $order = $this->orderService->createOrder($user, $data);
            return $this->json(new OrderDto($order), 201);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 500);
        }
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, int $id): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $data = json_decode($request->getContent(), true);
        $data['userCurrent'] = $userCurrent;
        try {
            $order = $this->orderService->updateOrder($id, $data);
            return $this->json(new OrderDto($order));
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 500);
        }
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Request $request, int $id): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $hasPermission = $this->authorizationService->checkPermission($userCurrent, "delete_order", $id);
        if (!$hasPermission) {
            throw new AppException('E2020');
        }
        try {
            $this->orderService->deleteOrder($id);
            return $this->json(['message' => 'Order deleted']);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 500);
        }
    }
}

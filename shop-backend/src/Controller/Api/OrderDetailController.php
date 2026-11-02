<?php

namespace App\Controller\Api;

use App\Service\OrderDetailService;
use App\Service\AuthorizationService;
use App\Dto\OrderDetailDto;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/order-details', name: 'order_detail_')]
class OrderDetailController extends AbstractController
{
    private OrderDetailService $orderDetailService;
    private AuthorizationService $authorizationService;

    public function __construct(OrderDetailService $orderDetailService, AuthorizationService $authorizationService)
    {
        $this->orderDetailService = $orderDetailService;
        $this->authorizationService = $authorizationService;
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        try {
            $orderDetails = $this->orderDetailService->getAllOrderDetails();
            $orderDetailDtos = array_map(
                fn($orderDetail) => new OrderDetailDto($orderDetail),
                $orderDetails
            );

            return $this->json($orderDetailDtos);
        } catch (\Throwable $e) {
            return $this->json(['message' => 'Unable to fetch order details', 'error' => $e->getMessage()], 500);
        }
    }

    #[Route('/{id}', name: 'detail', methods: ['GET'])]
    public function detail(int $id): JsonResponse
    {
        try {
            $orderDetail = $this->orderDetailService->getOrderDetailById($id);

            if (!$orderDetail) {
                return $this->json(['message' => 'Order detail not found'], 404);
            }

            return $this->json(new OrderDetailDto($orderDetail));
        } catch (\Throwable $e) {
            return $this->json(['message' => 'Unable to fetch order detail', 'error' => $e->getMessage()], 500);
        }
    }
}

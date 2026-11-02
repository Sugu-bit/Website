<?php

namespace App\Controller\Api;

use App\Service\CouponService;
use App\Service\AuthorizationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;
use App\Dto\CouponDto;



#[Route('/api/coupons', name: 'coupon_')]
class CouponController extends AbstractController
{
    private CouponService $couponService;
    private AuthorizationService $authorizationService;

    public function __construct(CouponService $couponService, AuthorizationService $authorizationService)
    {
        $this->couponService = $couponService;
        $this->authorizationService = $authorizationService;
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "view_coupons");
        if (!$a) {
            throw new AppException('E2020');
        }
        try {
            $coupons = $this->couponService->getAllCoupons();
            $couponDtos = array_map(fn($coupon) => new CouponDto($coupon), $coupons);
            return $this->json($couponDtos);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Failed to fetch coupons', 'error' => $e->getMessage()], 500);
        }
    }

    #[Route('/{id}', name: 'detail', methods: ['GET'])]
    public function detail(int $id, Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "view_coupons");
        if (!$a) {
            throw new AppException('E2020');
        }
        try {
            $coupon = $this->couponService->getCouponById($id);
            if (!$coupon) {
                throw new AppException('Coupon not found', 404);
            }
            return $this->json(new CouponDto($coupon));
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], $e->getCode());
        } catch (\Exception $e) {
            return $this->json(['message' => 'Internal server error'], 500);
        }
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "create_coupon");
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);
        try {
            $coupon = $this->couponService->createCoupon($data);
            return $this->json(new CouponDto($coupon), 201);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Internal server error'], 500);
        }
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, int $id): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "cedit_coupon");
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);
        try {
            $coupon = $this->couponService->updateCoupon($id, $data);
            return $this->json(new CouponDto($coupon));
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Internal server error'], 500);
        }
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id, Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "delete_coupon");
        if (!$a) {
            throw new AppException('E2021');
        }
        try {
            $this->couponService->deleteCoupon($id);
            return $this->json(['message' => 'Coupon deleted']);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Internal server error'], 500);
        }
    }
}

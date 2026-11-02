<?php

namespace App\Service;

use App\Entity\Coupon;
use App\Repository\CouponRepository;
use Doctrine\ORM\EntityManagerInterface;

class CouponService
{
    private CouponRepository $couponRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(CouponRepository $couponRepository, EntityManagerInterface $entityManager)
    {
        $this->couponRepository = $couponRepository;
        $this->entityManager = $entityManager;
    }

    public function getAllCoupons(): array
    {
        return $this->couponRepository->findAll();
    }

    public function getCouponById(int $id): ?Coupon
    {
        return $this->couponRepository->find($id);
    }

    public function createCoupon(array $data): Coupon
    {
        $coupon = new Coupon();
        $coupon->setCode($data['code'] ?? throw new \Exception('Code is required'))
               ->setDiscount($data['discount'] ?? throw new \Exception('Discount is required'))
               ->setStartDate(new \DateTime($data['startDate'] ?? 'now'))
               ->setEndDate(new \DateTime($data['endDate'] ?? 'now'))
               ->setActive($data['isActive'] ?? true);

        $this->entityManager->persist($coupon);
        $this->entityManager->flush();

        return $coupon;
    }

    public function updateCoupon(int $id, array $data): Coupon
    {
        $coupon = $this->getCouponById($id);

        if (!$coupon) {
            throw new \Exception('Coupon not found');
        }

        $coupon->setCode($data['code'] ?? $coupon->getCode())
               ->setDiscount($data['discount'] ?? $coupon->getDiscount())
               ->setStartDate(new \DateTime($data['startDate'] ?? $coupon->getStartDate()->format('Y-m-d')))
               ->setEndDate(new \DateTime($data['endDate'] ?? $coupon->getEndDate()->format('Y-m-d')))
               ->setActive($data['isActive'] ?? $coupon->isActive());

        $this->entityManager->flush();

        return $coupon;
    }

    public function deleteCoupon(int $id): void
    {
        $coupon = $this->getCouponById($id);

        if (!$coupon) {
            throw new \Exception('Coupon not found');
        }

        $this->entityManager->remove($coupon);
        $this->entityManager->flush();
    }
}

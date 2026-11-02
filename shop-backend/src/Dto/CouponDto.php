<?php

namespace App\Dto;

use App\Entity\Coupon;

class CouponDto
{
    public int $id;
    public string $code;
    public ?float $discount;
    public \DateTimeInterface $startDate;
    public \DateTimeInterface $endDate;
    public bool $isActive;

    public function __construct(Coupon $coupon)
    {
        $this->id = $coupon->getId();
        $this->code = $coupon->getCode();
        $this->discount = $coupon->getDiscount();
        $this->startDate = $coupon->getStartDate();
        $this->endDate = $coupon->getEndDate();
        $this->isActive = $coupon->isActive();
    }
}

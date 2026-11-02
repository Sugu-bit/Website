<?php

namespace App\Dto;

use App\Entity\Order;

class OrderDto
{
    public ?int $id;
    public ?int $userId;
    public ?float $totalAmount;
    public ?string $address=null;
    public ?string $paymentMethod;
    public ?string $shippingStatus;
    public ?bool $paymentStatus;
    public ?float $shippingFee;
    public ?float $productDiscount = null;
    public ?float $shipDiscount = null;
    public ?array $products;
    public \DateTime $createdAt;
    public \DateTime $updatedAt;

    public function __construct(array $arr)
    {
        $this->id = $arr[0]->getId();
        $this->userId = $arr[0]->getUser()->getId();
        $this->totalAmount = $arr[0]->getTotalAmount();
        $this->address = $arr[0]->getAddress();
        $this->paymentMethod = $arr[0]->getPaymentMethod();
        $this->shippingStatus = $arr[0]->getShippingStatus();
        $this->paymentStatus = $arr[0]->getPaymentStatus();
        $this->shippingFee = $arr[0]->getShippingFee();
        $this->productDiscount = $arr[0]->getProductDiscount();
        $this->shipDiscount = $arr[0]->getShipDiscount();
        $this->createdAt = $arr[0]->getCreatedAt();
        $this->updatedAt = $arr[0]->getUpdatedAt();
        $this->products = $arr[1];
    }
}

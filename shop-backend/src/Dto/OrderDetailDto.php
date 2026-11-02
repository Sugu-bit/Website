<?php

namespace App\Dto;

use App\Entity\OrderDetail;

class OrderDetailDto
{
    public ?int $id;
    public ?String $name;
    public ?int $orderId;
    public ?int $quantity;
    public ?int $productId;
    public ?float $price;
    public ?String $url=null;
    public ?String $attribute=null;

    public function __construct(OrderDetail $orderDetail)
    {
        $this->id = $orderDetail->getId();
        $this->name = $orderDetail->getName();
        $this->orderId = $orderDetail->getOrder()->getId();
        $this->quantity = $orderDetail->getQuantity();
        $this->productId = $orderDetail->getProduct()->getId();
        $this->price = $orderDetail->getPrice();
        $this->url = $orderDetail->getUrl();
        $this->attribute = $orderDetail->getAttribute();
    }
}

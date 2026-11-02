<?php

namespace App\Dto;

use App\Entity\Cart;

class CartDto
{
    public int $id;
    public int $quantity;
    public int $stock;
    public float $price;
    public string $createdAt;
    public int $userId;
    public int $productId;
    public ?array $attributes=null;


    public function __construct(Cart $cart, array $attributes=null)
    {
        $this->id = $cart->getId();
        $this->quantity = $cart->getQuantity();
        $this->createdAt = $cart->getCreatedAt()->format('Y-m-d H:i:s');
        $this->userId = $cart->getUser()->getId();
        $po = $cart->getProductOption();
        $this->stock = $po->getStock();
        $this->price = $po->getPrice();
        $this->productId = $cart->getProductOption()->getProduct()->getId();
        $this->attributes = $attributes;
    }
}

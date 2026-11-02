<?php

namespace App\Dto;

use App\Entity\ProductOption;


class ProductOptionDto
{
    public ?int $id;
    public ?float $price;
    public ?int $stock;
    

    public function __construct(ProductOption $productOption)
    {
        $this->id = $productOption->getId();
        $this->price = $productOption->getPrice();
        $this->stock = $productOption->getStock();
    }

}

<?php

namespace App\Dto;

class ProductDto
{
    public int $id;
    public string $name;
    public ?string $description=null;
    public ?int $price=null;
    public ?int $stock=null;
    public ?string $locationAddress=null;
    public ?int $categoryId=null;
    public ?array $attributes=null;
    public ?int $discountPercentage=null;
    public ?int $popularity=null;
    public ?array $options=null;

    public function __construct(array $result)
    {
        $this->id = isset($result['id']) ? $result['id'] : $this->id;
        $this->name = isset($result['name']) ? $result['name'] : $this->name;
        $this->description = isset($result['description']) ? $result['description'] : $this->description;
        $this->price = isset($result['price']) ? $result['price'] : $this->price;
        $this->stock = isset($result['stock']) ? $result['stock'] : $this->stock;
        $this->locationAddress = isset($result['locationAddress']) ? $result['locationAddress'] : $this->locationAddress;
        $this->categoryId = isset($result['categoryId']) ? $result['categoryId'] : $this->categoryId;
        $this->attributes = isset($result['attribute']) ? $result['attribute'] : $this->attributes;
        $this->discountPercentage = isset($result['discountPercentage'])? $result['discountPercentage'] : $this->discountPercentage;
        $this->popularity = isset($result['popularity']) ? $result['popularity'] : $this->popularity;
        $this->options = isset($result['options']) ? $result['options'] : $this->options;
    }

}

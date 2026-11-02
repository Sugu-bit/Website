<?php

namespace App\Entity;

use App\Repository\ProductOptionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductOptionRepository::class)]
#[ORM\Table(name: 'product_options')]
class ProductOption
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'bigint')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Product::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2, nullable: true)]
    private ?float $price;

    #[ORM\Column(type: 'integer')]
    private int $stock;

    // Getters and Setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): Product
    {
        return $this->product;
    }

    public function setProduct(Product $product): static
    {
        $this->product = $product;
        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): static
    {
        $this->price = $price;
        return $this;
    }

    public function getStock(): int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;
        return $this;
    }
}

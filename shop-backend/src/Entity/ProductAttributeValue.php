<?php

namespace App\Entity;

use App\Repository\ProductAttributeValueRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductAttributeValueRepository::class)]
#[ORM\Table(name: 'product_attribute_values')]
class ProductAttributeValue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'bigint')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: ProductAttribute::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?ProductAttribute $attribute; 
    
    #[ORM\Column(type: 'string', length: 50)]
    private string $value;

    // Getters and Setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAttribute(): ProductAttribute
    {
        return $this->attribute;
    }

    public function setAttribute(ProductAttribute $attribute): static
    {
        $this->attribute = $attribute;
        return $this;
    }

    public function getValue(): string
    {
        return $this->value;
    }

    public function setValue(string $value): static
    {
        $this->value = $value;
        return $this;
    }
}

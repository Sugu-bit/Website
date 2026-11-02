<?php

namespace App\Entity;

use App\Repository\ProductOptionValueRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductOptionValueRepository::class)]
#[ORM\Table(name: 'product_option_values')]
class ProductOptionValue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'bigint')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: ProductOption::class)]
    #[ORM\JoinColumn(name: 'option_id', referencedColumnName: 'id')]
    private ?ProductOption $productOption = null;

    #[ORM\ManyToOne(targetEntity: ProductAttributeValue::class)]
    #[ORM\JoinColumn(name: 'attribute_value_id', referencedColumnName: 'id')]
    private ?ProductAttributeValue $productAttributeValue = null;

    // Getters and Setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductOption(): ?ProductOption
    {
        return $this->productOption;
    }

    public function setProductOption(?ProductOption $productOption): static
    {
        $this->productOption = $productOption;
        return $this;
    }

    public function getProductAttributeValue(): ?ProductAttributeValue
    {
        return $this->productAttributeValue;
    }

    public function setProductAttributeValue(?ProductAttributeValue $productAttributeValue): static
    {
        $this->productAttributeValue = $productAttributeValue;
        return $this;
    }
}

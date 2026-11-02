<?php

namespace App\Service;

use App\Entity\ProductAttribute;
use App\Entity\ProductAttributeValue;
use App\Repository\ProductAttributeValueRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;

class ProductAttributeValueService
{
    private EntityManagerInterface $entityManager;
    private ProductAttributeValueRepository $productAttributeValueRepository;

    public function __construct(EntityManagerInterface $entityManager, ProductAttributeValueRepository $productAttributeValueRepository)
    {
        $this->entityManager = $entityManager;
        $this->productAttributeValueRepository = $productAttributeValueRepository;
    }

    public function createProductAttributeValue(ProductAttribute $productAttribute, string $value): ProductAttributeValue
    {
        $productAttributeValue = new ProductAttributeValue();
        $productAttributeValue->setAttribute($productAttribute)
                              ->setValue($value);

        $this->entityManager->persist($productAttributeValue);
        $this->entityManager->flush();

        return $productAttributeValue;
    }

    public function updateProductAttributeValue(ProductAttributeValue $productAttributeValue, string $value): ProductAttributeValue
    {
        if (isset($value)) {
            $productAttributeValue->setValue($value);
        }

        $this->entityManager->flush();

        return $productAttributeValue;
    }

    public function getValuesByAttributeId(int $attributeId): array
    {
        return $this->entityManager->getRepository(ProductAttributeValue::class)->findByAttributeId($attributeId);
    }

    public function deleteProductAttributeValue(ProductAttributeValue $productAttributeValue): void
    {
        $this->entityManager->remove($productAttributeValue);
        $this->entityManager->flush();
    }

    public function findByAttribute(ProductAttribute $productAttribute): array
    {
        return $this->productAttributeValueRepository->findBy(['attribute' => $productAttribute]);
    }

    public function findByValueAndAttribute(string $value, ProductAttribute $productAttribute): ?ProductAttributeValue
    {
        return $this->productAttributeValueRepository->findOneBy(['value' => $value, 'attribute' => $productAttribute]);
    }
}

<?php

namespace App\Service;

use App\Entity\ProductOption;
use App\Entity\ProductAttributeValue;
use App\Entity\ProductOptionValue;
use App\Repository\ProductOptionValueRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;

class ProductOptionValueService
{
    private EntityManagerInterface $entityManager;
    private ProductOptionValueRepository $productOptionValueRepository;

    public function __construct(EntityManagerInterface $entityManager, ProductOptionValueRepository $productOptionValueRepository)
    {
        $this->entityManager = $entityManager;
        $this->productOptionValueRepository = $productOptionValueRepository;
    }

    public function createProductOptionValue(ProductOption $productOption, ProductAttributeValue $productAttributeValue): ProductOptionValue
    {
        $productOptionValue = new ProductOptionValue();
        $productOptionValue->setProductOption($productOption)
                           ->setProductAttributeValue($productAttributeValue);

        $this->entityManager->persist($productOptionValue);
        $this->entityManager->flush();

        return $productOptionValue;
    }

    public function updateProductOptionValue(ProductOptionValue $productOptionValue, ProductOption $productOption, ProductAttributeValue $productAttributeValue): ProductOptionValue
    {
        if (isset($productOption)) {
            $productOptionValue->setProductOption($productOption);
        }

        if (isset($productAttributeValue)) {
            $productOptionValue->setProductAttributeValue($productAttributeValue);
        }

        $this->entityManager->flush();

        return $productOptionValue;
    }

    public function getValuesByOptionId(int $optionId): array
    {
        return $this->entityManager->getRepository(ProductOptionValue::class)->findByOptionId($optionId);
    }

    public function getValuesByAttributeValueId(int $attributeValueId): array
    {
        return $this->entityManager->getRepository(ProductOptionValue::class)->findByAttributeValueId($attributeValueId);
    }

    public function deleteProductOptionValue(ProductOptionValue $productOptionValue): void
    {
        $this->entityManager->remove($productOptionValue);
        $this->entityManager->flush();
    }

    public function findByOption(ProductOption $productOption): array
    {
        return $this->productOptionValueRepository->findBy(['productOption' => $productOption]);
    }

    public function findByValueAndOption(ProductAttributeValue $attributeValue, ProductOption $productOption): ?ProductOptionValue
    {
        return $this->productOptionValueRepository->findOneBy([
            'productOption' => $productOption,
            'productAttributeValue' => $attributeValue
        ]);
    }
}

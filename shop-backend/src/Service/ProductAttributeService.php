<?php

namespace App\Service;

use App\Entity\Product;
use App\Entity\ProductAttribute;
use App\Repository\ProductAttributeRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;

class ProductAttributeService
{
    private EntityManagerInterface $entityManager;
    private ProductAttributeRepository $productAttributeRepository;

    public function __construct(EntityManagerInterface $entityManager, ProductAttributeRepository $productAttributeRepository)
    {
        $this->entityManager = $entityManager;
        $this->productAttributeRepository = $productAttributeRepository;
    }

    public function createProductAttribute(Product $product, string $name): ProductAttribute
    {
        $productAttribute = new ProductAttribute();
        $productAttribute->setProduct($product)
                         ->setName($name);

        $this->entityManager->persist($productAttribute);
        $this->entityManager->flush();

        return $productAttribute;
    }

    public function updateProductAttribute(int $id, string $name): ProductAttribute
    {
        $productAttribute = $this->getProductAttributeById($id);
        $productAttribute->setName($name);

        $this->entityManager->flush();

        return $productAttribute;
    }

    public function getProductAttributeById(int $id): ProductAttribute
    {
        return $this->entityManager->getRepository(ProductAttribute::class)->find($id);
    }

    public function getAttributesByProductId(int $productId): array
    {
        return $this->entityManager->getRepository(ProductAttribute::class)->findByProductId($productId);
    }

    public function deleteProductAttribute(int $id): void
    {
        $productAttribute = $this->getProductAttributeById($id);
        $this->entityManager->remove($productAttribute);
        $this->entityManager->flush();
    }

    public function findByProduct(Product $product): array
    {
        return $this->productAttributeRepository->findBy(['product' => $product]);
    }

    public function findByNameAndProduct(string $name, Product $product): ?ProductAttribute
    {
        return $this->productAttributeRepository->findOneBy(['name' => $name, 'product' => $product]);
    }
}

<?php

namespace App\Service;

use App\Entity\Product;
use App\Entity\ProductOption;
use App\Repository\ProductOptionRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;

class ProductOptionService
{
    private EntityManagerInterface $entityManager;
    private ProductOptionRepository $productOptionRepository;

    public function __construct(EntityManagerInterface $entityManager, ProductOptionRepository $productOptionRepository)
    {
        $this->entityManager = $entityManager;
        $this->productOptionRepository = $productOptionRepository;
    }

    public function createProductOption(Product $product, ?float $price, int $stock): ProductOption
    {
        $productOption = new ProductOption();
        $productOption->setProduct($product)
                      ->setPrice($price)
                      ->setStock($stock);

        $this->entityManager->persist($productOption);
        $this->entityManager->flush();

        return $productOption;
    }

    public function updateProductOption(ProductOption $productOption, ?float $price, ?int $stock): ProductOption
    {
        if (isset($price)) {
            $productOption->setPrice($price);
        }

        if (isset($stock)) {
            $productOption->setStock($stock);
        }

        $this->entityManager->flush();

        return $productOption;
    }

    public function getProductOptionById(int $id):?ProductOption
    {
        return $this->entityManager->getRepository(ProductOption::class)->find($id);
    }

    public function getProductOptionsByProductId(int $productId): array
    {
        return $this->entityManager->getRepository(ProductOption::class)->findByProductId($productId);
    }

    public function updateStock(int $id, int $newStock): void
    {
        $repository = $this->entityManager->getRepository(ProductOption::class);
        $repository->updateStock($id, $newStock);
    }

    public function deleteProductOption(ProductOption $productOption): void
    {
        $this->entityManager->remove($productOption);
        $this->entityManager->flush();
    }

    public function findByProduct(Product $product): array
    {
        return $this->productOptionRepository->findBy(['product' => $product]);
    }

}

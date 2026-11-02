<?php

namespace App\Repository;

use App\Entity\ProductAttribute;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProductAttribute>
 */
class ProductAttributeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductAttribute::class);
    }

    public function findByProductId(int $productId): array
    {
        return $this->createQueryBuilder('pa')
            ->where('pa.productId = :productId')
            ->setParameter('productId', $productId)
            ->orderBy('pa.name', 'ASC')
            ->getQuery()
            ->getResult();
    }
}

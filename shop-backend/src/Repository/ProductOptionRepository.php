<?php

namespace App\Repository;

use App\Entity\ProductOption;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProductOption>
 */
class ProductOptionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductOption::class);
    }

    public function findByProductId(int $productId): array
    {
        return $this->createQueryBuilder('po')
            ->where('po.productId = :productId')
            ->setParameter('productId', $productId)
            ->orderBy('po.price', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function updateStock(int $id, int $newStock): void
    {
        $this->createQueryBuilder('po')
            ->update()
            ->set('po.stock', ':stock')
            ->where('po.id = :id')
            ->setParameter('stock', $newStock)
            ->setParameter('id', $id)
            ->getQuery()
            ->execute();
    }
}

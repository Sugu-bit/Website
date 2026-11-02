<?php

namespace App\Repository;

use App\Entity\ProductOptionValue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProductOptionValue>
 */
class ProductOptionValueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductOptionValue::class);
    }

    public function findByOptionId(int $optionId): array
    {
        return $this->createQueryBuilder('pov')
            ->where('pov.option_id = :optionId')
            ->setParameter('optionId', $optionId)
            ->getQuery()
            ->getResult();
    }

    public function findByAttributeValueId(int $attributeValueId): array
    {
        return $this->createQueryBuilder('pov')
            ->where('pov.attribute_value_id = :attributeValueId')
            ->setParameter('attributeValueId', $attributeValueId)
            ->getQuery()
            ->getResult();
    }
}

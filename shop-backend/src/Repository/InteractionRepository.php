<?php

namespace App\Repository;

use App\Entity\Interaction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Interaction>
 */
class InteractionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Interaction::class);
    }

    public function findByUserId(int $userId): array
    {
        return $this->createQueryBuilder('i')
            ->where('i.user = :userId')
            ->setParameter('userId', $userId)
            ->orderBy('i.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findByProductId(int $productId): array
    {
        return $this->createQueryBuilder('i')
            ->where('i.product = :productId')
            ->setParameter('productId', $productId)
            ->orderBy('i.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function countByActionId(int $actionId): int
    {
        return $this->createQueryBuilder('i')
            ->select('COUNT(i.id)')
            ->where('i.action = :actionId')
            ->setParameter('actionId', $actionId)
            ->getQuery()
            ->getSingleScalarResult();
    }
}

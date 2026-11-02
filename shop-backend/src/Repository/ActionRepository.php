<?php

namespace App\Repository;

use App\Entity\Action;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Action>
 */
class ActionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Action::class);
    }

    public function findById(string $id): ?Action
    {
        return $this->findOneBy(['id' => $id]);
    }

    public function findByName(string $name): ?Action
    {
        return $this->findOneBy(['name' => $name]);
    }

    public function findAllOrderedByScore(): array
    {
        return $this->createQueryBuilder('a')
            ->orderBy('a.score', 'DESC')
            ->getQuery()
            ->getResult();
    }
}

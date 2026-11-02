<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findActiveUsersPaginated(int $page, int $limit): array
    {
        $queryBuilder = $this->createQueryBuilder('u')
            ->where('u.isActive = :isActive')
            ->setParameter('isActive', true)
            ->orderBy('u.id', 'ASC')
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit);

        return $queryBuilder->getQuery()->getResult();
    }

    public function findUserById(int $id): ?User
    {
        return $this->createQueryBuilder('u')
            ->where('u.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findUserByUsername(string $username): ?User
    {
        return $this->createQueryBuilder('u')
            ->where('u.username = :username')
            ->setParameter('username', $username)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findUserByEmail(string $email): ?User
    {
        return $this->createQueryBuilder('u')
            ->where('u.email = :email')
            ->setParameter('email', $email)
            ->getQuery()
            ->getOneOrNullResult();
    }
}

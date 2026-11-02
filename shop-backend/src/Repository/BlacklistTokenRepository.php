<?php

namespace App\Repository;

use App\Entity\BlacklistToken;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BlacklistToken>
 *
 * @method BlacklistToken|null find($id, $lockMode = null, $lockVersion = null)
 * @method BlacklistToken|null findOneBy(array $criteria, array $orderBy = null)
 * @method BlacklistToken[]    findAll()
 * @method BlacklistToken[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BlacklistTokenRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BlacklistToken::class);
    }

    /**
     * Delete all expired tokens from the database.
     */
    public function deleteExpiredTokens(): void
    {
        $qb = $this->createQueryBuilder('t')
            ->delete()
            ->where('t.expiresAt < :now')
            ->setParameter('now', new \DateTime());

        $qb->getQuery()->execute();
    }
}

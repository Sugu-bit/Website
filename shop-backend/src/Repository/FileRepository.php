<?php

namespace App\Repository;

use App\Entity\File;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * @extends ServiceEntityRepository<File>
 */
class FileRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, File::class);
    }

    public function findByTarget(string $listTableId, int $targetId, bool $onlyActive = true): array
    {
        $qb = $this->createQueryBuilder('f')
            ->andWhere('f.listTable = :listTableId')
            ->andWhere('f.targetId = :targetId')
            ->setParameter('listTableId', $listTableId)
            ->setParameter('targetId', $targetId);

        if ($onlyActive) {
            $qb->andWhere('f.isActive = true');
        }

        return $qb->getQuery()->getResult();
    }

    public function findInactiveFiles(): array
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.isActive = false')
            ->getQuery()
            ->getResult();
    }

    public function findByName(string $fileName): array
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.fileName LIKE :fileName')
            ->setParameter('fileName', "%$fileName%")
            ->getQuery()
            ->getResult();
    }

    public function findById(int $id): ?File
    {
        return $this->find($id);
    }

    public function findAllPaginated(int $page, int $limit): Paginator
    {
        $query = $this->createQueryBuilder('f')
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery();

        return new Paginator($query);
    }

    public function remove(File $file, bool $flush = true): void
    {
        $this->_em->remove($file);
        if ($flush) {
            $this->_em->flush();
        }
    }
}

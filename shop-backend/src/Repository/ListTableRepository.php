<?php
// src/Repository/ListTableRepository.php

namespace App\Repository;

use App\Entity\ListTable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ListTable>
 */
class ListTableRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ListTable::class);
    }

    public function save(ListTable $listTable): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->persist($listTable);
        $entityManager->flush();
    }

    public function delete(ListTable $listTable): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->remove($listTable);
        $entityManager->flush();
    }

    public function findByTableName(string $tableName): ?ListTable
    {
        return $this->find($tableName);
    }

    public function findById(string $id): ?ListTable
    {
        return $this->find($id);
    }
}

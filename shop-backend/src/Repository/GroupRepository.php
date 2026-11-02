<?php

namespace App\Repository;

use App\Entity\Group;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class GroupRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Group::class);
    }

    // Tìm nhóm theo tên
    public function findByName(string $name): ?Group
    {
        return $this->findOneBy(['name' => $name]);
    }

    public function findAllPaginated(int $page, int $limit): array
    {
        $queryBuilder = $this->createQueryBuilder('g')
            ->orderBy('g.id', 'ASC') // Sắp xếp theo ID tăng dần
            ->setFirstResult(($page - 1) * $limit) // Điểm bắt đầu
            ->setMaxResults($limit); // Số lượng nhóm mỗi trang

        return $queryBuilder->getQuery()->getResult();
    }
}

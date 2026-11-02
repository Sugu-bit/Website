<?php

namespace App\Repository;

use App\Entity\GroupPermission;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<GroupPermission>
 */
class GroupPermissionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GroupPermission::class);
    }

    /**
     * Lấy danh sách quyền theo groupId và permissionName, ưu tiên bản ghi targetId = null
     */
    public function findGroupPermission(int $groupId, string $permissionName): array
    {
        return $this->createQueryBuilder('gp')
            ->join('gp.permission', 'p') // Thực hiện JOIN với bảng Permission
            ->where('gp.group = :groupId')
            ->andWhere('p.name = :permissionName') // Tham chiếu đúng trường name từ Permission
            ->setParameter('groupId', $groupId)
            ->setParameter('permissionName', $permissionName)
            ->orderBy('gp.targetId', 'ASC') // Ưu tiên bản ghi targetId = null
            ->getQuery()
            ->getResult();
    }
}

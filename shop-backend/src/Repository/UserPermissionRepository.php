<?php

namespace App\Repository;

use App\Entity\UserPermission;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserPermission>
 */
class UserPermissionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserPermission::class);
    }

    /**
     * Lấy danh sách quyền theo userId và permissionName, ưu tiên bản ghi targetId = null
     */
    public function findUserPermission(int $userId, string $permissionName): array
    {
        return $this->createQueryBuilder('up')
            ->join('up.permission', 'p') // Thực hiện JOIN với bảng Permission
            ->where('up.user = :userId')
            ->andWhere('p.name = :permissionName') // Tham chiếu đúng trường name từ Permission
            ->setParameter('userId', $userId)
            ->setParameter('permissionName', $permissionName)
            ->orderBy('up.targetId', 'ASC') // Ưu tiên bản ghi targetId = null
            ->getQuery()
            ->getResult();
    }
}

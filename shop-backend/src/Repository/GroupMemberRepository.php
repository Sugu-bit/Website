<?php

namespace App\Repository;

use App\Entity\Group;
use App\Entity\GroupMember;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class GroupMemberRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GroupMember::class);
    }

    /**
     * Tìm kiếm một GroupMember dựa vào User và Group.
     */
    public function findByUserAndGroup(User $user, Group $group): ?GroupMember
    {
        return $this->findOneBy([
            'user' => $user,
            'group' => $group,
        ]);
    }

    /**
     * Tìm danh sách Group mà User thuộc về.
     */
    public function findGroupMembersByUser(User $user): array
    {
        return $this->createQueryBuilder('gm')
            ->innerJoin('gm.group', 'g')
            ->addSelect('g') // Thêm alias g vào SELECT
            ->where('gm.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }

    /**
     * Tìm danh sách GroupMember mà Group có.
     */
    public function findGroupMembersByGroup(Group $group): array
    {
        return $this->createQueryBuilder('gm')
            ->innerJoin('gm.user', 'u')
            ->addSelect('u') // Thêm alias u vào SELECT
            ->where('gm.group = :group')
            ->setParameter('group', $group)
            ->getQuery()
            ->getResult();
    }

    /**
     * Kiểm tra xem một User có thuộc về một Group không.
     */
    public function existsByUserAndGroup(User $user, Group $group): bool
    {
        $result = $this->createQueryBuilder('gm')
            ->select('COUNT(gm.id)')
            ->where('gm.user = :user')
            ->andWhere('gm.group = :group')
            ->setParameter('user', $user)
            ->setParameter('group', $group)
            ->getQuery()
            ->getSingleScalarResult();

        return (int)$result > 0;
    }
}

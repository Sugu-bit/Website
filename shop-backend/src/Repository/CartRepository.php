<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Cart;
use App\Entity\ProductOption;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class CartRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Cart::class);
    }

    public function findAllPaginated(int $page, int $limit): array
    {
        return $this->createQueryBuilder('c')
            ->orderBy('c.createdAt', 'DESC') // Sắp xếp theo thời gian tạo giảm dần
            ->setFirstResult(($page - 1) * $limit) // Điểm bắt đầu của dữ liệu
            ->setMaxResults($limit) // Số lượng sản phẩm mỗi trang
            ->getQuery()
            ->getResult();
    }

    public function findCartItemsByUser(User $user): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.user = :user')
            ->setParameter('user', $user)
            ->orderBy('c.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findCartItemsByIds(array $ids): array
    {
        if (empty($ids)) {
            return [];
        }

        return $this->createQueryBuilder('c')
            ->andWhere('c.id IN (:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();
    }

    public function findCartItemsByUserAndProductOption(User $user, ProductOption $productOption): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.user = :user')
            ->andWhere('c.productOption = :productOption')
            ->setParameter('user', $user)
            ->setParameter('productOption', $productOption)
            ->orderBy('c.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }
}

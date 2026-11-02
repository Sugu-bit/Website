<?php

namespace App\Repository;

use App\Entity\OrderDetail;
use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class OrderDetailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OrderDetail::class);
    }

    /**
     * Tìm tất cả các OrderDetail theo một Order cụ thể.
     *
     * @param Order $order
     * @return OrderDetail[] Returns an array of OrderDetail objects
     */
    public function findByOrder(Order $order): array
    {
        return $this->createQueryBuilder('od')
            ->andWhere('od.order = :order')
            ->setParameter('order', $order)
            ->orderBy('od.id', 'ASC') // Thay đổi thứ tự nếu cần
            ->getQuery()
            ->getResult();
    }
}

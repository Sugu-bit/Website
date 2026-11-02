<?php

namespace App\Repository;

use App\Entity\Notification;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Notification>
 */
class NotificationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Notification::class);
    }

    /**
     * Lấy danh sách tất cả thông báo, sắp xếp theo thời gian mới nhất.
     *
     * @return Notification[]
     */
    public function findAllNotifications(): array
    {
        return $this->createQueryBuilder('n')
            ->orderBy('n.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Lấy các thông báo chưa đọc.
     *
     * @return Notification[]
     */
    public function findUnreadNotifications(): array
    {
        return $this->createQueryBuilder('n')
            ->where('n.isRead = :isRead')
            ->setParameter('isRead', false)
            ->orderBy('n.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Đánh dấu tất cả thông báo là đã đọc.
     *
     * @return int Số lượng thông báo được cập nhật.
     */
    public function markAllAsRead(): int
    {
        return $this->createQueryBuilder('n')
            ->update()
            ->set('n.isRead', ':isRead')
            ->set('n.readAt', ':readAt')
            ->setParameter('isRead', true)
            ->setParameter('readAt', new \DateTimeImmutable())
            ->getQuery()
            ->execute();
    }

    /**
     * Xóa tất cả thông báo đã đọc.
     *
     * @return int Số lượng thông báo bị xóa.
     */
    public function deleteReadNotifications(): int
    {
        return $this->createQueryBuilder('n')
            ->delete()
            ->where('n.isRead = :isRead')
            ->setParameter('isRead', true)
            ->getQuery()
            ->execute();
    }
}

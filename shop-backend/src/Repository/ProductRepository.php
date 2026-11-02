<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    /**
     * Lấy danh sách sản phẩm theo ID danh mục
     */
    public function findByCategoryId(int $categoryId): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.category = :categoryId')
            ->setParameter('categoryId', $categoryId)
            ->getQuery()
            ->getResult();
    }

    public function findAllPaginated(int $page, int $limit): array
    {
        $queryBuilder = $this->createQueryBuilder('p')
            ->where('p.isDelete = false') // Chỉ lấy sản phẩm không bị xóa
            ->orderBy('p.id', 'ASC') // Sắp xếp theo ID tăng dần
            ->setFirstResult(($page - 1) * $limit) // Điểm bắt đầu
            ->setMaxResults($limit); // Số lượng sản phẩm mỗi trang

        return $queryBuilder->getQuery()->getResult();
    }

    public function searchProductsByKeywords(string $keywords): array
    {
        return $this->createQueryBuilder('p')
            ->where('p.isDelete = false')
            ->andWhere('p.name LIKE :keywords OR p.description LIKE :keywords')
            ->setParameter('keywords', '%' . $keywords . '%')
            ->orderBy('p.id', 'ASC') // Sắp xếp cơ bản theo ID (không ảnh hưởng đến thuật toán sắp xếp thứ hạng sau này)
            ->getQuery()
            ->getResult();
    }
    
}


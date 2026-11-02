<?php

namespace App\Repository;

use App\Entity\Wishlist;
use App\Entity\User;
use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class WishlistRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Wishlist::class);
    }

    /**
     * Tìm các bản ghi Wishlist theo User.
     *
     * @param User $user
     * @return Wishlist[]|null
     */
    public function findByUser(User $user): ?array
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }

    /**
     * Tìm các bản ghi Wishlist theo Product.
     *
     * @param Product $product
     * @return Wishlist[]|null
     */
    public function findByProduct(Product $product): ?array
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.product = :product')
            ->setParameter('product', $product)
            ->getQuery()
            ->getResult();
    }
}

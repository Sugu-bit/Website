<?php

namespace App\Dto;

use App\Entity\Wishlist;

class WishlistDto
{
    public int $id;
    public int $userId;
    public int $productId;
    public string $createdAt;

    public function __construct(Wishlist $wishlist)
    {
        $this->id = $wishlist->getId();
        $this->userId = $wishlist->getUser()->getId();
        $this->productId = $wishlist->getProduct()->getId();
        $this->createdAt = $wishlist->getCreatedAt()->format('Y-m-d H:i:s');
    }
}

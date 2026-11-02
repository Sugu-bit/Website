<?php

namespace App\Dto;

use App\Entity\Review;

class ReviewDto
{
    public int $id;
    public int $rating;
    public ?string $comment;
    public bool $isApproved;
    public string $createdAt;
    public int $productId;
    public int $userId;

    public function __construct(Review $review)
    {
        $this->id = $review->getId();
        $this->rating = $review->getRating();
        $this->comment = $review->getComment();
        $this->isApproved = $review->isApproved();
        $this->createdAt = $review->getCreatedAt()->format('Y-m-d H:i:s');
        $this->productId = $review->getProduct()->getId();
        $this->userId = $review->getUser()->getId();
    }
}

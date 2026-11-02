<?php

namespace App\Service;

use App\Entity\Review;
use App\Repository\ReviewRepository;
use Doctrine\ORM\EntityManagerInterface;

class ReviewService
{
    private ReviewRepository $reviewRepository;
    private EntityManagerInterface $entityManager;
    private UserService $userService;
    private ProductService $productService;

    public function __construct(ReviewRepository $reviewRepository, EntityManagerInterface $entityManager, UserService $userService, ProductService $productService)
    {
        $this->reviewRepository = $reviewRepository;
        $this->entityManager = $entityManager;
        $this->userService = $userService;
        $this->productService = $productService;
    }

    public function getAllReviews(): array
    {
        return $this->reviewRepository->findAll();
    }

    public function getReviewById(int $id): ?Review
    {
        return $this->reviewRepository->find($id);
    }

    public function createReview(array $data): Review
    {
        $review = new Review();
        $user = $this->userService->getUserById($data['userId']);
        $product = $this->productService->getProductById($data['productId']);
        $review->setUser($user)
               ->setProduct($product)
               ->setRating($data['rating'] ?? throw new \Exception('Rating is required'))
               ->setComment($data['comment'] ?? null)
               ->setCreatedAt(new \DateTime());

        $this->entityManager->persist($review);
        $this->entityManager->flush();

        return $review;
    }

    public function updateReview(int $id, array $data): Review
    {
        $review = $this->getReviewById($id);

        if (!$review) {
            throw new \Exception('Review not found');
        }
        $review->setRating($data['rating'] ?? $review->getRating())
               ->setComment($data['comment'] ?? $review->getComment())
               ->setUpdatedAt(new \DateTime());

        $this->entityManager->flush();

        return $review;
    }

    public function deleteReview(int $id): void
    {
        $review = $this->getReviewById($id);

        if (!$review) {
            throw new \Exception('Review not found');
        }

        $this->entityManager->remove($review);
        $this->entityManager->flush();
    }
}

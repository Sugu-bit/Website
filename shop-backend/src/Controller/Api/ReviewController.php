<?php

namespace App\Controller\Api;

use App\Service\ReviewService;
use App\Service\AuthorizationService;
use App\Dto\ReviewDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;



#[Route('/api/reviews', name: 'review_')]
class ReviewController extends AbstractController
{
    private ReviewService $reviewService;
    private AuthorizationService $authorizationService;

    public function __construct(ReviewService $reviewService, AuthorizationService $authorizationService)
    {
        $this->reviewService = $reviewService;
        $this->authorizationService = $authorizationService;
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $reviews = $this->reviewService->getAllReviews();
        $reviewDTOs = array_map(
            fn($review) => new ReviewDTO($review),
            $reviews
        );
        return $this->json($reviewDTOs);
    }

    #[Route('/{id}', name: 'detail', methods: ['GET'])]
    public function detail(int $id): JsonResponse
    {
        $review = $this->reviewService->getReviewById($id);
        if (!$review) {
            return $this->json(['message' => 'Review not found'], 404);
        }
        return $this->json(new ReviewDTO($review));
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $review = $this->reviewService->createReview($data);
        return $this->json(new ReviewDTO($review), 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $review = $this->reviewService->updateReview($id, $data);
        return $this->json(new ReviewDTO($review));
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $this->reviewService->deleteReview($id);
        return $this->json(['message' => 'Review deleted']);
    }
}

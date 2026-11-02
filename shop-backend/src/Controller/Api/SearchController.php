<?php

namespace App\Controller\Api;

use App\Service\SearchService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;

#[Route('/api/search', name: 'search_')]
class SearchController extends AbstractController
{
    private SearchService $searchService;

    public function __construct(SearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    #[Route('/all', name: 'all', methods: ['GET'])]
    public function searchAll(Request $request): JsonResponse
    {
        $keywords = $request->query->get('keywords', '');

        if (empty($keywords)) {
            throw new AppException('Keywords cannot be empty');
        }

        $results = $this->searchService->searchAll($keywords);

        return $this->json($results);
    }

    #[Route('/users', name: 'users', methods: ['GET'])]
    public function searchUsers(Request $request): JsonResponse
    {
        $keywords = $request->query->get('keywords', '');

        if (empty($keywords)) {
            throw new AppException('Keywords cannot be empty');
        }

        $results = $this->searchService->searchUser($keywords);

        return $this->json($results);
    }

    #[Route('/groups', name: 'groups', methods: ['GET'])]
    public function searchGroups(Request $request): JsonResponse
    {
        $keywords = $request->query->get('keywords', '');

        if (empty($keywords)) {
            throw new AppException('Keywords cannot be empty');
        }

        $results = $this->searchService->searchGroup($keywords);

        return $this->json($results);
    }

    #[Route('/products', name: 'products', methods: ['GET'])]
    public function searchProducts(Request $request): JsonResponse
    {
        $keywords = $request->query->get('keywords', '');
        $minPrice = $request->query->get('minPrice');
        $maxPrice = $request->query->get('maxPrice');
        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 10);

        if (empty($keywords)) {
            throw new AppException('Keywords cannot be empty');
        }

        $minPrice = $minPrice !== null ? (float) $minPrice : null;
        $maxPrice = $maxPrice !== null ? (float) $maxPrice : null;
        $page = max(1, (int) $page); // Page phải lớn hơn hoặc bằng 1
        $limit = max(1, (int) $limit); // Limit phải lớn hơn hoặc bằng 1

        $results = $this->searchService->searchProduct($keywords, $minPrice, $maxPrice, $page, $limit);

        return $this->json([
            'status' => 'success',
            'data' => $results['results'],
            'pagination' => [
                'total' => $results['total'],
                'page' => $results['page'],
                'limit' => $results['limit'],
            ],
        ]);
    }

    #[Route('/products/category', name: 'products_in_category', methods: ['GET'])]
    public function searchProductsInCategory(Request $request): JsonResponse
    {
        $keywords = $request->query->get('keywords', '');

        if (empty($keywords)) {
            throw new AppException('Keywords cannot be empty');
        }

        $results = $this->searchService->searchProductInCategory($keywords);

        return $this->json($results);
    }

    #[Route('/cart', name: 'products_in_cart', methods: ['GET'])]
    public function searchProductsInCart(Request $request): JsonResponse
    {
        $keywords = $request->query->get('keywords', '');

        if (empty($keywords)) {
            throw new AppException('Keywords cannot be empty');
        }

        $results = $this->searchService->searchProductInCart($keywords);

        return $this->json($results);
    }

    #[Route('/orders', name: 'orders_for_users', methods: ['GET'])]
    public function searchOrdersForUsers(Request $request): JsonResponse
    {
        $keywords = $request->query->get('keywords', '');

        if (empty($keywords)) {
            throw new AppException('Keywords cannot be empty');
        }

        $results = $this->searchService->searchOrdersForUsers($keywords);

        return $this->json($results);
    }
}

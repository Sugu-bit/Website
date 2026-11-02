<?php
namespace App\Service;

class SearchService
{
    private UserService $usersService;
    private ProductService $productService;
    private CategoryService $categoryService;
    private GroupService $groupService;
    private OrderService $orderService;
    private CartService $cartService;
    private NotificationService $notificationService;



    public function __construct(
        UserService $usersService,
        ProductService $productService,
        CategoryService $categoryService,
        GroupService $groupService,
        OrderService $orderService,
        CartService $cartService,
        NotificationService $notificationService,
    ) {
        $this->usersService = $usersService;
        $this->productService = $productService;
        $this->categoryService = $categoryService;
        $this->groupService = $groupService;
        $this->orderService = $orderService;
        $this->cartService = $cartService;
        $this->notificationService = $notificationService;
    }

    public function searchAll(string $keywords): array
    {

        return [];
    }

    public function searchUser(string $keywords): array
    {

        return [];
    }

    public function searchGroup(string $keywords): array
    {

        return [];
    }


    public function searchProduct(string $keywords, ?float $minPrice = null, ?float $maxPrice = null, int $page = 1, int $limit = 10): array
    {
        // Bước 1: Lấy danh sách sản phẩm thô từ ProductService
        $products = $this->productService->searchProductsByKeywords($keywords);
    
        // Bước 2: Tính toán điểm khớp (thứ hạng) cho từng sản phẩm
        $rankedProducts = [];
        foreach ($products as $product) {
            $relevanceScore = $this->calculateRelevanceScore($keywords, $product);
    
            if ($relevanceScore > 0 && $this->isWithinPriceRange($product['price'], $minPrice, $maxPrice)) {
                $rankedProducts[] = [
                    'product' => $product,
                    'relevanceScore' => $relevanceScore,
                ];
            }
        }
    
        // Bước 3: Sắp xếp sản phẩm theo điểm khớp giảm dần
        usort($rankedProducts, fn($a, $b) => $b['relevanceScore'] <=> $a['relevanceScore']);
    
        // Bước 4: Áp dụng phân trang
        $total = count($rankedProducts); // Tổng số sản phẩm
        $offset = ($page - 1) * $limit;
        $pagedResults = array_slice($rankedProducts, $offset, $limit);
    
        return [
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
            'results' => $pagedResults,
        ];
    }
    

    private function calculateRelevanceScore(string $keywords, array $product): int
    {
        $score = 0;

        // Tăng điểm nếu từ khóa xuất hiện trong tên sản phẩm
        if (stripos($product['name'], $keywords) !== false) {
            $score += 5;
        }

        // Tăng điểm nếu từ khóa xuất hiện trong mô tả sản phẩm
        if (stripos($product['description'], $keywords) !== false) {
            $score += 2;
        }

        return $score;
    }

    private function isWithinPriceRange(?float $price, ?float $minPrice, ?float $maxPrice): bool
    {
        if ($price==null) return true;
        // Kiểm tra nếu sản phẩm nằm trong khoảng giá (nếu được cung cấp)
        if (!is_null($minPrice) && $price < $minPrice) {
            return false;
        }

        if (!is_null($maxPrice) && $price > $maxPrice) {
            return false;
        }

        return true;
    }

    public function searchProductInCategory(string $keywords): array
    {

        return [];
    }
    
    public function searchProductInCart(string $keywords): array
    {

        return [];
    }
    
    public function searchOrdersForUsers(string $keywords): array
    {
        return [];
    }

}

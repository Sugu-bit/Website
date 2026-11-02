<?php

namespace App\Controller\Api;

use App\Service\ProductService;
use App\Service\AuthorizationService;
use App\Dto\ProductDto;
use App\Dto\ProductOptionDto;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;


#[Route('/api/products', name: 'product_')]
class ProductController extends AbstractController
{
    private ProductService $productService;
    private AuthorizationService $authorizationService;

    public function __construct(ProductService $productService, AuthorizationService $authorizationService)
    {
        $this->productService = $productService;
        $this->authorizationService = $authorizationService;
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        // Lấy tham số phân trang từ query
        $page = (int) $request->query->get('page', 1);
        $limit = (int) $request->query->get('limit', 10);

        if ($page < 1 || $limit < 1) {
            throw new AppException('Invalid pagination parameters');
        }

        $products = $this->productService->getPaginatedProductDtos($page, $limit);
        $productDtos = array_map(fn($product) => new ProductDto($product), $products);

        return $this->json($productDtos);
    }

    #[Route('/{id}', name: 'detail', methods: ['GET'])]
    public function detail(int $id): JsonResponse
    {
        $productEntity = $this->productService->getProductById($id);
        if (!$productEntity) {
            return $this->json(['message' => 'Product not found'], 404);
        }

        $productData = $this->productService->toDto($productEntity);
        $productData['options'] = $this->productService->getProductOptions($productEntity);
        $productDto = new ProductDto($productData);
        return $this->json($productDto);
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "create_product");
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);

        try {
            $product = $this->productService->createProduct($data);
            $productDto = new ProductDto($product);
            return $this->json($productDto, 201);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, int $id): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "edit_product", $id);
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);

        try {
            $product = $this->productService->updateProduct($id, $data);
            $productDto = new ProductDto($product);
            return $this->json($productDto);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id, Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "delete_product");
        if (!$a) {
            throw new AppException('E2021');
        }
        $this->productService->deleteProduct($id);
        return $this->json(['message' => 'Product deleted']);
    }

    #[Route('/by-category/{categoryId}', name: 'by_category', methods: ['GET'])]
    public function getProductsByCategoryId(int $categoryId): JsonResponse
    {
        $products = $this->productService->getProductsByCategoryId($categoryId);

        if (empty($products)) {
            return $this->json(['message' => 'No products found for this category'], 404);
        }

        $productDtos = array_map(fn($product) => new ProductDto($product), $products);
        return $this->json($productDtos);
    }

    #[Route('/{id}/attribute', name: 'update_attributes', methods: ['POST', 'PUT'])]
    public function updateAttributes(Request $request, int $id): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "edit_product", $id);
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);

        // Gọi hàm cập nhật hoặc tạo mới từ service
        $this->productService->updateOrCreateProductAttributesAndOptions($id, $data);
        return $this->json(['message' => 'Attributes and options updated successfully'], 200);
    }

    #[Route('/{id}/find-option', name: 'find_option', methods: ['POST'])]
    public function findOption(Request $request, int $id): JsonResponse
    {
        $jsonString = $request->getContent();

        $product = $this->productService->getProductById($id);
        if (!$product) {
            return $this->json(['message' => 'Product not found'], 404);
        }

        $productOption = $this->productService->findProductOptionByJson($product, $jsonString);

        return $this->json(new ProductOptionDto($productOption));
    
    }

    #[Route('/{id}/option-default', name: 'find_option_default', methods: ['GET'])]
    public function getOptionDefault(int $id): JsonResponse
    {
        $product = $this->productService->getProductById($id);
        if (!$product) {
            return $this->json(['message' => 'Product not found'], 404);
        }

        $productOptionDefault = $this->productService->getOptionDefault($product);

        return $this->json($productOptionDefault);

    }

    #[Route('/options/{optionId}', name: 'get_option_values', methods: ['GET'])]
    public function getOptionValues(int $optionId): JsonResponse
    {
        // Gọi hàm từ service để lấy giá trị
        $values = $this->productService->getValuesByOptionId($optionId);

        if (empty($values)) {
            return $this->json(['message' => 'No values found for the given option ID'], 404);
        }

        return $this->json($values);
    }
}
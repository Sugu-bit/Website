<?php

namespace App\Controller\Api;

use App\Service\CategoryService;
use App\Service\AuthorizationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;
use App\Dto\CategoryDto;
use App\Validators\CategoryValidator;



#[Route('/api/categories', name: 'category_')]
class CategoryController extends AbstractController
{
    private CategoryService $categoryService;
    private AuthorizationService $authorizationService;
    private CategoryValidator $categoryValidator;

    public function __construct(CategoryService $categoryService, AuthorizationService $authorizationService, CategoryValidator $categoryValidator)
    {
        $this->categoryService = $categoryService;
        $this->authorizationService = $authorizationService;
        $this->categoryValidator = $categoryValidator;
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $categories = $this->categoryService->getAllCategories();

        // Chuyển đổi danh sách Category thành danh sách CategoryDto
        $categoryDtos = array_map(fn($category) => new CategoryDto($category), $categories);

        return $this->json($categoryDtos);
    }


    #[Route('/{id}', name: 'detail', methods: ['GET'])]
    public function detail(int $id): JsonResponse
    {
        $category = $this->categoryService->getCategoryById($id);
        if (!$category) {
            return $this->json(['message' => 'Category not found'], 404);
        }

        return $this->json(new CategoryDto($category));
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "create_category");
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);
        $validatedData = $this->categoryValidator->validateCategoryData($data, 'create');
        try {
            $category = $this->categoryService->createCategory($validatedData);
            return $this->json(new CategoryDto($category), 201);
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
        $a = $this->authorizationService->checkPermission($userCurrent, "edit_category", $id);
        if (!$a || $userCurrent->getId() != $id) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);
        $validatedData = $this->categoryValidator->validateCategoryData($data, 'update');
        try {
            $category = $this->categoryService->updateCategory($id, $validatedData);
            return $this->json(new CategoryDto($category));
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
        $a = $this->authorizationService->checkPermission($userCurrent, "delete_category");
        if (!$a) {
            throw new AppException('E2021');
        }
        try {
            $this->categoryService->deleteCategory($id);
            return $this->json(['message' => 'Category deleted']);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }

    #[Route('/{id}/subcategories', name: 'subcategories', methods: ['GET'])]
    public function subcategories(int $id): JsonResponse
    {
        $parentCategory = $this->categoryService->getCategoryById($id);

        if (!$parentCategory) {
            return $this->json(['message' => 'Parent category not found'], 404);
        }

        $subcategories = $this->categoryService->getSubcategoriesByParentId($id);

        // Chuyển đổi danh sách Category thành danh sách CategoryDto
        $subcategoryDtos = array_map(fn($subcategory) => new CategoryDto($subcategory), $subcategories);

        return $this->json($subcategoryDtos);
    }

}

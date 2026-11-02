<?php

namespace App\Service;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;

class CategoryService
{
    private CategoryRepository $categoryRepository;
    private EntityManagerInterface $entityManager;
    private ProductService $productService;


    public function __construct(CategoryRepository $categoryRepository, EntityManagerInterface $entityManager, ProductService $productService)
    {
        $this->categoryRepository = $categoryRepository;
        $this->entityManager = $entityManager;
        $this->productService = $productService;
    }

    public function getAllCategories(): array
    {
        return $this->categoryRepository->findAll();
    }

    public function getCategoryById(int $id): ?Category
    {
        return $this->categoryRepository->find($id);
    }

    public function getSubcategoriesByParentId(int $parentId): array
    {
        return $this->categoryRepository->findByParentId($parentId);
    }

    public function createCategory(array $data): Category
    {
        $category = new Category();
        $category->setName($data['name'] ?? throw new \Exception('Name is required'))
                 ->setDescription($data['description'] ?? null);

        if (!empty($data['parentId'])) {
            $parent = $this->getCategoryById($data['parentId']);
            if (!$parent) {
                throw new \Exception('Parent category not found');
            }
            $category->setParent($parent);
        }

        $this->entityManager->persist($category);
        $this->entityManager->flush();

        return $category;
    }

    public function updateCategory(int $id, array $data): Category
    {
        $category = $this->getCategoryById($id);

        if (!$category) {
            throw new \Exception('Category not found');
        }

        // Hàm kiểm tra giá trị có rỗng không
        $isEmpty = function ($value): bool {
            return $value === null || $value === '';
        };

        // Cập nhật tên và mô tả
        $category->setName(!$isEmpty($data['name'] ?? null) ? $data['name'] : $category->getName())
                ->setDescription(!$isEmpty($data['description'] ?? null) ? $data['description'] : $category->getDescription());

        // Kiểm tra và cập nhật parentId
        if (array_key_exists('parentId', $data)) {
            $parent = !$isEmpty($data['parentId']) ? $this->getCategoryById($data['parentId']) : null;
            if (!$isEmpty($data['parentId']) && !$parent) {
                throw new \Exception('Parent category not found');
            }
            $category->setParent($parent);
        }

        $this->entityManager->flush();

        return $category;
    }


    public function deleteCategory(int $id): void
    {
        $category = $this->getCategoryById($id);

        if (!$category) {
            throw new \Exception('Category not found');
        }

        $parent = $category->getParent();
        $childrens = $this->getSubcategoriesByParentId($id);
        foreach ($childrens as $children){
            $children->setParent($parent);
            // $this->entityManager->persist($children);
        }
        $products = $this->productService->findProductsByCategoryId($id);
        foreach ($products as $product){
            $product->setCategory($parent);
            // $this->entityManager->persist($product);
        }
        $this->entityManager->remove($category);
        $this->entityManager->flush();
    }
}

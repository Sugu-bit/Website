<?php

namespace App\Dto;

use App\Entity\Category;

class CategoryDto
{
    public int $id;
    public string $name;
    public ?string $description;
    public ?string $hierarchyPath; // Phả hệ dưới dạng chuỗi tên
    public ?string $hierarchyPathById; // Phả hệ dưới dạng chuỗi ID

    public function __construct(Category $category)
    {
        $this->id = $category->getId();
        $this->name = $category->getName();
        $this->description = $category->getDescription();
        $this->hierarchyPath = $this->buildHierarchyPathByName($category);
        $this->hierarchyPathById = $this->buildHierarchyPathById($category);
    }

    private function buildHierarchyPathByName(Category $category): string
    {
        $path = [];
        $current = $category;

        while ($current) {
            $path[] = $current->getName();
            $current = $current->getParent();
        }

        return implode('/', array_reverse($path));
    }

    private function buildHierarchyPathById(Category $category): string
    {
        $path = [];
        $current = $category;

        while ($current) {
            $path[] = $current->getId();
            $current = $current->getParent();
        }

        return implode('/', array_reverse($path));
    }
}

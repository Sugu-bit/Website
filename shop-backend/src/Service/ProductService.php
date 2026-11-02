<?php

namespace App\Service;

use App\Entity\Product;
use App\Entity\ProductOption;
use App\Repository\ProductRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;

class ProductService
{
    private ProductRepository $productRepository;
    private CategoryRepository $categoryRepository;
    private EntityManagerInterface $entityManager;
    private ProductAttributeService $productAttributeService;
    private ProductAttributeValueService $productAttributeValueService;
    private ProductOptionService $productOptionService;
    private ProductOptionValueService $productOptionValueService;
    

    public function __construct(
        ProductRepository $productRepository,
        CategoryRepository $categoryRepository,
        EntityManagerInterface $entityManager,
        ProductAttributeService $productAttributeService,
        ProductAttributeValueService $productAttributeValueService,
        ProductOptionService $productOptionService,
        ProductOptionValueService $productOptionValueService
    ) {
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
        $this->entityManager = $entityManager;
        $this->productAttributeService = $productAttributeService;
        $this->productAttributeValueService = $productAttributeValueService;
        $this->productOptionService = $productOptionService;
        $this->productOptionValueService = $productOptionValueService;
    }

    private function validateDiscountPercentage(mixed $value): int
    {
        $discountPercentage = filter_var($value, FILTER_VALIDATE_INT);
        if ($discountPercentage === false || $discountPercentage < 0 || $discountPercentage > 100) {
            throw new \InvalidArgumentException('Discount percentage must be an integer between 0 and 100.');
        }

        return $discountPercentage;
    }


    public function toDto(Product $product):array {
        $attributes = $this->getProductAttributes($product);
        $priceAndStock = $this->getProductPriceAndStock($product);

        return [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'locationAddress' => $product->getLocationAddress(),
            'categoryId' => $product->getCategory()?->getId(),
            'description' => $product->getDescription(),
            'price' => $priceAndStock['prices'],
            'stock' => $priceAndStock['stock'],
            'attribute' => $attributes,
            'discountPercentage' => $product->getDiscountPercentage(),
            'popularity' => $product->getPopularity(),
        ];
    }

    public function getProductOptions(Product $product): array
    {
        return array_map(function (ProductOption $option): array {
            return [
                'id' => $option->getId(),
                'price' => $option->getPrice(),
                'stock' => $option->getStock(),
                'values' => $this->getValuesByOption($option),
            ];
        }, $this->productOptionService->findByProduct($product));
    }

    public function searchProductsByKeywords(string $keywords): array
    {
        $products = $this->productRepository->searchProductsByKeywords($keywords);
        $result = [];
        foreach ($products as $product) {
            if (!$product->isDelete()){
                $result[] = $this->toDto($product);
            }
        }
        return $result;
    }
    public function getAllProductDtos(): array
    {
        $products = $this->getAllProducts();
        $result = [];

        foreach ($products as $product) {
            if (!$product->isDelete()){
                $result[] = $this->toDto($product);
            }
        }

        return $result;
    }

    public function getPaginatedProductDtos(int $page, int $limit): array
    {
        $products = $this->productRepository->findAllPaginated($page, $limit);
        $result = [];

        foreach ($products as $product) {
            $result[] = $this->toDto($product);
        }

        return $result;
    }

    public function getProductDtoById(int $id): ?array
    {
        $product = $this->getProductById($id);
        return $this->toDto($product);
    }

    public function getAllProducts(): array
    {
        return $this->productRepository->findAll();
    }

    public function getProductById(int $id): ?Product
    {
        $product = $this->productRepository->find($id);
        if (!$product) {
            throw new AppException('Product not found');
        }
        if ($product->isDelete()){
            throw new AppException('Product not found');
        }
        return $product;
    }

    public function getProductAttributes(Product $product): array
    {
        $attributes = $this->productAttributeService->findByProduct($product);
        $result = [];

        foreach ($attributes as $attribute) {
            $values = $this->productAttributeValueService->findByAttribute($attribute);
            $result[$attribute->getName()] = array_map(fn($value) => $value->getValue(), $values);
        }

        return $result;
    }

    public function findOptionDefault(Product $product): ?ProductOption {
        $options = $this->productOptionService->findByProduct($product);
        if (count($options)==1){
            return $options[0];
        }
        for ($i = 0; $i < count($options); $i++) {
            $option = $options[$i];
            $arr = $this->productOptionValueService->findByOption($option);
            if (empty($arr)) {
                return $option;
            }
        }
        return null;
    }

    public function getValuesByOption(ProductOption $option): array
    {
        $arr = $this->productOptionValueService->findByOption($option);
        $result = [];
        foreach ($arr as $value) {
            $x = $value->getProductAttributeValue();
            $result[$x->getAttribute()->getName()] = $x->getValue();
        }
        return $result;
    }

    public function getValuesByOptionId(int $optionId): array
    {
        $option = $this->productOptionService->getProductOptionById($optionId);
        return $this->getValuesByOption($option);
    }

    public function getOptionDefault(Product $product): array {
        $option = $this->findOptionDefault($product);
        if (!$option) {
            throw new AppException('E10204');
        }
        return [
            'id' => $option->getId(),
            'prices' => $option->getPrice(),
            'stock' => $option->getStock(),
        ]; 
    }

    private function getProductPriceAndStock(Product $product): array
    {
        $options = $this->productOptionService->findByProduct($product);
        if (count($options)==1){
            $price = $options[0]->getPrice();
            $stock = $options[0]->getStock();
            return [
                'prices' => $price, // Giá thấp nhất
                'stock' => $stock,
            ];
        }
        for ($i = 0; $i < count($options); $i++) {
            $option = $options[$i];
            $arr = $this->productOptionValueService->findByOption($option);
            if (empty($arr)) {
                // Xóa phần tử gây thoát vòng lặp
                array_splice($options, $i, 1);
                break;
            }
        }
        $prices = array_map(fn($option) => $option->getPrice(), $options);
        $totalStock = array_sum(array_map(fn($option) => $option->getStock(), $options));

        return [
            'prices' => count($prices) > 0 ? min($prices) : null, // Giá thấp nhất
            'stock' => $totalStock,
        ];
    }

    public function createProduct(array $data): array
    {
        // Kiểm tra và tạo Product
        $product = new Product();
        $product->setName($data['name'] ?? throw new \Exception('Name is required'))
                ->setLocationAddress($data['locationAddress'] ?? throw new AppException('Location address is required'));

        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }

        if (isset($data['discountPercentage'])) {
            $product->setDiscountPercentage($this->validateDiscountPercentage($data['discountPercentage']));
        }

        if (!empty($data['categoryId'])) {
            $category = $this->categoryRepository->find($data['categoryId']);
            if (!$category) {
                throw new \Exception('Invalid category ID');
            }
            $product->setCategory($category);
        }

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        // Xử lý thuộc tính (attributes)
        if (!empty($data['attribute']) && is_array($data['attribute'])) {
            foreach ($data['attribute'] as $attributeName => $values) {
                if (!is_array($values)) {
                    throw new \Exception('Attribute values must be an array');
                }

                // Tạo ProductAttribute
                $productAttribute = $this->productAttributeService->createProductAttribute($product, $attributeName);

                // Tạo ProductAttributeValue cho mỗi giá trị của thuộc tính
                foreach ($values as $value) {
                    $this->productAttributeValueService->createProductAttributeValue($productAttribute, $value);
                }
            }
        }

        $price = null;
        $stock = 0;

        if (!empty($data['price'])){
            if ($data['price'] >= 0){
                $price = $data['price'];
            }
        }
        if (!empty($data['stock'])){
            if ($data['stock'] >= 0)
            $stock = $data['stock'];
        }   

        $this->productOptionService->createProductOption($product, $price, $stock);

        return $this->toDto($product);
    }

    public function updateProduct(int $id, array $data): array
    {
        // Lấy sản phẩm cần cập nhật
        $product = $this->getProductById($id);
        $optionsDefault = $this->findOptionDefault($product);
        if (!$product) {
            throw new \Exception('Product not found');
        }

        // Cập nhật thông tin cơ bản
        if (!empty($data['name'])) {
            $product->setName($data['name']);
        }

        if (!empty($data['locationAddress'])) {
            $product->setLocationAddress($data['locationAddress']);
        }

        if (!empty($data['description'])) {
            $product->setDescription($data['description']);
        }

        if (isset($data['discountPercentage'])) {
            $product->setDiscountPercentage($this->validateDiscountPercentage($data['discountPercentage']));
        }

        if (!empty($data['price'])) {
            $optionsDefault->setPrice($data['price']);
        }

        if (!empty($data['stock'])) {
            $optionsDefault->setStock($data['stock']);
        }

        if (!empty($data['categoryId'])) {
            $category = $this->categoryRepository->find($data['categoryId']);
            if (!$category) {
                throw new \Exception('Invalid category ID');
            }
            $product->setCategory($category);
        }

        $this->entityManager->persist($product);

        // Xử lý thuộc tính (attributes)
        if (!empty($data['attribute']) && is_array($data['attribute'])) {
            foreach ($data['attribute'] as $attributeName => $values) {
                // Tìm thuộc tính qua service
                $productAttribute = $this->productAttributeService->findByNameAndProduct($attributeName, $product);

                if (!$productAttribute) {
                    // Nếu không tồn tại, tạo mới
                    $productAttribute = $this->productAttributeService->createProductAttribute($product, $attributeName);
                }

                // Lấy tất cả giá trị hiện tại của thuộc tính qua service
                $currentValues = $this->productAttributeValueService->findByAttribute($productAttribute);

                // Xóa giá trị hiện tại nếu không còn trong danh sách mới
                foreach ($currentValues as $currentValue) {
                    if (!in_array($currentValue->getValue(), $values)) {
                        $this->entityManager->remove($currentValue);
                    }
                }

                // Thêm hoặc cập nhật các giá trị mới
                foreach ($values as $value) {
                    $existingValue = $this->productAttributeValueService->findByValueAndAttribute($value, $productAttribute);

                    if (!$existingValue) {
                        // Tạo giá trị mới nếu chưa tồn tại
                        $this->productAttributeValueService->createProductAttributeValue($productAttribute, $value);
                    }
                }
            }
        }

        $this->entityManager->flush();

        return $this->toDto($product);
    }

    public function deleteProduct(int $id): void
    {
        $product = $this->getProductById($id);

        if (!$product) {
            throw new \Exception('Product not found');
        }

        $product->setDelete(true);
        $this->entityManager->persist($product);
        $this->entityManager->flush();
    }

    public function findProductsByCategoryId(int $categoryId): array
    {
        return $this->productRepository->findByCategoryId($categoryId);
    }

    public function getProductsByCategoryId(int $categoryId): array
    {
        $products = $this->productRepository->findByCategoryId($categoryId);
        $result = [];

        foreach ($products as $product) {
            if (!$product->isDelete()){
                $result[] = $this->toDto($product);
            }
        }

        return $result;
    } 

    private function findOptionByAttributeValues(Product $product, array $attributeValues): ?ProductOption
    {   
        $options = $this->productOptionService->findByProduct($product);
        foreach ($options as $option) {
            $optionValues = $this->productOptionValueService->findByOption($option);
            $optionValueIds = array_map(fn($value) => $value->getProductAttributeValue()->getId(), $optionValues);
            $attributeValueIds = array_map(fn($value) => $value->getId(), $attributeValues);

            if (count(array_diff($optionValueIds, $attributeValueIds)) === 0) {
                return $option;
            }
        }

        return null;
    }

    public function updateOrCreateProductAttributesAndOptions(int $productId, array $jsonData): void
    {
        // Lấy thông tin sản phẩm
        $product = $this->getProductById($productId);
        if (!$product) {
            throw new \Exception('Product not found');
        }

        $attributes = $jsonData['attribute'] ?? [];
        $values = $jsonData['value'] ?? [];

        if (empty($attributes) || empty($values)) {
            throw new \InvalidArgumentException("Invalid input data: 'attribute' and 'value' are required.");
        }

        // Bước 1: Đảm bảo các ProductAttribute tồn tại
        $attributeEntities = [];
        foreach ($attributes as $attributeName) {
            $attribute = $this->productAttributeService->findByNameAndProduct($attributeName, $product);
            if (!$attribute) {
                $attribute = $this->productAttributeService->createProductAttribute($product, $attributeName);
            }
            $attributeEntities[] = $attribute;
        }

        // Bước 2: Xử lý các giá trị ProductAttributeValue và ProductOption
        foreach ($values as $valueSet) {
            $attributeValues = $valueSet[0] ?? [];
            $optionData = $valueSet[1] ?? [];
            $price = $optionData[0] ?? null;
            $stock = $optionData[1] ?? null;

            if (count($attributeValues) !== count($attributes) || $price === null || $stock === null) {
                throw new \InvalidArgumentException("Invalid value set: Mismatch between attributes and values or missing price/stock.");
            }

            // Bước 3: Tạo hoặc cập nhật ProductAttributeValue
            $attributeValueEntities = [];
            foreach ($attributeValues as $index => $value) {
                $attribute = $attributeEntities[$index];
                $attributeValue = $this->productAttributeValueService->findByValueAndAttribute($value, $attribute);
                if (!$attributeValue) {
                    $attributeValue = $this->productAttributeValueService->createProductAttributeValue($attribute, $value);
                }else{
                    $this->productAttributeValueService->updateProductAttributeValue($attributeValue, $value);
                }
                $attributeValueEntities[] = $attributeValue;
            }

            // Bước 4: Tạo hoặc cập nhật ProductOption và liên kết với ProductAttributeValue
            $existingOption = $this->findOptionByAttributeValues($product, $attributeValueEntities);
            if (!$existingOption) {
                $productOption = $this->productOptionService->createProductOption($product, $price, $stock);
            } else {
                $this->productOptionService->updateProductOption($existingOption, $price, $stock);
                $productOption = $existingOption;
            }

            // Liên kết ProductOption với ProductAttributeValue
            foreach ($attributeValueEntities as $attributeValueEntity) {
                $existingOptionValue = $this->productOptionValueService->findByValueAndOption($attributeValueEntity, $productOption);
                if (!$existingOptionValue) {
                    $this->productOptionValueService->createProductOptionValue($productOption, $attributeValueEntity);
                }
            }
        }
    }

    public function findProductOptionByJson(Product $product, string $jsonString): ?ProductOption
    {
        // Parse JSON string
        $attributeData = json_decode($jsonString, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \InvalidArgumentException("Invalid JSON string");
        }

        // Prepare attribute value entities
        $attributeValueEntities = [];
        foreach ($attributeData as $attributeName => $attributeValue) {
            // Find ProductAttribute by name
            $productAttribute = $this->productAttributeService->findByNameAndProduct($attributeName, $product);
            if (!$productAttribute) {
                throw new \Exception("Attribute '{$attributeName}' not found for this product.");
            }

            // Find ProductAttributeValue by value
            $productAttributeValue = $this->productAttributeValueService->findByValueAndAttribute($attributeValue, $productAttribute);
            if (!$productAttributeValue) {
                throw new \Exception("Attribute value '{$attributeValue}' not found for attribute '{$attributeName}'.");
            }

            $attributeValueEntities[] = $productAttributeValue;
        }

        // Find matching ProductOption
        $productOption = $this->findOptionByAttributeValues($product, $attributeValueEntities);

        if (!$productOption) {
            throw new \Exception("No matching product option found for the provided attributes.");
        }

        return $productOption;
    }

}

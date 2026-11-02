<?php

namespace App\Service;

use App\Entity\Permission;
use App\Repository\PermissionRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;

class PermissionService
{
    private EntityManagerInterface $entityManager;
    private PermissionRepository $permissionRepository;

    public function __construct(EntityManagerInterface $entityManager, PermissionRepository $permissionRepository)
    {
        $this->entityManager = $entityManager;
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * Đồng bộ danh sách quyền giữa cơ sở dữ liệu và danh sách quyền định nghĩa sẵn
     */
    public function syncPermissions(): void
    {
        // Danh sách quyền tĩnh định nghĩa kèm trạng thái mặc định
        $permissions = [
            // Quản lý người dùng
            'view_users' => ['Xem danh sách người dùng', false],
            'view_user_details' => ['Xem chi tiết người dùng', false],
            'create_user' => ['Tạo người dùng mới', false],
            'edit_user' => ['Chỉnh sửa thông tin người dùng', false],
            'delete_user' => ['Xóa người dùng', false],
            'activate_deactivate_user' => ['Kích hoạt/khóa người dùng', false],
            'manage_user_permissions' => ['Quản lý phân quyền cá nhân', false],

            // Quản lý nhóm
            'view_groups' => ['Xem danh sách nhóm', false],
            'view_group_details' => ['Xem chi tiết nhóm', false],
            'create_group' => ['Tạo nhóm mới', false],
            'edit_group' => ['Chỉnh sửa thông tin nhóm', false],
            'delete_group' => ['Xóa nhóm', false],
            'manage_group_members' => ['Quản lý thành viên nhóm', false],
            'manage_group_permissions' => ['Quản lý phân quyền nhóm', false],

            // Quản lý quyền
            'view_permissions' => ['Xem danh sách quyền', false],
            'create_permission' => ['Tạo quyền mới', false],
            'edit_permission' => ['Chỉnh sửa quyền', false],
            'delete_permission' => ['Xóa quyền', false],

            // Quản lý sản phẩm
            'view_products' => ['Xem danh sách sản phẩm', true],
            'view_product_details' => ['Xem chi tiết sản phẩm', true],
            'create_product' => ['Tạo sản phẩm mới', false],
            'edit_product' => ['Chỉnh sửa thông tin sản phẩm', false],
            'delete_product' => ['Xóa sản phẩm', false],
            'manage_featured_products' => ['Quản lý sản phẩm nổi bật', false],
            'manage_product_stock' => ['Quản lý số lượng tồn kho', false],

            // Quản lý danh mục
            'view_categories' => ['Xem danh sách danh mục', true],
            'create_category' => ['Tạo danh mục mới', false],
            'edit_category' => ['Chỉnh sửa danh mục', false],
            'delete_category' => ['Xóa danh mục', false],

            // Quản lý giỏ hàng
            'create_cart' => ['Thêm sản phẩm vào giỏ hàng', true],
            'view_carts' => ['Xem giỏ hàng của người dùng', false],
            'edit_carts' => ['Chỉnh sửa giỏ hàng của người dùng', false],
            'delete_carts' => ['Xóa giỏ hàng của người dùng', false],

            // Quản lý danh sách yêu thích
            'view_wishlists' => ['Xem danh sách yêu thích của người dùng', false],
            'edit_wishlists' => ['Chỉnh sửa danh sách yêu thích của người dùng', false],
            'delete_wishlists' => ['Xóa sản phẩm khỏi danh sách yêu thích', false],

            // Quản lý mã giảm giá
            'view_coupons' => ['Xem danh sách mã giảm giá', false],
            'create_coupon' => ['Tạo mã giảm giá mới', false],
            'edit_coupon' => ['Chỉnh sửa mã giảm giá', false],
            'delete_coupon' => ['Xóa mã giảm giá', false],
            'activate_deactivate_coupon' => ['Kích hoạt/Vô hiệu hóa mã giảm giá', false],

            // Quản lý đơn hàng
            'view_orders' => ['Xem danh sách đơn hàng', false],
            'view_order_details' => ['Xem chi tiết đơn hàng', false],
            'update_shipping_status' => ['Cập nhật trạng thái vận chuyển', false],
            'update_payment_status' => ['Cập nhật trạng thái thanh toán', false],
            'delete_order' => ['Xóa đơn hàng', false],

            // Quản lý đánh giá sản phẩm
            'view_reviews' => ['Xem danh sách đánh giá', true],
            'approve_disapprove_review' => ['Duyệt/Không duyệt đánh giá', false],
            'delete_review' => ['Xóa đánh giá', false],

            // Quản lý toàn hệ thống
            'access_admin_dashboard' => ['Truy cập Dashboard quản trị', false],
            'manage_system_settings' => ['Quản lý cấu hình hệ thống', false],
            'view_system_logs' => ['Quản lý nhật ký hệ thống', false],
        ];

        $repository = $this->entityManager->getRepository(Permission::class);

        // Lấy danh sách quyền hiện có trong cơ sở dữ liệu
        $existingPermissions = $repository->findAll();
        $existingNames = array_map(fn($permission) => $permission->getName(), $existingPermissions);

        // Thêm các quyền mới chưa có trong cơ sở dữ liệu
        foreach ($permissions as $name => [$description, $defaultGranted]) {
            if (!in_array($name, $existingNames)) {
                $permission = new Permission();
                $permission->setName($name)
                        ->setDescription($description)
                        ->setDefault($defaultGranted);
                $this->entityManager->persist($permission);
            }
        }

        // Xóa các quyền thừa không có trong danh sách tĩnh
        foreach ($existingPermissions as $permission) {
            if (!array_key_exists($permission->getName(), $permissions)) {
                $this->entityManager->remove($permission);
            }
        }

        // Ghi lại các thay đổi vào cơ sở dữ liệu
        $this->entityManager->flush();
    }

    /**
     * Lấy tất cả các quyền
     *
     * @return Permission[]
     */
    public function getAllPermissions(): array
    {
        return $this->permissionRepository->findAll();
    }

    public function viewAllPermissions(): array
    {
        $permissions = $this->permissionRepository->findAll();
        $data = [];
        foreach ($permissions as $permission) {
            $data[] = $permission->getName();
        }
        return $data;
    }

    /**
     * Lấy quyền theo ID
     *
     * @param int $id
     * @return Permission|null
     */
    public function getPermissionById(int $id): ?Permission
    {
        return $this->permissionRepository->find($id);
    }

    /**
     * Lấy quyền theo tên
     *
     * @param string $name
     * @return Permission|null
     */
    public function getPermissionByName(string $name): ?Permission
    {
        return $this->permissionRepository->findOneBy(['name' => $name]);
    }

    /**
     * Tạo mới quyền
     *
     * @param string $name
     * @param string|null $description
     * @return Permission
     */
    public function createPermission(string $name, ?string $description = null): Permission
    {
        // Kiểm tra quyền đã tồn tại hay chưa
        if ($this->getPermissionByName($name)) {
            throw new AppException('E2001', "Permission with name '$name' already exists.");
        }

        $permission = new Permission();
        $permission->setName($name)
                   ->setDescription($description);

        $this->entityManager->persist($permission);
        $this->entityManager->flush();

        return $permission;
    }

    /**
     * Cập nhật thông tin quyền
     *
     * @param int $id
     * @param array $data
     * @return Permission
     */
    public function updatePermission(int $id, array $data): Permission
    {
        $permission = $this->getPermissionById($id);

        if (!$permission) {
            throw new AppException('E2002', 'Permission not found.');
        }

        if (isset($data['name'])) {
            $existingPermission = $this->getPermissionByName($data['name']);
            if ($existingPermission && $existingPermission->getId() !== $id) {
                throw new AppException('E2003', "Permission with name '{$data['name']}' already exists.");
            }
            $permission->setName($data['name']);
        }

        if (isset($data['description'])) {
            $permission->setDescription($data['description']);
        }

        $this->entityManager->flush();

        return $permission;
    }

    /**
     * Xóa quyền theo ID
     *
     * @param int $id
     * @return void
     */
    public function deletePermission(int $id): void
    {
        $permission = $this->getPermissionById($id);

        if (!$permission) {
            throw new AppException('E2004', 'Permission not found.');
        }

        $this->entityManager->remove($permission);
        $this->entityManager->flush();
    }
}

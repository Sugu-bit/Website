<?php

namespace App\Service;

use App\Entity\UserPermission;
use App\Entity\User;
use App\Entity\Permission;
use App\Repository\UserPermissionRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;

class UserPermissionService
{
    private UserPermissionRepository $repository;
    private EntityManagerInterface $entityManager;
    private UserService $userService;
    private PermissionService $permissionService;

    public function __construct(
        UserPermissionRepository $repository,
        EntityManagerInterface $entityManager,
        UserService $userService,
        PermissionService $permissionService
    ) {
        $this->repository = $repository;
        $this->entityManager = $entityManager;
        $this->userService = $userService;
        $this->permissionService = $permissionService;
    }

    public function assignPermissions(array $data): array
    {
        // Lấy đối tượng User từ UserService
        $user = $this->userService->getUserById($data['user_id']);
        if (!$user) {
            throw new AppException('E1004'); // Người dùng không tồn tại
        }

        // Danh sách các quyền đã được gán thành công
        $assignedPermissions = [];

        // Lặp qua từng quyền trong danh sách 'permission'
        foreach ($data['permissions'] as $permissionKey => $permissionData) {
            // Lấy đối tượng Permission từ PermissionService
            $permission = $this->permissionService->getPermissionByName($permissionKey);
            if (!$permission) {
                // Nếu không tìm thấy quyền, bỏ qua quyền này
                continue;
            }

            $userPermission = new UserPermission();
            $userPermission->setUser($user)
                ->setPermission($permission)
                ->setIsActive($permissionData['is_active'] ?? true)
                ->setIsDenied($permissionData['is_denied'] ?? false);
            if (isset($permissionData['target'])){
                if ($permissionData['target']==="all"){
                    $userPermission->setTargetId(null);
                } else{
                    $userPermission->setTargetId($permissionData['target']);
                }
            }
            else{
                throw new AppException('E1004'); 
            }
            
            $this->entityManager->persist($userPermission);

            // Thêm quyền vào danh sách gán thành công
            $assignedPermissions[] = [
                'permission' => $permissionKey,
                'status' => 'assigned'
            ];
        }

        // Lưu tất cả các thay đổi vào cơ sở dữ liệu
        $this->entityManager->flush();

        return $assignedPermissions;
    }
    public function setPermission(User $user, array $permissions): array // hàm khởi tạo cho superadmin
    {
        $userPermissions = [];

        foreach ($permissions as $permission) {
            if (!$permission instanceof Permission) {
                throw new \InvalidArgumentException('Each item in permissions array must be an instance of Permission.');
            }

            $userPermission = new UserPermission();
            $userPermission->setUser($user)
                ->setPermission($permission)
                ->setIsActive(true) // Giá trị mặc định
                ->setIsDenied(false) // Giá trị mặc định
                ->setTargetId(null); // Giá trị mặc định

            $this->entityManager->persist($userPermission);
            $userPermissions[] = $userPermission;
        }

        $this->entityManager->flush();

        return $userPermissions;
    }

    public function findPermissionsByUser(User $user): array
    {
        // Lấy danh sách các quyền của người dùng
        return$this->repository->findBy(['user' => $user]);
    }

    public function getPermissionsByUser(User $user): array
    {
        // Lấy danh sách các quyền của người dùng
        $permissions = $this->repository->findBy(['user' => $user]);
        $result = [];
        foreach ($permissions as $permission) {
            $result[] = $permission->getPermission()->getName();
        }
        return $result;
    }

    public function updatePermission(array $data): array
    {
        // Lấy đối tượng User từ UserService
        $user = $this->userService->getUserById($data['user_id']);
        if (!$user) {
            throw new AppException('E1004'); // Người dùng không tồn tại
        }

        // Danh sách quyền được cập nhật thành công
        $updatedPermissions = [];

        // Lặp qua danh sách các quyền trong dữ liệu
        foreach ($data['permissions'] as $permissionKey => $permissionData) {
            // Tìm quyền trong cơ sở dữ liệu
            $permission = $this->permissionService->getPermissionByName($permissionKey);
            if (!$permission) {
                continue; // Nếu quyền không tồn tại, bỏ qua
            }

            // Tìm bản ghi UserPermission hiện tại
            $userPermission = $this->repository->findOneBy([
                'user' => $user,
                'permission' => $permission,
            ]);

            if (!$userPermission) {
                throw new AppException('E2023'); // Quyền không tồn tại cho người dùng
            }

            // Cập nhật thông tin quyền
            $userPermission->setIsActive($permissionData['is_active'] ?? $userPermission->isActive())
                ->setIsDenied($permissionData['is_denied'] ?? $userPermission->isDenied());

            if (isset($permissionData['target'])){
                if ($permissionData['target']==="all"){
                    $userPermission->setTargetId(null);
                } else{
                    $userPermission->setTargetId($permissionData['target']);
                }
            }
            else{
                throw new AppException('E1004'); 
            }

            $this->entityManager->persist($userPermission);

            // Thêm quyền vào danh sách cập nhật thành công
            $updatedPermissions[] = [
                'permission' => $permissionKey,
                'status' => 'updated',
            ];
        }

        // Lưu các thay đổi vào cơ sở dữ liệu
        $this->entityManager->flush();

        return $updatedPermissions;
    }

    public function hasPermission(int $userId, string $permissionName, ?int $targetId = null): int
    {
        // Lấy tất cả bản ghi của user có permission trùng khớp
        $userPermissions = $this->repository->findUserPermission($userId, $permissionName);

        foreach ($userPermissions as $permission) {
            if (!$permission->isActive()){
                continue;
            }
            // Nếu có bản ghi targetId = null, trả về true
            if ($permission->getTargetId() === null) {
                if ($permission->isDenied()){
                    return -1;
                }
                return 1;
            }
            // Nếu có targetId trùng khớp, trả về true
            if ($permission->getTargetId() === $targetId) {
                if ($permission->isDenied()){
                    return -1;
                }
                return 1;
            }
        }

        // Không tìm thấy bất kỳ bản ghi nào phù hợp
        return 0;
    }

    public function deletePermissions(array $data): void
    {
        // Lấy đối tượng User từ UserService
        $user = $this->userService->getUserById($data['user_id']);
        if (!$user) {
            throw new AppException('E1004'); // Người dùng không tồn tại
        }
        $permissions = $data["permissions"];

        foreach ($permissions as $permissionName) {
            $permission = $this->permissionService->getPermissionByName($permissionName);
            if (!$permission) {
                continue; // Nếu quyền không tồn tại, bỏ qua
            }

            // Tìm bản ghi UserPermission
            $userPermission = $this->repository->findOneBy([
                'user' => $user,
                'permission' => $permission,
            ]);

            if ($userPermission) {
                $this->entityManager->remove($userPermission);
            }
        }

        // Thực hiện lưu thay đổi vào cơ sở dữ liệu
        $this->entityManager->flush();
    }
}

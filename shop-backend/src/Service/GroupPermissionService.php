<?php

namespace App\Service;

use App\Entity\GroupPermission;
use App\Entity\Group;
use App\Repository\GroupPermissionRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;

class GroupPermissionService
{
    private GroupPermissionRepository $repository;
    private EntityManagerInterface $entityManager;
    private GroupService $groupService;
    private PermissionService $permissionService;

    public function __construct(
        GroupPermissionRepository $repository,
        EntityManagerInterface $entityManager,
        GroupService $groupService,
        PermissionService $permissionService
    ) {
        $this->repository = $repository;
        $this->entityManager = $entityManager;
        $this->groupService = $groupService;
        $this->permissionService = $permissionService;
    }

    public function assignPermissions(array $data): array
    {
        $group = $this->groupService->getGroupById($data['group_id']);
        if (!$group) {
            throw new AppException('E10110'); // Nhóm không tồn tại
        }

        $assignedPermissions = [];

        foreach ($data['permissions'] as $permissionKey => $permissionData) {
            $permission = $this->permissionService->getPermissionByName($permissionKey);
            if (!$permission) {
                continue; // Bỏ qua nếu không tìm thấy quyền
            }

            $groupPermission = new GroupPermission();
            $groupPermission->setGroup($group)
                ->setPermission($permission)
                ->setIsActive($permissionData['is_active'] ?? true)
                ->setIsDenied($permissionData['is_denied'] ?? false);

            if (isset($permissionData['target'])){
                if ($permissionData['target']==="all"){
                    $groupPermission->setTargetId(null);
                } else{
                    $groupPermission->setTargetId($permissionData['target']);
                }
            }
            else{
                throw new AppException('E1004'); 
            }
            $this->entityManager->persist($groupPermission);

            $assignedPermissions[] = [
                'permission' => $permissionKey,
                'status' => 'assigned'
            ];
        }

        $this->entityManager->flush();

        return $assignedPermissions;
    }

    public function getPermissionsByGroup(Group $group): array
    {
        $permissions =  $this->repository->findBy(['group' => $group]);
        $result = [];
        foreach ($permissions as $permission) {
            $result[] = $permission->getPermission()->getName();
        }
        return $result;
    }

    public function updatePermission(array $data): array
    {
        $group = $this->groupService->getGroupById($data['group_id']);
        if (!$group) {
            throw new AppException('E10110'); // Nhóm không tồn tại
        }

        $updatedPermissions = [];

        foreach ($data['permissions'] as $permissionKey => $permissionData) {
            $permission = $this->permissionService->getPermissionByName($permissionKey);
            if (!$permission) {
                continue; // Bỏ qua nếu quyền không tồn tại
            }

            $groupPermission = $this->repository->findOneBy([
                'group' => $group,
                'permission' => $permission,
            ]);

            if (!$groupPermission) {
                throw new AppException('E2023'); // Quyền không tồn tại cho nhóm
            }

            $groupPermission->setIsActive($permissionData['is_active'] ?? $groupPermission->isActive())
                ->setIsDenied($permissionData['is_denied'] ?? $groupPermission->isDenied());
            
            if (isset($permissionData['target'])){
                if ($permissionData['target']==="all"){
                    $groupPermission->setTargetId(null);
                } else{
                    $groupPermission->setTargetId($permissionData['target']);
                }
            }
            else{
                throw new AppException('E1004'); 
            }
            $this->entityManager->persist($groupPermission);

            $updatedPermissions[] = [
                'permission' => $permissionKey,
                'status' => 'updated',
            ];
        }

        $this->entityManager->flush();

        return $updatedPermissions;
    }

    public function hasPermission(int $groupId, string $permissionName, ?int $targetId = null): int
    {
        $groupPermissions = $this->repository->findGroupPermission($groupId, $permissionName);

        foreach ($groupPermissions as $permission) {
            if (!$permission->isActive()) {
                continue;
            }

            if ($permission->getTargetId() === null) {
                if ($permission->isDenied()) {
                    return -1;
                }
                return 1;
            }

            if ($permission->getTargetId() === $targetId) {
                if ($permission->isDenied()) {
                    return -1;
                }
                return 1;
            }
        }

        return 0;
    }

    public function deletePermissions(array $data): void
    {
        $group = $this->groupService->getGroupById($data['group_id']);
        if (!$group) {
            throw new AppException('E10110'); // Nhóm không tồn tại
        }

        $permissions = $data['permissions'];

        foreach ($permissions as $permissionName) {
            $permission = $this->permissionService->getPermissionByName($permissionName);
            if (!$permission) {
                continue; // Bỏ qua nếu quyền không tồn tại
            }

            $groupPermission = $this->repository->findOneBy([
                'group' => $group,
                'permission' => $permission,
            ]);

            if ($groupPermission) {
                $this->entityManager->remove($groupPermission);
            }
        }

        $this->entityManager->flush();
    }
}

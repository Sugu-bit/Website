<?php

namespace App\Service;

use App\Entity\User;



class AuthorizationService
{
    private $userPermissionService;
    private $groupMemberService;
    private $groupPermissionService;
    private $permissionService;

    public function __construct(
        UserPermissionService $userPermissionService,
        GroupMemberService $groupMemberService,
        GroupPermissionService $groupPermissionService,
        PermissionService $permissionService
    ) {
        $this->userPermissionService = $userPermissionService;
        $this->groupMemberService = $groupMemberService;
        $this->groupPermissionService = $groupPermissionService;
        $this->permissionService = $permissionService;
    }

    /**
     * Kiểm tra quyền của người dùng hoặc nhóm.
     *
     * @param User $user Người dùng cần kiểm tra
     * @param string $permissionName Tên quyền cần kiểm tra
     * @param int|null $targetId Đối tượng đích cần kiểm tra
     * @return bool Trả về true nếu người dùng hoặc nhóm có quyền, false nếu không
     */
    public function checkPermission(User $user, string $permissionName, ?int $targetId = null, bool $isUserOwned = false): bool
    {
        // 1. Kiểm tra quyền của người dùng
        $userPermission = $this->userPermissionService->hasPermission($user->getId(), $permissionName, $targetId);
        if ($userPermission < 0){
            return false;
        } else if ($userPermission > 0){
            return true;
        }
        if ($isUserOwned){
            return true;
        }
        
        // 2. Lấy danh sách các nhóm mà người dùng thuộc về
        $groups = $this->groupMemberService->findGroupsByUser($user);

        // 3. Kiểm tra quyền của từng nhóm
        foreach ($groups as $group) {
            if ($this->groupPermissionService->hasPermission($group, $permissionName, $targetId)) {
                return true;
            }
        }

        // 4. Không tìm thấy quyền hợp lệ
        $permission = $this->permissionService->getPermissionByName($permissionName);
        if ($permission){
            return $permission->getDefault();
        }
        else{
            return false;
        }
    }
}


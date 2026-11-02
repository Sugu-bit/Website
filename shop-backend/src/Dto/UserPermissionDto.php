<?php

namespace App\Dto;

use App\Entity\UserPermission;

class UserPermissionDto
{
    public int $id;
    public int $userId;
    public int $permissionId;
    public ?int $targetId;
    public bool $isActive;
    public bool $isDenied;

    public function __construct(UserPermission $userPermission)
    {
        $this->id = $userPermission->getId();
        $this->userId = $userPermission->getUser()->getId();
        $this->permissionId = $userPermission->getPermission()->getId();
        $this->targetId = $userPermission->getTargetId();
        $this->isActive = $userPermission->isActive();
        $this->isDenied = $userPermission->isDenied();
    }
}

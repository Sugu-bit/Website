<?php

namespace App\Dto;

use App\Entity\GroupPermission;


class GroupPermissionDto
{
    public int $id;
    public GroupDto $group;
    public PermissionDto $permission;
    public ?int $targetId;
    public bool $isActive;
    public bool $isDenied;

    public function __construct(GroupPermission $groupPermission)
    {
        $this->id = $groupPermission->getId();
        $this->group = new GroupDto($groupPermission->getGroup());
        $this->permission = new PermissionDto($groupPermission->getPermission());
        $this->targetId = $groupPermission->getTargetId();
        $this->isActive = $groupPermission->isActive();
        $this->isDenied = $groupPermission->isDenied();
    }
}

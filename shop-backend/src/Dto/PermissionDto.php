<?php

namespace App\Dto;

use App\Entity\Permission;

class PermissionDto
{
    public int $id;
    public string $name;
    public ?string $description;

    public function __construct(Permission $permission)
    {
        $this->id = $permission->getId();
        $this->name = $permission->getName();
        $this->description = $permission->getDescription();
    }
}

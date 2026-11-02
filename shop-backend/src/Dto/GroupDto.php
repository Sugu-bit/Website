<?php

namespace App\Dto;

use App\Entity\Group;

class GroupDto
{
    public int $id;
    public string $name;
    public ?string $description;

    public function __construct(Group $group)
    {
        $this->id = $group->getId();
        $this->name = $group->getName();
        $this->description = $group->getDescription();
    }
}

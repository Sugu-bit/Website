<?php

namespace App\Dto;

use App\Entity\GroupMember;


class GroupMemberDto
{
    public UserDto $user;
    public GroupDto $group;

    public function __construct(GroupMember $groupMember)
    {
        $this->user = new UserDto($groupMember->getUser());
        $this->group = new GroupDto($groupMember->getGroup());
    }
}

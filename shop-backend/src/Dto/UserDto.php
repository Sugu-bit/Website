<?php

namespace App\Dto;

use App\Entity\User;

class UserDto
{
    public int $id;
    public string $username;
    public string $email;
    public ?string $phone;
    public ?string $address;


    public function __construct(User $user)
    {
        $this->id = $user->getId();
        $this->username = $user->getUsername();
        $this->email = $user->getEmail();
        $this->phone = $user->getPhone();
        $this->address = $user->getAddress();
    }
}

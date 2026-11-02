<?php

namespace App\Entity;

use App\Repository\UserPermissionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserPermissionRepository::class)]
#[ORM\Table(name: 'user_permissions')]
class UserPermission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'bigint')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'userPermissions')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: Permission::class)]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private ?Permission $permission = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $targetId = null;

    #[ORM\Column(type: 'boolean', options: ['default' => true])]
    private bool $isActive = true;

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    private bool $isDenied = false;

    // Getters and setters...

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getPermission(): ?Permission
    {
        return $this->permission;
    }

    public function setPermission(?Permission $permission): self
    {
        $this->permission = $permission;
        return $this;
    }

    public function getTargetId(): ?int
    {
        return $this->targetId;
    }

    public function setTargetId(?int $targetId): self
    {
        $this->targetId = $targetId;
        return $this;
    }

    public function isActive(): bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;
        return $this;
    }

    public function isDenied(): bool
    {
        return $this->isDenied;
    }

    public function setIsDenied(bool $isDenied): self
    {
        $this->isDenied = $isDenied;
        return $this;
    }
}

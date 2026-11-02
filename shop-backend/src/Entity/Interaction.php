<?php

namespace App\Entity;

use App\Repository\InteractionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InteractionRepository::class)]
#[ORM\Table(name: 'interactions')]
class Interaction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'bigint')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: Product::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    #[ORM\ManyToOne(targetEntity: Action::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Action $action = null;

    #[ORM\Column(type: 'datetime', options: ['default' => 'CURRENT_TIMESTAMP'])]
    private \DateTime $createdAt;

    #[ORM\PrePersist]
    public function prePersist(): void
    {
        $this->createdAt = new \DateTime();
    }

    // Getters and setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(Product $product): self
    {
        $this->product = $product;
        return $this;
    }

    public function getAction(): ?Action
    {
        return $this->action;
    }

    public function setAction(Action $action): self
    {
        $this->action = $action;
        return $this;
    }

    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }
}

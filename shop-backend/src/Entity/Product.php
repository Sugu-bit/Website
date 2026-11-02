<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\Table(name: 'products')]
#[ORM\HasLifecycleCallbacks]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'bigint')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 300, nullable: false)]
    private ?string $name = null;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $popularity = null;
    
    #[ORM\Column(type: 'string', length: 255)]
    private string $locationAddress;

    #[ORM\ManyToOne(targetEntity: Category::class)]
    #[ORM\JoinColumn(nullable: true)]
    private ?Category $category = null;

    #[ORM\Column(type: 'datetime', options: ['default' => 'CURRENT_TIMESTAMP'])]
    private \DateTime $createdAt;

    #[ORM\Column(type: 'datetime', options: ['default' => 'CURRENT_TIMESTAMP'])]
    private \DateTime $updatedAt;

    #[ORM\Column(type: 'integer', nullable: true, options: ['default' => 0])]
    private ?int $discountPercentage = 0;

    #[ORM\Column(type: 'boolean', options: ['default' => true])]
    private bool $isActive = true;

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    private bool $isDelete = false;

    // Lifecycle callbacks
    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->updatedAt = new \DateTime();
    }

    // Getters and Setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPopularity(): ?int
    {
        return $this->popularity;
    }

    public function setPopularity(?int $popularity): static
    {
        $this->popularity = $popularity;
        return $this;
    }

    public function getLocationAddress(): string
    {
        return $this->locationAddress;
    }

    public function setLocationAddress(string $locationAddress): static
    {
        $this->locationAddress = $locationAddress;
        return $this;
    }
    
    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->isActive;
    }

    public function setActive(bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function isDelete(): ?bool
    {
        return $this->isDelete;
    }

    public function setDelete(bool $isDelete): static
    {
        $this->isDelete = $isDelete;

        return $this;
    }
    
    // Getter
    public function getDiscountPercentage(): ?int
    {
        return $this->discountPercentage;
    }

    // Setter
    public function setDiscountPercentage(?int $discountPercentage): static
    {
        $this->discountPercentage = $discountPercentage;
        return $this;
    }
}

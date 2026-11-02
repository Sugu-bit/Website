<?php

namespace App\Entity;

use App\Repository\FileRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FileRepository::class)]
#[ORM\Table(name: "files")]
class File
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'bigint')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column(type: 'string', length: 255)]
    private string $fileName;

    #[ORM\Column(type: 'string', length: 255)]
    private string $filePath;

    #[ORM\Column(type: 'bigint')]
    private int $fileSize;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $sort;

    #[ORM\Column(type: 'bigint', nullable: true)]
    private ?int $targetId = null;

    #[ORM\Column(type: 'datetime')]
    private \DateTimeInterface $uploadedAt;

    #[ORM\Column(type: 'boolean', options: ['default' => true])]
    private bool $isActive;

    #[ORM\ManyToOne(targetEntity: ListTable::class)]
    private ?ListTable $listTable = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    // Getter and Setter for $id
    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    // Getter and Setter for $fileName
    public function getFileName(): string
    {
        return $this->fileName;
    }

    public function setFileName(string $fileName): self
    {
        $this->fileName = $fileName;
        return $this;
    }

    // Getter and Setter for $filePath
    public function getFilePath(): string
    {
        return $this->filePath;
    }

    public function setFilePath(string $filePath): self
    {
        $this->filePath = $filePath;
        return $this;
    }

    // Getter and Setter for $fileSize
    public function getFileSize(): int
    {
        return $this->fileSize;
    }

    public function setFileSize(int $fileSize): self
    {
        $this->fileSize = $fileSize;
        return $this;
    }

    // Getter and Setter for $sort
    public function getSort(): ?int
    {
        return $this->sort;
    }

    public function setSort(?int $sort): self
    {
        $this->sort = $sort;
        return $this;
    }

    // Getter and Setter for $uploadedAt
    public function getUploadedAt(): \DateTimeInterface
    {
        return $this->uploadedAt;
    }

    public function setUploadedAt(\DateTimeInterface $uploadedAt): self
    {
        $this->uploadedAt = $uploadedAt;
        return $this;
    }

    // Getter and Setter for $isActive
    public function getIsActive(): bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;
        return $this;
    }

    // Getter and Setter for $listTable
    public function getListTable(): ?ListTable
    {
        return $this->listTable;
    }

    public function setListTable(?ListTable $listTable): self
    {
        $this->listTable = $listTable;
        return $this;
    }

    // Getter and Setter for $description
    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
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

}

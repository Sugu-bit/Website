<?php
// src/Entity/ListTable.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

use App\Repository\ListTableRepository;

#[ORM\Entity(repositoryClass: ListTableRepository::class)]
#[ORM\Table(name: 'list_table')]
class ListTable
{
    #[ORM\Id]
    #[ORM\Column(type: 'string', length: 100)]
    private string $id;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $description = null;

    // Getters and Setters

    public function getTableName(): string
    {
        return $this->id;
    }

    public function setTableName(string $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }
}

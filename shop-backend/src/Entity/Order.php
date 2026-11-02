<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: 'orders')]



class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'bigint')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2, nullable: false)]
    private ?float $totalAmount = null;

    #[ORM\Column(type: 'string', length: 50, nullable: false)]
    private ?string $paymentMethod = null; // Hình thức thanh toán

    #[ORM\Column(type: 'string', length: 255)]
    private ?string $address = '';

    #[ORM\Column(type: 'string', length: 50, nullable: false)]
    private ?string $shippingStatus = 'pending'; // Trạng thái vận chuyển

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    private bool $paymentStatus = false; // Trạng thái thanh toán

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2, options: ['default' => 0.00])]
    private float $shippingFee = 0.00;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2, options: ['default' => 0.00])]
    private float $productDiscount = 0.00;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2, options: ['default' => 0.00])]
    private float $shipDiscount = 0.00;

    #[ORM\Column(type: 'datetime', options: ['default' => 'CURRENT_TIMESTAMP'])]
    private \DateTime $createdAt;

    #[ORM\Column(type: 'datetime', options: ['default' => 'CURRENT_TIMESTAMP'])]
    private \DateTime $updatedAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTotalAmount(): ?float
    {
        return $this->totalAmount;
    }

    public function setTotalAmount(?float $totalAmount): static
    {
        $this->totalAmount = $totalAmount;

        return $this;
    }

    public function getPaymentMethod(): ?string
    {
        return $this->paymentMethod;
    }

    public function setPaymentMethod(string $paymentMethod): static
    {
        $this->paymentMethod = $paymentMethod;

        return $this;
    }

    public function getShippingStatus(): ?string
    {
        return $this->shippingStatus;
    }

    public function setShippingStatus(string $shippingStatus): static
    {
        $this->shippingStatus = $shippingStatus;

        return $this;
    }

    public function getPaymentStatus(): ?bool
    {
        return $this->paymentStatus;
    }

    public function setPaymentStatus(bool $paymentStatus): static
    {
        $this->paymentStatus = $paymentStatus;

        return $this;
    }

    public function getShippingFee(): ?float
    {
        return $this->shippingFee;
    }

    public function setShippingFee(float $shippingFee): static
    {
        $this->shippingFee = $shippingFee;

        return $this;
    }

    public function getProductDiscount(): ?float
    {
        return $this->productDiscount;
    }

    public function setProductDiscount(float $productDiscount): static
    {
        $this->productDiscount = $productDiscount;

        return $this;
    }

    public function getShipDiscount(): ?float
    {
        return $this->shipDiscount;
    }

    public function setShipDiscount(float $shipDiscount): static
    {
        $this->shipDiscount = $shipDiscount;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getAddress():?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;
        return $this;
    }
}

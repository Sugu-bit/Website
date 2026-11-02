<?php

namespace App\Service;

use App\Entity\Interaction;
use App\Entity\User;
use App\Entity\Product;
use App\Entity\Action;
use App\Exception\AppException;
use Doctrine\ORM\EntityManagerInterface;

class InteractionService
{
    private EntityManagerInterface $entityManager;
    private UserService $userService;
    private ProductService $productService;
    private ActionService $actionService;

    public function __construct(EntityManagerInterface $entityManager, UserService $userService, ProductService $productService, ActionService $actionService)
    {
        $this->entityManager = $entityManager;
        $this->userService = $userService;
        $this->productService = $productService;
        $this->actionService = $actionService;
    }

    public function createInteraction(array $data): Interaction
    {
        $user = $this->userService->getUserById($data['userId']);
        $product = $this->productService->getProductById($data['productId']);
        $action = $this->actionService->getActionById($data['actionId']);

        $interaction = new Interaction();
        $interaction->setUser($user)
                    ->setProduct($product)
                    ->setAction($action);

        $this->entityManager->persist($interaction);
        $this->entityManager->flush();

        return $interaction;
    }

    public function getUserInteractions(int $userId): array
    {
        return $this->entityManager->getRepository(Interaction::class)->findByUserId($userId);
    }

    public function getProductInteractions(int $productId): array
    {
        return $this->entityManager->getRepository(Interaction::class)->findByProductId($productId);
    }

    public function countInteractionsByActionId(int $actionId): int
    {
        return $this->entityManager->getRepository(Interaction::class)->countByActionId($actionId);
    }
}

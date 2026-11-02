<?php

namespace App\Service;

use App\Entity\Action;
use App\Repository\ActionRepository;
use App\Exception\AppException;
use Doctrine\ORM\EntityManagerInterface;

class ActionService
{
    private EntityManagerInterface $entityManager;
    private ActionRepository $actionRepository;

    public function __construct(EntityManagerInterface $entityManager, ActionRepository $actionRepository)
    {
        $this->entityManager = $entityManager;
        $this->actionRepository = $actionRepository;
    }

    public function createAction(array $data): Action
    {
        $action = new Action();
        $action->setName($data['name'] ?? throw new AppException('Action name is required'))
               ->setDescription($data['description'] ?? null)
               ->setScore($data['score'] ?? 0);

        $this->entityManager->persist($action);
        $this->entityManager->flush();

        return $action;
    }

    public function getAllActions(): array{
        return $this->actionRepository->findAll();
    }

    public function getActionById(int $id): ?Action {
        return $this->actionRepository->findById($id);
    }

    public function getActionByName(string $name): ?Action
    {
        return $this->actionRepository->findByName($name);
    }

    public function getAllActionsOrderedByScore(): array
    {
        return $this->actionRepository->findAllOrderedByScore();
    }

    public function updateActionScore(string $name, int $score): Action
    {
        $action = $this->getActionByName($name);

        if (!$action) {
            throw new AppException('Action not found');
        }

        $action->setScore($score);
        $this->entityManager->flush();

        return $action;
    }
}

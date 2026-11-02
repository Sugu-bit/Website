<?php

namespace App\Service;

use App\Entity\Group;
use App\Repository\GroupRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;

class GroupService
{
    private GroupRepository $groupRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(GroupRepository $groupRepository, EntityManagerInterface $entityManager)
    {
        $this->groupRepository = $groupRepository;
        $this->entityManager = $entityManager;
    }

    public function getPaginatedGroups(int $page, int $limit): array
    {
        return $this->groupRepository->findAllPaginated($page, $limit);
    }

    // Lấy thông tin nhóm theo ID
    public function getGroupById(int $id): ?Group
    {
        $group = $this->groupRepository->find($id);

        if (!$group) {
            throw new AppException('E10110');
        }

        return $group;
    }

    // Tạo nhóm mới
    public function createGroup(array $data): Group
    {
        $group = new Group();
        $group->setName($data['name'] ?? throw new AppException('Name is required'))
            ->setDescription($data['description'] ?? null);

        $this->entityManager->persist($group);
        $this->entityManager->flush();

        return $group;
    }

    // Cập nhật thông tin nhóm
    public function updateGroup(int $id, array $data): Group
    {
        $group = $this->getGroupById($id);

        $group->setName($data['name'] ?? $group->getName())
            ->setDescription($data['description'] ?? $group->getDescription());

        $this->entityManager->flush();

        return $group;
    }

    // Xóa nhóm
    public function deleteGroup(int $id): void
    {
        $group = $this->getGroupById($id);

        $this->entityManager->remove($group);
        $this->entityManager->flush();
    }
}

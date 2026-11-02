<?php

namespace App\Service;

use App\Entity\GroupMember;
use App\Entity\User;
use App\Repository\GroupMemberRepository;
use Doctrine\ORM\EntityManagerInterface;

class GroupMemberService
{
    private EntityManagerInterface $entityManager;
    private GroupMemberRepository $groupMemberRepository;
    private UserService $userService;
    private GroupService $groupService;

    public function __construct(
        EntityManagerInterface $entityManager,
        GroupMemberRepository $groupMemberRepository,
        UserService $userService,
        GroupService $groupService
    ) {
        $this->entityManager = $entityManager;
        $this->groupMemberRepository = $groupMemberRepository;
        $this->userService = $userService;
        $this->groupService = $groupService;
    }

    public function addUserToGroup(array $data): GroupMember
    {
        $user = $this->userService->getUserById($data['userId']);
        $group = $this->groupService->getGroupById($data['groupId']);

        $groupMember = new GroupMember();
        $groupMember->setUser($user);
        $groupMember->setGroup($group);

        $this->entityManager->persist($groupMember);
        $this->entityManager->flush();

        return $groupMember;
    }

    public function removeUserFromGroup(array $data): void
    {
        $user = $this->userService->getUserById($data['userId']);
        $group = $this->groupService->getGroupById($data['groupId']);

        $groupMember = $this->groupMemberRepository->findByUserAndGroup($user, $group);

        if ($groupMember) {
            $this->entityManager->remove($groupMember);
            $this->entityManager->flush();
        }
    }

    public function findGroupsByUser(User $user): array
    {
        $groupMember = $this->groupMemberRepository->findGroupMembersByUser($user);
        $groups = [];
        foreach ($groupMember as $gm) {
            $groups[] = $gm->getGroup();
        }
        return $groups;
    }

    public function getGroupsByUser(int $id): array
    {
        $user = $this->userService->getUserById($id);
        $groups = [];
        $groupMember = $this->groupMemberRepository->findGroupMembersByUser($user);
        foreach ($groupMember as $gm) {
            $groups[] = $gm->getGroup();
        }
        return $groups;
    }

    public function getUsersInGroup(int $id): array
    {
        $group = $this->groupService->getGroupById($id);
        $users = [];
        $groupMember = $this->groupMemberRepository->findGroupMembersByGroup($group);
        foreach ($groupMember as $gm) {
            $users[] = $gm->getUser();
        }
        return $users;
    }

    public function isUserInGroup(array $data): bool
    {
        $user = $this->userService->getUserById($data['userId']);
        $group = $this->groupService->getGroupById($data['groupId']);

        return $this->groupMemberRepository->existsByUserAndGroup($user, $group);
    }
}
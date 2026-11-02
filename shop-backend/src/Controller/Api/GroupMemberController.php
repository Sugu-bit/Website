<?php

namespace App\Controller\Api;

use App\Service\GroupMemberService;
use App\Service\AuthorizationService;
use App\Dto\GroupDto;
use App\Dto\UserDto;
use App\Dto\GroupMemberDto;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;
use App\Validators\GroupMemberValidator;


#[Route('/api/group-member', name: 'group-member_')]
class GroupMemberController extends AbstractController
{
    private GroupMemberService $groupMemberService;
    private AuthorizationService $authorizationService;
    private GroupMemberValidator $groupMemberValidator;

    public function __construct(GroupMemberService $groupMemberService, AuthorizationService $authorizationService, GroupMemberValidator $groupMemberValidator)
    {
        $this->groupMemberService = $groupMemberService;
        $this->authorizationService = $authorizationService;
        $this->groupMemberValidator = $groupMemberValidator;
    }

    #[Route('/add', name: 'add', methods: ['POST'])]
    public function addUserToGroup(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "manage_group_members");
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);
        $validatedData = $this->groupMemberValidator->validateGroupMemberData($data);
        $groupMember = $this->groupMemberService->addUserToGroup($validatedData);
        return $this->json(['message' => 'User added to group successfully', 'group_member' => new GroupMemberDto($groupMember)], 201);
    }

    #[Route('/remove', name: 'remove', methods: ['POST'])]
    public function removeUserFromGroup(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "manage_group_members");
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);

        if (!isset($data['userId'], $data['groupId'])) {
            return $this->json(['error' => 'Missing parameters'], 400);
        }

        try {
            $this->groupMemberService->removeUserFromGroup($data);

            return $this->json(['message' => 'User removed from group successfully'], 200);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/user/groups', name: 'get_groups_for_user_current', methods: ['GET'])]
    public function getGroupsForUserCurrent(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "view_group_details");
        if (!$a) {
            throw new AppException('E2021');
        }
        $user = $request->attributes->get('user');
        if (!$user){
            throw new AppException('E2025');
        }
        $groups = $this->groupMemberService->findGroupsByUser($user);
        $groupDtos = array_map(fn($group) => new GroupDto($group), $groups);
        return $this->json($groupDtos, 200);
    }

    #[Route('/user_{id}/groups', name: 'get_groups_for_user', methods: ['GET'])]
    public function getGroupsForUser(int $id, Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "view_group_details");
        if (!$a) {
            throw new AppException('E2021');
        }
        $groups = $this->groupMemberService->getGroupsByUser($id);
        $groupDtos = array_map(fn($group) => new GroupDto($group), $groups);
        return $this->json($groupDtos, 200);
    }

    #[Route('/group_{id}/users', name: 'get_users_in_group', methods: ['GET'])]
    public function getUsersInGroup(int $id, Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "view_group_details");
        if (!$a) {
            throw new AppException('E2021');
        }
        $users = $this->groupMemberService->getUsersInGroup($id);
        $userDtos = array_map(fn($user) => new UserDto($user), $users);
        return $this->json($userDtos, 200);
    }

    #[Route('/check', name: 'is_user_in_group', methods: ['POST'])]
    public function isUserInGroup(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "view_group_details");
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);

        if (!isset($data['userId'], $data['groupId'])) {
            return $this->json(['error' => 'Missing parameters'], 400);
        }

        try {
            $isInGroup = $this->groupMemberService->isUserInGroup($data);

            return $this->json(['is_in_group' => $isInGroup], 200);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}

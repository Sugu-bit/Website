<?php

namespace App\Controller\Api;

use App\Service\GroupService;
use App\Service\AuthorizationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;
use App\Dto\GroupDto;
use App\Validators\GroupValidator;

#[Route('/api/group', name: 'group_')]
class GroupController extends AbstractController
{
    private GroupService $userGroupService;
    private AuthorizationService $authorizationService;
    private GroupValidator $groupValidator;

    public function __construct(GroupService $userGroupService, AuthorizationService $authorizationService, GroupValidator $groupValidator)
    {
        $this->userGroupService = $userGroupService;
        $this->authorizationService = $authorizationService;
        $this->groupValidator = $groupValidator;
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent) {
            throw new AppException('E2025');
        }

        $hasPermission = $this->authorizationService->checkPermission($userCurrent, "view_groups");
        if (!$hasPermission) {
            throw new AppException('E2020');
        }

        // Lấy tham số phân trang
        $page = (int) $request->query->get('page', 1);
        $limit = (int) $request->query->get('limit', 10);

        if ($page < 1 || $limit < 1) {
            throw new AppException('Invalid pagination parameters');
        }

        $groups = $this->userGroupService->getPaginatedGroups($page, $limit);
        $groupDtos = array_map(fn($group) => new GroupDto($group), $groups);

        return $this->json($groupDtos);
    }

    #[Route('/{id}', name: 'detail', methods: ['GET'])]
    public function detail(int $id): JsonResponse
    {
        $userGroup = $this->userGroupService->getGroupById($id);
        if (!$userGroup) {
            return $this->json(['message' => 'Group not found'], 404);
        }

        return $this->json(new GroupDto($userGroup));
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "create_group");
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);
        $validatedData = $this->groupValidator->validateGroupData($data, 'create');
        try {
            $userGroup = $this->userGroupService->createGroup($validatedData);
            $em->persist($userGroup);
            $em->flush();

            return $this->json(new GroupDto($userGroup), 201);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, int $id, EntityManagerInterface $em): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "edit_group", $id);
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);
        $validatedData = $this->groupValidator->validateGroupData($data, 'update');
        try {
            $userGroup = $this->userGroupService->updateGroup($id, $validatedData);
            $em->flush();

            return $this->json(new GroupDto($userGroup));
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em, Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "delete_group", $id);
        if (!$a) {
            throw new AppException('E2021');
        }
        try {
            $this->userGroupService->deleteGroup($id);
            $em->flush();

            return $this->json(['message' => 'Group deleted']);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }
}

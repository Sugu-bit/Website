<?php

namespace App\Controller\Api;

use App\Service\GroupPermissionService;
use App\Service\GroupService;
use App\Service\AuthorizationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;
use App\Validator\GroupPermissionValidator;



#[Route('/api/group-permissions')]
class GroupPermissionController extends AbstractController
{
    private GroupPermissionService $service;
    private GroupService $groupService;
    private AuthorizationService $authorizationService;

    public function __construct(GroupPermissionService $service, GroupService $groupService, AuthorizationService $authorizationService)
    {
        $this->service = $service;
        $this->groupService = $groupService;
        $this->authorizationService = $authorizationService;
    }

    #[Route('', methods: ['POST'])]
    public function assignPermission(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent) {
            throw new AppException('E1004');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "create_permission");
        if (!$a) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);
        // $validatedData = $this->groupPermissionValidator->validateAssignOrUpdatePermission($data);
        $groupPermission = $this->service->assignPermissions($data);
        return $this->json($groupPermission, 201);
    }

    #[Route('/{groupId}', methods: ['GET'])]
    public function getPermissionsByGroup(int $groupId, Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent) {
            throw new AppException('E1004');
        }
        $this->authorizationService->checkPermission($userCurrent, "view_permissions");

        try {
            $group = $this->groupService->getGroupById($groupId);
            $groupPermissions = $this->service->getPermissionsByGroup($group);
            return $this->json($groupPermissions);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }

    #[Route('', methods: ['PUT'])]
    public function updatePermission(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent) {
            throw new AppException('E1004');
        }
        $this->authorizationService->checkPermission($userCurrent, "edit_permission");
        $data = json_decode($request->getContent(), true);
        // $validatedData = $this->groupPermissionValidator->validateAssignOrUpdatePermission($data);
        $updatedPermissions = $this->service->updatePermission($data);
        return $this->json($updatedPermissions);
    }

    #[Route('/check', methods: ['POST'])]
    public function hasPermission(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent) {
            throw new AppException('E1004');
        }
        $this->authorizationService->checkPermission($userCurrent, "view_permissions");

        try {
            $data = json_decode($request->getContent(), true);
            $groupId = $data['group_id'] ?? null;
            $permissionName = $data['permission_name'] ?? null;
            $targetId = $data['target_id'] ?? null;

            if (!$groupId || !$permissionName) {
                return $this->json(['message' => 'Invalid input.'], 400);
            }

            $hasPermission = $this->service->hasPermission($groupId, $permissionName, $targetId);
            return $this->json(['has_permission' => $hasPermission]);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return $this->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }

    #[Route('', methods: ['DELETE'])]
    public function deletePermission(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent) {
            throw new AppException('E1004');
        }
        $this->authorizationService->checkPermission($userCurrent, "delete_permission");

        try {
            $data = json_decode($request->getContent(), true);
            $data = json_decode($request->getContent(), true);
            // $validatedData = $this->groupPermissionValidator->validateDeletePermission($data);
            $this->service->deletePermissions($data);
            return $this->json(['message' => 'Permissions deleted successfully.']);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }
}

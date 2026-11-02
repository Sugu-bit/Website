<?php

namespace App\Controller\Api;

use App\Service\UserPermissionService;
use App\Service\UserService;
use App\Service\AuthorizationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;
use App\Validator\UserPermissionValidator;

#[Route('/api/user-permissions')]
class UserPermissionController extends AbstractController
{
    private UserPermissionService $service;
    private UserService $userService;
    private AuthorizationService $authorizationService;
    // private UserPermissionValidator $userPermissionValidator;

    public function __construct(UserPermissionService $service, UserService $userService, AuthorizationService $authorizationService)
    {
        $this->service = $service;
        $this->userService = $userService;
        $this->authorizationService = $authorizationService;
        // $this->userPermissionValidator = $userPermissionValidator;
    }

    #[Route('', methods: ['POST'])]
    public function assignPermission(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "create_permission");
        if (!$a) {
            throw new AppException('E2021');
        }
        try {
            $data = json_decode($request->getContent(), true);
            // $validatedData = $this->userPermissionValidator->validateAssignOrUpdatePermission($data);
            $userPermission = $this->service->assignPermissions($data);
            return $this->json($userPermission, 201);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return $this->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }

    #[Route('/{userId}', methods: ['GET'])]
    public function getPermissionsByUser(int $userId, Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "view_permissions");
        if (!$a) {
            throw new AppException('E2021');
        }
        try {
            $user = $this->userService->getUserById($userId);
            $userPermissions = $this->service->getPermissionsByUser($user);
            return $this->json($userPermissions);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }

    #[Route( '', methods: ['PUT'])]
    public function updatePermission(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent) {
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "edit_permission");
        if (!$a) {
            throw new AppException('E2021');
        }
        try {
            $data = json_decode($request->getContent(), true);
            // $validatedData = $this->userPermissionValidator->validateAssignOrUpdatePermission($data);
            $updatedPermissions = $this->service->updatePermission($data);
            return $this->json($updatedPermissions);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return $this->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }

    #[Route('/check', methods: ['POST'])]
    public function hasPermission(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "view_permissions");
        if (!$a) {
            throw new AppException('E2021');
        }
        try {
            $data = json_decode($request->getContent(), true);
            $userId = $data['user_id'] ?? null;
            $permissionName = $data['permission_name'] ?? null;
            $targetId = $data['target_id'] ?? null;

            if (!$userId || !$permissionName) {
                return $this->json(['message' => 'Invalid input.'], 400);
            }

            $hasPermission = $this->service->hasPermission($userId, $permissionName, $targetId);
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
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "delete_permission");
        if (!$a) {
            throw new AppException('E2021');
        }
        try {
            $data = json_decode($request->getContent(), true);
            // $validatedData = $this->userPermissionValidator->validateDeletePermission($data);
            $this->service->deletePermissions($data);
            return $this->json(['message' => 'Permissions deleted successfully.']);
        } catch (AppException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }
}

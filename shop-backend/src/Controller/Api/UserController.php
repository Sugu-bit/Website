<?php

namespace App\Controller\Api;

use App\Service\UserService;
use App\Service\AuthorizationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;
use App\Dto\UserDto;
use App\Validators\UserValidator;

#[Route('/api/users', name: 'api_users_')]
class UserController extends AbstractController
{
    private UserService $userService;
    private AuthorizationService $authorizationService;
    private UserValidator $userValidator;

    public function __construct(UserService $userService, AuthorizationService $authorizationService, UserValidator $userValidator)
    {
        $this->userService = $userService;
        $this->authorizationService = $authorizationService;
        $this->userValidator = $userValidator;
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent) {
            throw new AppException('E2025');
        }

        $hasPermission = $this->authorizationService->checkPermission($userCurrent, "view_users");
        if (!$hasPermission) {
            throw new AppException('E2020');
        }

        // Lấy tham số phân trang
        $page = (int) $request->query->get('page', 1);
        $limit = (int) $request->query->get('limit', 10);

        if ($page < 1 || $limit < 1) {
            throw new AppException('Invalid pagination parameters');
        }

        $users = $this->userService->getActiveUsersWithPagination($page, $limit);
        $userDtos = array_map(fn($user) => new UserDto($user), $users);

        return $this->json($userDtos);
    }

    #[Route('/me', name: 'me', methods: ['GET'])]
    public function me(Request $request): JsonResponse
    {
        $user = $request->attributes->get('user');
        if ($user){
            return $this->json(new UserDto($user));
        }else{
            throw new AppException('E2002');
        }
    }

    #[Route('/{id}', name: 'get', methods: ['GET'])]
    public function get(int $id, Request $request): JsonResponse
    {   
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "view_user_details", $id);
        if (!$a) {
            throw new AppException('E2020');
        }
        $user = $this->userService->getUserById($id);
        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }
        return $this->json(new UserDto($user));
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $cleanedData = $this->userValidator->validateUserData($data, 'create');
        try {
            $user = $this->userService->createUser($cleanedData);
            return $this->json(new UserDto($user), 201);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 400);
        }
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {   
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "edit_user", $id);
        if (!$a && $userCurrent->getId() != $id) {
            throw new AppException('E2021');
        }
        $data = json_decode($request->getContent(), true);
        $cleanedData = $this->userValidator->validateUserData($data, 'update');
        try {
            $user = $this->userService->updateUser($id, $cleanedData);
            return $this->json(new UserDto($user));
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 400);
        }
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id, Request $request): JsonResponse
    {   
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "delete_user");
        if (!$a) {
            throw new AppException('E2021');
        }
        try {
            $this->userService->deleteUser($id);
            return $this->json(['message' => 'User deleted']);
        } catch (\Exception $e) {
            throw new AppException('E1007');
        }
    }
}

<?php

namespace App\Controller\Api;

use App\Service\PermissionService;
use App\Service\AuthorizationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;


#[Route('/api/permission', name: 'permission_')]
class PermissionsController extends AbstractController
{
    private PermissionService $permissionService;
    private AuthorizationService $authorizationService;

    public function __construct(PermissionService $permissionService, AuthorizationService $authorizationService)
    {
        $this->permissionService = $permissionService;
        $this->authorizationService = $authorizationService;
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "view_permissions");
        if (!$a) {
            throw new AppException('E2020');
        }
        $groups = $this->permissionService->viewAllPermissions();
        return $this->json($groups);
    }
}

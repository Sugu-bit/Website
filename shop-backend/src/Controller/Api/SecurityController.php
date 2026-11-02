<?php

namespace App\Controller\Api;

use App\Service\UserService;
use App\Service\AuthenticationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\AppException;



class SecurityController extends AbstractController
{
    private AuthenticationService $authService;
    private UserService $userService;

    public function __construct(AuthenticationService $authService, UserService $userService)
    {
        $this->userService = $userService;
        $this->authService = $authService;
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $user = $request->attributes->get('user');

        if ($user) {
            throw new AppException('S0000');
        }

        $data = json_decode($request->getContent(), true);

        // Xác thực người dùng
        $user = $this->userService->verifyUserPassword($data['username'], $data['password']);

        // Tạo Refresh Token trước
        $refreshToken = $this->authService->createToken($user, 'refresh');

        // Lấy ID của Refresh Token từ token đã tạo
        $refreshId = $this->authService->extractTokenId($refreshToken);

        if (!$refreshId) {
            throw new \Exception('Unable to extract Refresh Token ID.');
        }

        // Tạo Access Token dựa trên ID của Refresh Token
        $accessToken = $this->authService->createToken($user, 'access', $refreshId);

        // Trả về cả Access Token và Refresh Token
        return new JsonResponse([
            'accessToken' => $accessToken,
            'refreshToken' => $refreshToken,
            ]);
    }


    #[Route('/api/refresh-token', name: 'api_refresh_token', methods: ['POST'])]
    public function refreshToken(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        try {
            $refreshToken = $data['refreshToken'] ?? null;

            if (!$refreshToken) {
                throw new AppException('E1025', 'Refresh token is required.');
            }

            // Cấp lại Access Token từ Refresh Token
            $accessToken = $this->authService->refreshAccessToken($refreshToken);

            return new JsonResponse(['accessToken' => $accessToken]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['GET'])]
    public function logout(Request $request): JsonResponse
    {
        $accessToken = $request->attributes->get('jwt');

        if (!$accessToken) {
            return new JsonResponse(['error' => 'Access token is required.'], 400);
        }

        try {
            // Gọi service để xử lý logout
            $this->authService->logout($accessToken);

            return new JsonResponse(['message' => 'Logout successful'], 200);
        } catch (AppException $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'An unexpected error occurred.'], 500);
        }
    }

    #[Route('/api/change-password', name: 'api_change_password', methods: ['POST'])]
    public function changePassword(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $request->attributes->get('user');

        if (!$user) {
            return new JsonResponse(['error' => 'User not authenticated'], 401);
        }

        $currentPassword = $data['currentPassword'] ?? null;
        $newPassword = $data['newPassword'] ?? null;

        if (!$currentPassword || !$newPassword) {
            return new JsonResponse(['error' => 'Both current and new password are required.'], 400);
        }

        try {
            // Gọi service để xác thực mật khẩu hiện tại và thay đổi mật khẩu mới
            $this->userService->changeUserPassword($user, $currentPassword, $newPassword);
            return new JsonResponse(['message' => 'Password changed successfully.'], 200);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
    }

    #[Route('/api/verify-password', name: 'api_verify_password', methods: ['POST'])]
    public function verifyPassword(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $request->attributes->get('user');

        if (!$user) {
            return new JsonResponse(['error' => 'User not authenticated'], 401);
        }

        $password = $data['password'] ?? null;

        if (!$password) {
            return new JsonResponse(['error' => 'Password is required.'], 400);
        }

        try {
            // Gọi service để xác thực lại mật khẩu
            $isValid = $this->userService->verifyPassword($user, $password);
            
            if ($isValid) {
                return new JsonResponse(['message' => 'Password is correct.'], 200);
            } else {
                return new JsonResponse(['error' => 'Incorrect password.'], 400);
            }
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
    }

    #[Route('/api/refresh-refresh-token', name: 'api_refresh_refresh_token', methods: ['POST'])]
    public function refreshRefreshToken(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $refreshToken = $data['refreshToken'] ?? null;

        if (!$refreshToken) {
            return new JsonResponse(['error' => 'Refresh token is required.'], 400);
        }

        try {
            // Gọi service để cấp lại refresh-token mới
            $newRefreshToken = $this->authService->refreshRefreshToken($refreshToken);

            return new JsonResponse(['refreshToken' => $newRefreshToken], 200);
        } catch (AppException $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'An unexpected error occurred.'], 500);
        }
    }

}

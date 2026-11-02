<?php

namespace App\EventListener;

use App\Service\AuthenticationService;
use App\Service\UserService;
use App\Service\BlacklistTokenService;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use App\Exception\AppException;


class JwtAuthenticatorListener
{
    private AuthenticationService $authService;
    private UserService $userService;
    private BlacklistTokenService $blacklistTokenService;

    public function __construct(
        AuthenticationService $authService,
        UserService $userService,
        BlacklistTokenService $blacklistTokenService
    ) {
        $this->authService = $authService;
        $this->userService = $userService;
        $this->blacklistTokenService = $blacklistTokenService;
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();

        // Kiểm tra xem route có yêu cầu xác thực hay không
        if (!$request->headers->has('Authorization')) {
            return; // Bỏ qua nếu không có header Authorization
        }

        $authHeader = $request->headers->get('Authorization');
        if (!str_starts_with($authHeader, 'Bearer ')) {
            throw new UnauthorizedHttpException('Bearer', 'Tiêu đề ủy quyền phải bắt đầu bằng Bearer');
        }

        $jwt = substr($authHeader, 7); // Loại bỏ prefix `Bearer `
        try {
            // Xác thực token
            $parsedToken = $this->authService->validateToken($jwt);
            // Lấy token ID (hoặc chính JWT) và kiểm tra danh sách đen
            $tokenId = $parsedToken->claims()->get('jti'); // Assuming `jti` is used as unique identifier for token
            if ($this->blacklistTokenService->isTokenBlacklisted($tokenId)) {
                throw new AppException('E2050'); // Token không hợp lệ
            }

            // Lấy user ID từ claim `uid`
            $userId = $parsedToken->claims()->get('uid');
            $tokenType = $parsedToken->claims()->get('type');

            if ($tokenType !== 'access') {
                throw new AppException('E2050'); // access không hợp lệ
            }

            // Lấy người dùng từ DB
            $user = $this->userService->getUserById($userId);

            if (!$user || !$user->isActive()) {
                throw new AppException('E1004');
            }

            // Lưu user vào request để các controller sau có thể sử dụng
            $request->attributes->set('user', $user);
            $request->attributes->set('jwt', $jwt);
        } catch (\Exception) {
            throw new AppException('E1023');
        }
    }
}

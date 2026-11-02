<?php

namespace App\Service;

use App\Entity\User;
use App\Service\BlacklistTokenService;
use App\Service\RefreshTokenService;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Token\Plain;
use InvalidArgumentException;
use DateTimeImmutable;
use App\Exception\AppException;



class AuthenticationService
{
    private Configuration $config;
    private string $issuer;
    private string $audience;
    private UserService $userService;
    private BlacklistTokenService $blacklistTokenService;
    private RefreshTokenService $refreshTokenService;

    public function __construct(
        string $secretKey,
        UserService $userService,
        BlacklistTokenService $blacklistTokenService,
        RefreshTokenService $refreshTokenService
    ) {
        // Lấy giá trị từ file .env
        $this->issuer = $_ENV['JWT_ISSUER'] ?? 'https://scime.click';
        $this->audience = $_ENV['JWT_AUDIENCE'] ?? 'https://shop.scime.click';

        $this->userService = $userService;
        $this->blacklistTokenService = $blacklistTokenService;
        $this->refreshTokenService = $refreshTokenService;

        $this->config = Configuration::forSymmetricSigner(
            new \Lcobucci\JWT\Signer\Hmac\Sha256(),
            \Lcobucci\JWT\Signer\Key\InMemory::plainText($secretKey)
        );

        // Thêm các ràng buộc xác thực vào config
        $this->config->setValidationConstraints(
            new \Lcobucci\JWT\Validation\Constraint\IssuedBy($this->issuer),
            new \Lcobucci\JWT\Validation\Constraint\PermittedFor($this->audience),
            new \Lcobucci\JWT\Validation\Constraint\SignedWith(
                $this->config->signer(),
                $this->config->signingKey()
            )
        );
    }

    /**
     * Tạo token JWT.
     *
     * @param User $user Thông tin người dùng
     * @param string $tokenType Loại token (`access` hoặc `refresh`)
     * @param string|null $refreshTokenId ID của Refresh Token (bắt buộc nếu $tokenType là `access`)
     * @return string
     */
    public function createToken(User $user, string $tokenType, ?string $refreshTokenId = null, int $reuseCount = 0): string
    {
        $now = new DateTimeImmutable();
        $ttl = match ($tokenType) {
            'access' => 3600,       // 1 giờ cho access token
            'refresh' => 5184000,   // 2 tháng cho refresh token
            default => throw new InvalidArgumentException('Invalid token type. Allowed values are "access" and "refresh".')
        };

        if ($tokenType === 'access' && !$refreshTokenId) {
            throw new InvalidArgumentException('Refresh Token ID is required for access tokens.');
        }

        $builder = $this->config->builder()
            ->issuedBy($this->issuer)
            ->permittedFor($this->audience)
            ->identifiedBy(bin2hex(random_bytes(32)), true)
            ->issuedAt($now)
            ->expiresAt($now->modify("+$ttl seconds"))
            ->withClaim('uid', $user->getId())
            ->withClaim('username', $user->getUsername())
            ->withClaim('email', $user->getEmail())
            ->withClaim('isActive', $user->isActive())
            ->withClaim('type', $tokenType);

        if ($tokenType === 'access') {
            $builder = $builder->withClaim('refreshId', $refreshTokenId);
        }

        if ($tokenType === 'refresh') {
            $builder = $builder->withClaim('reuseCount', $reuseCount); // Thêm reuseCount
        }

        $token = $builder->getToken($this->config->signer(), $this->config->signingKey());

        if ($tokenType === 'refresh') {
            $jti = $token->claims()->get('jti');
            $expTimestamp = $token->claims()->get('exp')->getTimestamp();
            $expiresAt = (new \DateTime())->setTimestamp($expTimestamp);

            $this->refreshTokenService->createToken($jti, $expiresAt);
        }

        return $token->toString();
    }



    /**
     * Xác thực JWT token.
     */
    public function validateToken(string $token): Plain
    {
        $token = $this->config->parser()->parse($token);

        if (!$token instanceof Plain) {
            throw new AppException('E1020');
        }

        // Lấy các ràng buộc từ cấu hình
        $constraints = $this->config->validationConstraints();

        // Xác minh token với các ràng buộc
        $this->config->validator()->assert($token, ...$constraints);

        // Kiểm tra thời gian
        $now = new DateTimeImmutable();
        if ($token->isExpired($now)) {
            throw new AppException('E1021');
        }

        return $token;
    }

    /**
     * Cấp lại Access Token từ Refresh Token.
     *
     * @param string $refreshTokenString
     * @return string
     * @throws AppException
     */
    public function refreshAccessToken(string $refreshTokenString): string
    {
        // Phân tích và xác thực Refresh Token
        $refreshToken = $this->validateToken($refreshTokenString);

        // Lấy thông tin từ claims của Refresh Token
        $jti = $refreshToken->claims()->get('jti');
        $tokenType = $refreshToken->claims()->get('type');
        $userId = $refreshToken->claims()->get('uid');

        if ($tokenType !== 'refresh') {
            throw new AppException('E2050');
        }

        // Kiểm tra Refresh Token trong cơ sở dữ liệu thông qua RefreshTokenService
        $storedToken = $this->refreshTokenService->getTokenById($jti);

        if (!$storedToken) {
            throw new AppException('E2050'); // Refresh token không hợp lệ (k tồn tại trong db)
        }

        if ($storedToken->getExpiresAt() < new DateTimeImmutable()) {
            throw new AppException('E2051'); // Refresh token đã hết hạn
        }

        $user = $this->userService->getUserById($userId);

        // Tạo Access Token mới
        return $this->createToken($user, 'access', $jti);
    }



    /**
     * Đăng xuất người dùng bằng cách vô hiệu hóa Access Token và Refresh Token.
     *
     * @param string $accessTokenString Chuỗi Access Token
     * @throws AppException
     */
    public function logout(string $accessTokenString): void
    {
        // Xác thực và phân tích Access Token
        $accessToken = $this->validateToken($accessTokenString);

        // Lấy thông tin từ Access Token
        $jti = $accessToken->claims()->get('jti');             // ID của Access Token
        $expiresAt = $accessToken->claims()->get('exp')->getTimestamp(); // Thời gian hết hạn của Access Token
        $refreshId = $accessToken->claims()->get('refreshId'); // ID của Refresh Token

        if (!$refreshId) {
            throw new AppException('E2050', 'Refresh Token ID is missing in the Access Token.');
        }

        // Thêm Access Token vào Blacklist
        $this->blacklistTokenService->addToken($jti, (new \DateTime())->setTimestamp($expiresAt));

        // Xóa Refresh Token khỏi cơ sở dữ liệu
        $this->refreshTokenService->deleteToken($refreshId);
    }

    public function extractTokenId(string $tokenString): ?string
    {
        try {
            $token = $this->validateToken($tokenString);
            return $token->claims()->get('jti');
        } catch (\Exception $e) {
            return null; // Trả về null nếu không trích xuất được
        }
    }

    public function refreshRefreshToken(string $refreshTokenString): string
    {
        // Xác thực Refresh Token
        $refreshToken = $this->validateToken($refreshTokenString);

        // Lấy thông tin từ claims
        $jti = $refreshToken->claims()->get('jti');
        $tokenType = $refreshToken->claims()->get('type');
        $reuseCount = $refreshToken->claims()->get('reuseCount');
        $userId = $refreshToken->claims()->get('uid');

        if ($tokenType !== 'refresh') {
            throw new AppException('E2050', 'Invalid token type for refresh.');
        }

        // Kiểm tra tính hợp lệ trong cơ sở dữ liệu
        $storedToken = $this->refreshTokenService->getTokenById($jti);

        if (!$storedToken || $reuseCount>12) {
            throw new AppException('E2050', 'Invalid Refresh Token.');
        }

        if ($storedToken->getExpiresAt() < new DateTimeImmutable()) {
            throw new AppException('E2051', 'Refresh Token has expired.');
        }

        $user = $this->userService->getUserById($userId);

        // Tạo Refresh Token mới với reuseCount + 1
        return $this->createToken($user, 'refresh', null, $reuseCount + 1);
    }

}
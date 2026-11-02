<?php

namespace App\Service;

use App\Entity\BlacklistToken;
use App\Repository\BlacklistTokenRepository;
use Doctrine\ORM\EntityManagerInterface;

class BlacklistTokenService
{
    private BlacklistTokenRepository $blacklistTokenRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(BlacklistTokenRepository $blacklistTokenRepository, EntityManagerInterface $entityManager)
    {
        $this->blacklistTokenRepository = $blacklistTokenRepository;
        $this->entityManager = $entityManager;
    }

    public function addToken(string $id, \DateTime $expiresAt): BlacklistToken
    {
        $token = new BlacklistToken();
        $token->setId($id)
              ->setExpiresAt($expiresAt);

        $this->entityManager->persist($token);
        $this->entityManager->flush();

        return $token;
    }

    public function isTokenBlacklisted(string $id): bool
    {
        $token = $this->blacklistTokenRepository->find($id);
        return $token !== null && $token->getExpiresAt() > new \DateTime();
    }

    public function deleteExpiredTokens(): void
    {
        $this->blacklistTokenRepository->deleteExpiredTokens();
    }

    // Bổ sung thêm hàm kiểm tra và xóa token nếu cần
    public function deleteToken(string $id): void
    {
        $token = $this->blacklistTokenRepository->find($id);
        if ($token) {
            $this->entityManager->remove($token);
            $this->entityManager->flush();
        }
    }
}

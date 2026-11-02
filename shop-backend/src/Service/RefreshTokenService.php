<?php

namespace App\Service;

use App\Entity\RefreshToken;
use App\Repository\RefreshTokenRepository;
use Doctrine\ORM\EntityManagerInterface;

class RefreshTokenService
{
    private RefreshTokenRepository $refreshTokenRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(RefreshTokenRepository $refreshTokenRepository, EntityManagerInterface $entityManager)
    {
        $this->refreshTokenRepository = $refreshTokenRepository;
        $this->entityManager = $entityManager;
    }

    public function createToken(string $id, \DateTime $expiresAt): RefreshToken
    {
        $token = new RefreshToken();
        $token->setId($id)
              ->setExpiresAt($expiresAt);

        $this->entityManager->persist($token);
        $this->entityManager->flush();

        return $token;
    }

    public function getToken(string $id): ?RefreshToken
    {
        return $this->refreshTokenRepository->find($id);
    }

    public function deleteToken(string $id): void
    {
        $token = $this->getToken($id);
        if ($token) {
            $this->entityManager->remove($token);
            $this->entityManager->flush();
        }
    }

    public function deleteExpiredTokens(): void
    {
        $this->refreshTokenRepository->deleteExpiredTokens();
    }


    
    public function getTokenById(string $jti): ?RefreshToken
    {
        $token = $this->refreshTokenRepository->findOneBy(['id' => $jti]);

        if (!$token) {
            return null;
        }

        return $token;
    }

}

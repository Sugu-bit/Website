<?php

namespace App\Controller\Api;

use App\Service\NotificationService;
use App\Service\AuthorizationService;
use App\Dto\NotificationDto;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;



#[Route('/api/notifications', name: 'notifications_')]
class NotificationController extends AbstractController
{
    private NotificationService $service;
    private AuthorizationService $authorizationService;

    public function __construct(NotificationService $service, AuthorizationService $authorizationService)
    {
        $this->service = $service;
        $this->authorizationService = $authorizationService;
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        try {
            $notifications = $this->service->getAllNotifications();
            $notificationDtos = array_map(
                fn($notification) => new NotificationDto($notification),
                $notifications
            );

            return $this->json($notificationDtos);
        } catch (\Throwable $e) {
            return $this->json(['message' => 'Unable to fetch notifications', 'error' => $e->getMessage()], 500);
        }
    }

    #[Route('/{id}', name: 'detail', methods: ['GET'])]
    public function detail(int $id): JsonResponse
    {
        try {
            $notification = $this->service->getNotificationById($id);
            if (!$notification) {
                return $this->json(['message' => 'Notification not found'], 404);
            }

            return $this->json(new NotificationDto($notification));
        } catch (\Throwable $e) {
            return $this->json(['message' => 'Unable to fetch notification', 'error' => $e->getMessage()], 500);
        }
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);

            if (empty($data['title'])) {
                return $this->json(['message' => 'Title is required'], 400);
            }

            $notification = $this->service->createNotification($data);

            return $this->json(new NotificationDto($notification), 201);
        } catch (\JsonException $e) {
            return $this->json(['message' => 'Invalid JSON payload', 'error' => $e->getMessage()], 400);
        } catch (\Throwable $e) {
            return $this->json(['message' => 'Unable to create notification', 'error' => $e->getMessage()], 500);
        }
    }

    #[Route('/{id}/read', name: 'mark_as_read', methods: ['PATCH'])]
    public function markAsRead(int $id): JsonResponse
    {
        try {
            $notification = $this->service->markAsRead($id);

            return $this->json(new NotificationDto($notification));
        } catch (\Throwable $e) {
            return $this->json(['message' => 'Unable to mark notification as read', 'error' => $e->getMessage()], 500);
        }
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $this->service->deleteNotification($id);

            return $this->json(['message' => 'Notification deleted']);
        } catch (\Throwable $e) {
            return $this->json(['message' => 'Unable to delete notification', 'error' => $e->getMessage()], 500);
        }
    }
}

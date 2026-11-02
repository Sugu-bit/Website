<?php

namespace App\Dto;

use App\Entity\Notification;

class NotificationDto
{
    public int $id;
    public int $userId;
    public string $title;
    public ?string $message;
    public string $type;
    public bool $isRead;
    public string $createdAt;
    public ?string $readAt;

    public function __construct(Notification $notification)
    {
        $this->id = $notification->getId();
        $this->userId = $notification->getUser()->getId();
        $this->title = $notification->getTitle();
        $this->message = $notification->getMessage();
        $this->type = $notification->getType();
        $this->isRead = $notification->getIsRead();
        $this->createdAt = $notification->getCreatedAt()->format('Y-m-d H:i:s');
        $this->readAt = $notification->getReadAt()?->format('Y-m-d H:i:s');
    }
}

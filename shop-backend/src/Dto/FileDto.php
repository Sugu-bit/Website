<?php

namespace App\Dto;

use App\Entity\File;

class FileDto
{
    public int $id;
    public int $userId;
    public string $fileName;
    public string $filePath;
    public int $fileSize;
    public ?int $sort;
    public string $uploadedAt;
    public bool $isActive;
    public ?string $target;
    public ?int $targetId;
    public ?string $description;

    public function __construct(File $file)
    {
        $this->id = $file->getId();
        $this->userId = $file->getUser()?->getId();
        $this->fileName = $file->getFileName();
        $this->filePath = $file->getFilePath();
        $this->fileSize = $file->getFileSize();
        $this->sort = $file->getSort();
        $this->uploadedAt = $file->getUploadedAt()->format('Y-m-d H:i:s');
        $this->targetId = $file->getTargetId();
        $this->isActive = $file->getIsActive();
        $this->description = $file->getDescription();
        if ($file->getListTable()) {
            $this->target = $file->getListTable()->getTableName();
        } else {
            $this->target = null;
        }
    }
}

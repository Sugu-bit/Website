<?php

namespace App\Exception;

use Throwable;

class AppException extends \RuntimeException
{
    private string $errorKey;

    public function __construct(string $errorKey, ?string $customMessage = null, ?Throwable $previous = null)
    {
        $this->errorKey = $errorKey;

        $message = $customMessage ?: ErrorCodeProvider::getMessage($errorKey);
        $httpStatus = ErrorCodeProvider::getHttpStatus($errorKey);

        parent::__construct($message, $httpStatus, $previous);
    }

    public function getErrorKey(): string
    {
        return $this->errorKey;
    }

    public function getErrorCode(): int
    {
        return ErrorCodeProvider::getCode($this->errorKey);
    }

    public function getHttpStatus(): int
    {
        return ErrorCodeProvider::getHttpStatus($this->errorKey);
    }
}



// use App\Exception\AppException;

// throw new AppException('E10003');
// throw new AppException('E10101', 'Bạn không có quyền xoá sản phẩm này');

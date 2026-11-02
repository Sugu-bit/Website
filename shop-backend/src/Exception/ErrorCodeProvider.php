<?php

namespace App\Exception;

use InvalidArgumentException;

class ErrorCodeProvider
{
    public static function getCode(string $errorKey): int
    {
        return self::getErrorValue($errorKey, 'code');
    }

    public static function getMessage(string $errorKey): string
    {
        return self::getErrorValue($errorKey, 'message');
    }

    public static function getHttpStatus(string $errorKey): int
    {
        return self::getErrorValue($errorKey, 'httpStatus');
    }

    private static function getErrorValue(string $errorKey, string $field)
    {
        if (!defined("App\\Exception\\ErrorCode::$errorKey")) {
            throw new InvalidArgumentException("Mã lỗi '$errorKey' không tồn tại trong ErrorCode.");
        }

        $errorData = constant("App\\Exception\\ErrorCode::$errorKey");

        if (!array_key_exists($field, $errorData)) {
            throw new InvalidArgumentException("Trường '$field' không tồn tại trong mã lỗi '$errorKey'.");
        }

        return $errorData[$field];
    }
}

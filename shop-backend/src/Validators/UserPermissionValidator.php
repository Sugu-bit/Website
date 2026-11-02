<?php

namespace App\Validators;

use App\Exception\AppException;

class UserPermissionValidator
{
    public function validateAssignOrUpdatePermission(array $data): array
    {
        if (!isset($data['user_id']) || !is_int($data['user_id'])) {
            throw new AppException('E10711', 'Invalid or missing user_id.');
        }

        if (!isset($data['permissions']) || !is_array($data['permissions'])) {
            throw new AppException('E10711', 'Invalid or missing permissions.');
        }

        foreach ($data['permissions'] as $permission => $attributes) {
            if (!is_array($attributes)) {
                throw new AppException('E10711', "Invalid attributes for permission: $permission.");
            }

            if (!isset($attributes['is_active']) || !is_bool($attributes['is_active'])) {
                throw new AppException('E10711', "Invalid or missing is_active for permission: $permission.");
            }

            if (!isset($attributes['is_denied']) || !is_bool($attributes['is_denied'])) {
                throw new AppException('E10711', "Invalid or missing is_denied for permission: $permission.");
            }

            if (!isset($attributes['target']) || !(is_int($attributes['target']) || $attributes['target'] === 'all')) {
                throw new AppException('E10711', "Invalid or missing target for permission: $permission.");
            }
        }

        return $data;
    }

    public function validateDeletePermission(array $data): array
    {
        if (!isset($data['user_id']) || !is_int($data['user_id'])) {
            throw new AppException('E10711', 'Invalid or missing user_id.');
        }

        if (!isset($data['permissions']) || !is_array($data['permissions'])) {
            throw new AppException('E10711', 'Invalid or missing permissions array.');
        }

        foreach ($data['permissions'] as $permission) {
            if (!is_string($permission)) {
                throw new AppException('E10711', 'Invalid permission name.');
            }
        }

        return $data;
    }
}

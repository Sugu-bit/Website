<?php

namespace App\Validators;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use App\Exception\AppException;

class UserValidator
{
    private ValidatorInterface $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function validateUserData(array $data, string $action): array
    {
        $constraints = $this->getConstraints($action);

        $violations = $this->validator->validate($data, $constraints);

        if (count($violations) > 0) {
            $errors = $this->formatErrors($violations);
            $errorMessage = json_encode($errors);
            throw new AppException('E10711', $errorMessage);
        }

        // Trả về dữ liệu đã được làm sạch (loại bỏ các trường không hợp lệ hoặc rỗng)
        return array_filter($data, function ($value, $key) use ($constraints) {
            return array_key_exists($key, $constraints->fields) && $value !== '';
        }, ARRAY_FILTER_USE_BOTH);
    }

    private function getConstraints(string $action): Assert\Collection
    {
        if ($action === 'create') {
            return new Assert\Collection([
                'username' => [
                    new Assert\NotBlank(),
                    new Assert\Length(['min' => 3, 'max' => 50]),
                ],
                'email' => new Assert\Optional([
                    new Assert\Email(),
                ]),
                'password' => [
                    new Assert\NotBlank(),
                    new Assert\Length(['min' => 6]),
                ],
                'phone' => new Assert\Optional([
                    new Assert\Regex('/^\d{10,15}$/'),
                ]),
                'address' => new Assert\Optional([
                    new Assert\Length(['max' => 255]),
                ]),
            ]);
        }

        if ($action === 'update') {
            return new Assert\Collection([
                'username' => new Assert\Optional([
                    new Assert\NotBlank(),
                    new Assert\Length(['min' => 3, 'max' => 50]),
                ]),
                'email' => new Assert\Optional([
                    new Assert\Email(),
                ]),
                'password' => new Assert\Optional([
                    new Assert\NotBlank(),
                    new Assert\Length(['min' => 6]),
                ]),
                'phone' => new Assert\Optional([
                    new Assert\Regex('/^\d{10,15}$/'),
                ]),
                'address' => new Assert\Optional([
                    new Assert\Length(['max' => 255]),
                ]),
            ]);
        }

        throw new \InvalidArgumentException('Invalid action for validation.');
    }

    private function formatErrors(ConstraintViolationListInterface $violations): array
    {
        $errors = [];
        foreach ($violations as $violation) {
            $errors[$violation->getPropertyPath()] = $violation->getMessage();
        }
        return $errors;
    }
}

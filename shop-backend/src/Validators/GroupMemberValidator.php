<?php

namespace App\Validators;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use App\Exception\AppException;

class GroupMemberValidator
{
    private ValidatorInterface $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function validateGroupMemberData(array $data): array
    {
        $constraints = new Assert\Collection([
            'groupId' => [
                new Assert\NotBlank(),
                new Assert\Positive(),
            ],
            'userId' => [
                new Assert\NotBlank(),
                new Assert\Positive(),
            ],
        ]);

        $violations = $this->validator->validate($data, $constraints);

        if (count($violations) > 0) {
            $errors = $this->formatErrors($violations);
            $errorMessage = json_encode($errors);
            throw new AppException('E10711', $errorMessage);
        }

        return array_filter($data, fn($value) => $value !== null && $value !== '');
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

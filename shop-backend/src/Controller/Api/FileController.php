<?php

namespace App\Controller\Api;

use App\Entity\File;
use App\Service\FileService;
use App\Service\AuthorizationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Dto\FileDto;
use App\Exception\AppException;


#[Route('/api/files', name: 'api_files_')]
class FileController extends AbstractController
{
    private FileService $fileService;
    private AuthorizationService $authorizationService;

    public function __construct(FileService $fileService, AuthorizationService $authorizationService)
    {
        $this->fileService = $fileService;
        $this->authorizationService = $authorizationService;
    }

    /**
     * Lấy tất cả file (không phân trang).
     */
    #[Route('/all', name: 'get_all_files', methods: ['GET'])]
    public function getAllFiles(): JsonResponse
    {
        $files = $this->fileService->getAllFiles();
        $fileDtos = array_map(fn ($file) => new FileDto($file), $files);

        return $this->json($fileDtos, 200);
    }

    /**
     * Lấy tất cả file (có thể phân trang).
     */
    #[Route('', name: 'get_all', methods: ['GET'])]
    public function getFilesPaginated(Request $request): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);
        $files = $this->fileService->getFilesPaginated($page, $limit);

        // Chuyển Paginator thành mảng trước khi áp dụng array_map
        $fileDtos = array_map(fn ($file) => new FileDto($file), iterator_to_array($files));

        return $this->json($fileDtos, 200);
    }


    /**
     * Lấy thông tin file theo ID.
     */
    #[Route('/{id}', name: 'get_by_id', methods: ['GET'])]
    public function getFileById(int $id): JsonResponse
    {
        $file = $this->fileService->getFileById($id);

        if (!$file) {
            return $this->json(['error' => 'File not found'], 404);
        }

        return $this->json(new FileDto($file), 200);
    }

    /**
     * Lấy danh sách file theo User ID.
     */
    #[Route('/user/{userId}', name: 'by_user', methods: ['GET'])]
    public function getFilesByUser(int $userId): JsonResponse
    {
        $files = $this->fileService->getFilesByUser($userId);
        $fileDtos = array_map(fn ($file) => new FileDto($file), $files);

        return $this->json($fileDtos, 200);
    }

    /**
     * Lấy danh sách file theo Product ID.
     */
    #[Route('/product/{productId}', name: 'by_product', methods: ['GET'])]
    public function getFilesByProduct(int $productId, Request $request): JsonResponse
    {
        $onlyActive = $request->query->getBoolean('onlyActive', true);

        try {
            $files = $this->fileService->getFilesByProduct($productId, $onlyActive);
            $fileDtos = array_map(fn ($file) => new FileDto($file), $files);

            return $this->json($fileDtos, 200);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Lấy danh sách file theo Review ID.
     */
    #[Route('/review/{reviewId}', name: 'by_review', methods: ['GET'])]
    public function getFilesByReview(int $reviewId, Request $request): JsonResponse
    {
        $onlyActive = $request->query->getBoolean('onlyActive', true);

        try {
            $files = $this->fileService->getFilesByReview($reviewId, $onlyActive);
            $fileDtos = array_map(fn ($file) => new FileDto($file), $files);

            return $this->json($fileDtos, 200);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Lấy danh sách file không hoạt động.
     */
    #[Route('/inactive', name: 'inactive_files', methods: ['GET'])]
    public function getInactiveFiles(): JsonResponse
    {
        $files = $this->fileService->getInactiveFiles();
        $fileDtos = array_map(fn ($file) => new FileDto($file), $files);

        return $this->json($fileDtos, 200);
    }

    #[Route('', name: 'upload', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {   
        $user = $request->attributes->get('user');
        if (!$user){
            throw new AppException('E2025');
        }

        $uploadedFile = $request->files->get('file'); // Lấy file từ request

        if (!$uploadedFile) {
            return $this->json(['error' => 'No file provided'], 400);
        }

        $data = $request->request->all(); // Lấy các thông tin khác từ request

        try {
            // Gọi hàm uploadFile
            $file = $this->fileService->uploadFile($uploadedFile, $user, $data);

            return $this->json(['message' => 'File uploaded successfully!', 'file' => $file->getFilePath()], 201);
        } catch (AppException $e) {
            throw new AppException('E5010');
        } 
    }

    /**
     * Cập nhật thông tin file.
     */
    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function updateFile(Request $request, File $file): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $updatedFile = $this->fileService->updateInfoFile($file, $data);

        return $this->json(new FileDto($updatedFile), 200);
    }

    /**
     * Xóa một file.
     */
    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function deleteFile(int $id, Request $request,): JsonResponse
    {
        $userCurrent = $request->attributes->get('user');
        if (!$userCurrent){
            throw new AppException('E2025');
        }
        $a = $this->authorizationService->checkPermission($userCurrent, "delete_user");
        if (!$a) {
            throw new AppException('E2021');
        }
        $this->fileService->deleteFile($id);

        return $this->json(['message' => 'File deleted successfully!']);
    }
}

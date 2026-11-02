<?php

namespace App\Service;

use App\Entity\File;
use App\Entity\User;
use App\Repository\FileRepository;
use Symfony\Component\Filesystem\Filesystem;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Exception\AppException;



class FileService
{
    private UserService $userService;
    private FileRepository $fileRepository;
    private Filesystem $filesystem;
    private EntityManagerInterface $entityManager;
    private ListTableService $listTableService;
    private string $uploadDir;

    public function __construct(
        UserService $userService,
        FileRepository $fileRepository,
        Filesystem $filesystem,
        EntityManagerInterface $entityManager,
        ListTableService $listTableService,
        string $uploadDir
    ) {
        $this->userService = $userService;
        $this->fileRepository = $fileRepository;
        $this->filesystem = $filesystem;
        $this->entityManager = $entityManager;
        $this->listTableService = $listTableService;
        $this->uploadDir = $uploadDir;
    }

    // Lấy tất cả các file
    public function getAllFiles(): array
    {
        return $this->fileRepository->findAll();
    }

    // Lấy tất cả các file với phân trang
    public function getFilesPaginated(int $page, int $limit): Paginator
    {
        return $this->fileRepository->findAllPaginated($page, $limit);
    }

    // Lấy file theo ID
    public function getFileById(int $id): ?File
    {   
        return $this->fileRepository->findById($id);
    }

    // Lấy danh sách file theo User
    public function getFilesByUser(int $userId): array
    {
        return $this->fileRepository->findByUser($userId);
    }

    public function getFilesByProduct(int $productId, bool $onlyActive = true): array
    {
        $table = $this->listTableService->getByTableName('products');
        return $this->fileRepository->findByTarget($table->getTableName(), $productId, $onlyActive);
    }

    public function getFilesByReview(int $reviewId, bool $onlyActive = true): array
    {
        $table = $this->listTableService->getByTableName('reviews');
        return $this->fileRepository->findByTarget($table->getTableName(), $reviewId, $onlyActive);
    }


    // Lấy file trong khoảng thời gian tải lên
    public function getFilesByUploadedDateRange(\DateTimeInterface $start, \DateTimeInterface $end): array
    {
        return $this->fileRepository->findByUploadedDateRange($start, $end);
    }

    // Lấy danh sách file không hoạt động
    public function getInactiveFiles(): array
    {
        return $this->fileRepository->findInactiveFiles();
    }

    function generateRandomString(int $length = 32): string {
        // Sử dụng random_bytes để tạo chuỗi an toàn
        return substr(bin2hex(random_bytes(ceil($length / 2))), 0, $length);
    }

    // Lưu file tải lên và xử lý đường dẫn
    public function uploadFile(UploadedFile $uploadedFile, User $user, array $data): File
    {   
        // Kiểm tra file có hợp lệ không
        if (!$uploadedFile || !$uploadedFile->isValid()) {
            throw new AppException("E5001");
        }

        // Tạo tên file ngẫu nhiên
        $randomName = $this->generateRandomString();
        $fileExtension = $uploadedFile->guessExtension() ?: $uploadedFile->getClientOriginalExtension();

        // Cấu trúc đường dẫn: ./data/2-kí-tự-đầu/2-kí-tự-tiếp-theo/chuỗi-còn-lại
        $folder1 = substr($randomName, 0, 2);
        $folder2 = substr($randomName, 2, 2);
        $fileName = substr($randomName, 4) . '.' . $fileExtension;

        $filePath = sprintf('%s/%s/%s', $folder1, $folder2, $fileName);
        $fullPath = $this->uploadDir . '/' . $filePath;
        
        try {
            // Tạo thư mục nếu chưa tồn tại
            $this->filesystem->mkdir(dirname($fullPath), 0775);

            // Debug: In ra đầy đủ đường dẫn
            $absoluteFullPath = realpath(dirname($fullPath)) . '/' . $fileName;
            
            // Lưu file vào đường dẫn
            $uploadedFile->move(dirname($fullPath), $fileName);
            
            // Kiểm tra file đã được lưu chưa
            if (!file_exists($absoluteFullPath)) {
                throw new \Exception("File could not be saved");
            }

            // Kiểm tra kích thước file sau khi di chuyển
            $fileSize = filesize($absoluteFullPath);
            if ($fileSize === false) {
                throw new \Exception("Could not retrieve the file size");
            }
            
        } catch (\Exception $e) {
            // Ghi log lỗi chi tiết
            error_log("File upload error: " . $e->getMessage());
            throw new AppException("E5010");
        }
        
        // Tạo entity File và lưu thông tin
        $file = new File();

        $file->setUser($user);

        $file->setFileName($uploadedFile->getClientOriginalName())
            ->setFilePath($filePath)
            ->setFileSize($fileSize)  // Sử dụng kích thước file đã lấy từ file hệ thống
            ->setUploadedAt(new \DateTime())
            ->setIsActive($data['isActive'] ?? true)
            ->setDescription($data['description'] ?? null)
            ->setSort($data['sort'] ?? null);
        
        // Set Product nếu có productId
        if (!empty($data['productId']) && is_numeric($data['productId'])) {
            $productId = (int)$data['productId']; // Ép kiểu về int
            $table = $this->listTableService->getByTableName("products");
            $file->setListTable($table);
            $file->setTargetId($productId);
        }

        // Set Review nếu có reviewId
        if (!empty($data['reviewId']) && is_numeric($data['reviewId'])) {
            $reviewId = (int)$data['reviewId']; // Ép kiểu về int
            $this->listTableService->getByTableName("reviews");
            $table = $file->setListTable($table);
            $file->setTargetId($reviewId);
        }


        // Lưu thông tin file vào database
        $this->entityManager->persist($file);
        $this->entityManager->flush();
        
        return $file;
    }

    public function updateInfoFile(File $file, array $data): File
    {
        // Update File data
        $file->setIsActive($data['isActive'] ?? $file->getIsActive())
            ->setDescription($data['description'] ?? $file->getDescription())
            ->setSort($data['sort'] ?? $file->getSort());

        // Update Product if productId is provided and valid
        if (isset($data['productId']) && is_numeric($data['productId'])) {
            $productId = (int)$data['productId']; // Ép kiểu về int
            $table = $this->listTableService->getByTableName("products");
            $table = $file->setListTable($table);
            $file->setTargetId($productId);
        } elseif (empty($data['productId'])) {
            $file->setTargetId(null); // Xóa liên kết với Product nếu `productId` không hợp lệ hoặc null
        }

        // Update Review if reviewId is provided and valid
        if (isset($data['reviewId']) && is_numeric($data['reviewId'])) {
            $reviewId = (int)$data['reviewId']; // Ép kiểu về int
            $table = $this->listTableService->getByTableName("reviews");
            $table = $file->setListTable($table);
            $file->setTargetId($reviewId);
        } elseif (empty($data['reviewId'])) {
            $file->setTargetId(null); // Xóa liên kết với Review nếu `reviewId` không hợp lệ hoặc null
        }

        $this->entityManager->flush();
        return $file;
    }


    // Xóa file
    public function deleteFile(int $id): void
    {
        $file = $this->getFileById($id);
        if ($this->filesystem->exists($file->getFilePath())) {
            $this->filesystem->remove($file->getFilePath());
        }

        $this->entityManager->remove($file);
        $this->entityManager->flush();
    }
}

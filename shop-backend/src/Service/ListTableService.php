<?php
// src/Service/ListTableService.php

namespace App\Service;

use App\Entity\ListTable;
use App\Repository\ListTableRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exception\AppException;


class ListTableService
{
    private EntityManagerInterface $entityManager;
    private ListTableRepository $repository;

    public function __construct(EntityManagerInterface $entityManager, ListTableRepository $repository)
    {   
        $this->entityManager = $entityManager;
        $this->repository = $repository;
    }

    public function createOrUpdate(string $tableName, ?string $description): ListTable
    {
        $listTable = $this->repository->findByTableName($tableName) ?? new ListTable();
        $listTable->setTableName($tableName);
        $listTable->setDescription($description);

        $this->repository->save($listTable);

        return $listTable;
    }

    public function getByTableName(string $tableName): ListTable
    {
        return $this->repository->findById($tableName);
    }

    public function delete(string $tableName): void
    {
        $listTable = $this->repository->findByTableName($tableName);

        if ($listTable) {
            $this->repository->delete($listTable);
        }
    }

    public function getAll(): array
    {
        return $this->repository->findAll();
    }


    /**
     * Đồng bộ dữ liệu cho bảng ListTable
     */
    public function syncListTable(): void
    {
        // Danh sách bảng tĩnh định nghĩa
        $tables = [
            'users' => 'Chứa thông tin của người dùng, bao gồm tài khoản, mật khẩu, và các thông tin liên hệ. Đây là bảng trung tâm, liên kết với nhiều bảng khác như quyền, nhóm, sản phẩm, và đơn hàng.',
        
            'permissions' => 'Lưu giữ các quyền hạn của người dùng. Các quyền được sử dụng để phân quyền chi tiết, ví dụ như "Xem danh sách người dùng" hay "Tạo sản phẩm mới".',
        
            'groups' => 'Quản lý danh sách các nhóm người dùng. Nhóm giúp tổ chức và quản lý người dùng dễ dàng hơn, ví dụ nhóm "Admin" hoặc nhóm "Khách hàng thân thiết".',
        
            'group_members' => 'Liên kết người dùng (users) với nhóm (groups). Nếu người dùng thuộc một nhóm, sẽ có một bản ghi trong bảng này với user_id và group_id.',
        
            'user_permissions' => 'Dùng để phân quyền chi tiết cho từng người dùng, bao gồm user_id, permission_id, target_id (null là toàn bộ quyền, có giá trị là một quyền cụ thể. ví dụ trưởng một nhóm có thể thêm thành viên vào nhóm đó và chỉ nhóm đó chứ không phải nhóm khác, còn admin thì mọi nhóm), is_active (quyền này đặt ra nhưng đã được kích hoạt chưa. ví dụ admin tạo quyền ra nhưng chưa cấp quyền) và is_denied (người dùng có bị từ chối quyền này hay không. nếu người dùng có quyền này ở chỗ khác, ví dụ nhóm nhưng bị từ chối thì vẫn là không có quyền).',
            
            'group_permissions' => 'Giống user_permissions nhưng dành cho nhóm',
        
            'categories' => 'Chứa danh mục sản phẩm, hỗ trợ phân loại sản phẩm thành các nhóm. parent_id cho phép tạo danh mục con, ví dụ "Điện tử" có các danh mục con như "Điện thoại", "Máy tính".',
        
            'products' => 'Quản lý thông tin sản phẩm, bao gồm tên, mô tả, địa chỉ lưu kho, và danh mục. is_delete là thuộc tính xem sản phẩm đã bị xóa hay chưa (xóa ảo, sẽ quét định kì. nếu sản phẩm nào chưa có bất kì đơn hàng nào thì mới xóa vật lí',
        
            'product_attributes' => 'Xác định các thuộc tính của sản phẩm, ví dụ "Màu sắc", "Kích thước".',
        
            'product_attribute_values' => 'Lưu giá trị cho các thuộc tính, ví dụ "Màu sắc" có giá trị "Đỏ", "Xanh".',
        
            'product_options' => 'Lưu các tùy chọn sản phẩm, ví dụ: một mẫu áo có nhiều kích cỡ hoặc màu sắc. Bao gồm thông tin giá và số lượng tồn kho của từng tùy chọn. nó chỉ bị xóa khi product bị xóa vật lí',
        
            'product_option_values' => 'Kết nối các giá trị thuộc tính (product_attribute_values) với các tùy chọn sản phẩm (product_options), giúp mô tả chính xác một tùy chọn.',
        
            'cart' => 'Lưu thông tin giỏ hàng của người dùng. Mỗi bản ghi đại diện cho một sản phẩm tùy chọn (product_option) trong giỏ hàng.',
        
            'wishlist' => 'Lưu các sản phẩm mà người dùng yêu thích hoặc muốn mua sau.',
        
            'coupons' => 'Lưu mã giảm giá, bao gồm thông tin thời gian hiệu lực và trạng thái hoạt động.',
        
            'orders' => 'Lưu thông đơn hàng, bao gồm thông tin người mua, tổng tiền, trạng thái thanh toán và vận chuyển. coupon_id lưu mã giảm giá áp dụng cho đơn hàng (nếu có).',
        
            'order_details' => 'Chi tiết từng sản phẩm trong đơn hàng, bao gồm thông tin sản phẩm (product_option_id), số lượng và giá.',
        
            'reviews' => 'Lưu đánh giá sản phẩm của người dùng, bao gồm điểm đánh giá (rating) và bình luận (comment).',
        
            'notifications' => 'Quản lý thông báo gửi cho người dùng. type xác định loại thông báo: email, SMS, hoặc push notification.',
        
            'refresh_tokens' => 'Quản lý các token xác thực, giúp duy trì trạng thái đăng nhập.',
        
            'blacklist_tokens' => 'Ngăn chặn token bị lạm dụng, đảm bảo bảo mật cho hệ thống.',
        
            'files' => 'Lưu trữ thông tin các tệp người dùng tải lên, bao gồm tên tệp, kích thước, và đường dẫn lưu trữ.',
        
            'interactions' => 'Theo dõi hành động của người dùng trên sản phẩm. action_id xác định loại hành động, ví dụ "xem", "yêu thích", hoặc "thêm vào giỏ hàng".',
        
            'actions' => 'Lưu danh sách các loại hành động người dùng có thể thực hiện, kèm điểm thưởng (score) nếu có.',
        ];
        

        $existingTables = $this->getAll();
        $existingIds = array_map(fn($table) => $table->getTableName(), $existingTables);

        // Thêm bảng mới chưa có trong cơ sở dữ liệu
        foreach ($tables as $id => $description) {
            if (!in_array($id, $existingIds)) {
                $listTable = new ListTable();
                $listTable->setTableName($id)
                          ->setDescription($description);
                $this->entityManager->persist($listTable);
            }
        }

        // Xóa các bảng không còn trong danh sách tĩnh
        foreach ($existingTables as $table) {
            if (!array_key_exists($table->getTableName(), $tables)) {
                $this->entityManager->remove($table);
            }
        }

        // Ghi lại thay đổi vào cơ sở dữ liệu
        $this->entityManager->flush();
    }
}

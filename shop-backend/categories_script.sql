-- Danh mục gốc
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(1, 'Product Catalog', 'Danh mục sản phẩm là danh mục gốc của tất cả các sản phẩm', NULL);

-- Danh mục cấp 1
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(2, 'Fashion', 'Danh mục thời trang', 1),
(3, 'Electronics', 'Danh mục đồ điện tử', 1),
(4, 'Beauty', 'Danh mục đồ làm đẹp', 1),
(5, 'Housewares', 'Danh mục đồ gia dụng', 1),
(6, 'Decoration', 'Danh mục đồ trang trí', 1),
(7, 'Book', 'Danh mục sách', 1),
(8, 'Stationery', 'Danh mục đồ văn phòng ', 1),
(9, 'Mother and baby', 'Danh mục đồ cho trẻ nhỏ, bà bầu', 1),
(10, 'Shoes', 'Danh mục giày dép', 1),
(11, 'Book bag', 'Danh mục túi sách', 1),
(12, 'Healthy', 'Danh mục đồ sức khỏe', 1);

-- Danh mục thời trang nam và nữ
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(13, 'Men Fashion', 'Thời trang nam', 2),
(14, 'Women Fashion', 'Thời trang nữ', 2);

-- Danh mục con của thời trang nam
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(15, 'Men Pants', 'Quần nam', 13),
(16, 'Men Shirts', 'Áo nam', 13),
(17, 'Men Accessories', 'Phụ kiện nam (bao gồm đồ lót, tất, trang sức)', 13);

-- Danh mục con của thời trang nữ
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(18, 'Women Pants', 'Quần nữ', 14),
(19, 'Women Shirts', 'Áo nữ', 14),
(20, 'Women Accessories', 'Phụ kiện nữ (bao gồm đồ lót, tất, trang sức)', 14);

-- Danh mục điện tử
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(21, 'Mobile and accessories', 'Danh mục điện thoại và các linh kiện điện thoại', 3),
(22, 'Computers and accessories', 'Danh mục máy tính và các linh kiện máy tính', 3),
(23, 'TV and Screens', 'TV và màn hình', 3),
(24, 'Audio Devices', 'Thiết bị âm thanh', 3),
(25, 'Smart Home Appliances', 'Đồ gia dụng thông minh', 3);

-- Danh mục đồ làm đẹp
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(26, 'Skin Care', 'Chăm sóc da', 4),
(27, 'Hair Care', 'Chăm sóc tóc', 4),
(28, 'Oral Care', 'Vệ sinh răng miệng', 4),
(29, 'Beauty Tools', 'Dụng cụ làm đẹp', 4),
(30, 'Body Care', 'Chăm sóc cơ thể', 4);

-- Danh mục đồ gia dụng
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(31, 'Kitchen Appliances', 'Thiết bị nhà bếp', 5),
(32, 'Cleaning Tools', 'Dụng cụ vệ sinh', 5);

-- Danh mục đồ mẹ và bé
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(33, 'Baby Care', 'Chăm sóc em bé', 9),
(34, 'Maternity Products', 'Sản phẩm cho mẹ', 9),
(35, 'Baby Toys', 'Đồ chơi trẻ em', 9),
(36, 'Baby Clothes', 'Quần áo trẻ em', 9);

-- Danh mục giày dép
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(37, 'Men Shoe', 'Giày nam', 10),
(38, 'Women Shoe', 'Giày nữ', 10),
(39, 'Kid Shoe', 'Giày trẻ em', 10),
(40, 'Sport Shoe', 'Giày thể thao', 10);

-- Danh mục túi xách
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(41, 'Backpack', 'Ba lô', 11),
(42, 'Handbag', 'Túi xách tay', 11),
(43, 'Travel Bag', 'Túi du lịch', 11);

-- Danh mục điện thoại và phụ kiện
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(44, 'Smartphone', 'Điện thoại thông minh', 21),
(45, 'Tablet', 'Máy tính bảng', 21),
(46, 'Phone Accessories', 'Phụ kiện điện thoại', 21);

-- Danh mục máy tính và phụ kiện
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(47, 'Laptop', 'Máy tính xách tay', 22),
(48, 'Desktop PC', 'Máy tính để bàn', 22),
(49, 'Computer Accessories', 'Phụ kiện máy tính', 22),
(50, 'Computer Components', 'Linh kiện máy tính', 22);

-- Danh mục sức khỏe
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(51, 'Medical Supplies', 'Vật tư y tế', 12),
(52, 'Fitness Equipment', 'Thiết bị thể dục', 12),
(53, 'Vitamins and Supplements', 'Vitamin và thực phẩm bổ sung', 12);

-- Danh mục văn phòng phẩm
INSERT INTO categories (id, name, description, parent_id) 
VALUES 
(54, 'Writing Instruments', 'Dụng cụ viết', 8),
(55, 'Paper Products', 'Sản phẩm giấy', 8),
(56, 'Office Supplies', 'Văn phòng phẩm', 8),
(57, 'School Supplies', 'Dụng cụ học tập', 8);

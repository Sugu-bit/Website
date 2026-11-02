<?php

namespace App\Exception;


class ErrorCode {
    const S0000 = ['code' => -1, 'message' => 'Bạn đã đăng nhập', 'httpStatus' => 303];
    // 1.1. Lỗi chung (0000–0999)
    // 1.1.1 Lỗi chung
    const E0000 = ['code' => 0, 'message' => 'Lỗi không xác định', 'httpStatus' => 500];
    const E0001 = ['code' => 1, 'message' => 'Dịch vụ tạm thời không hoạt động', 'httpStatus' => 503];
    const E0002 = ['code' => 2, 'message' => 'Yêu cầu không hợp lệ', 'httpStatus' => 400];
    const E0003 = ['code' => 3, 'message' => 'Tham số yêu cầu bị thiếu', 'httpStatus' => 400];
    const E0004 = ['code' => 4, 'message' => 'Dữ liệu không hợp lệ', 'httpStatus' => 422];
    // 1.1.2 Lỗi kết nối
    const E0010 = ['code' => 10, 'message' => 'Không thể kết nối tới dịch vụ', 'httpStatus' => 503];
    const E0011 = ['code' => 11, 'message' => 'Kết nối tới cơ sở dữ liệu thất bại', 'httpStatus' => 500];
    const E0012 = ['code' => 12, 'message' => 'Kết nối tới API bên ngoài thất bại', 'httpStatus' => 503];
    const E0013 = ['code' => 13, 'message' => 'Hết thời gian chờ kết nối', 'httpStatus' => 504];
    // 1.1.3 Lỗi xác thực và phân quyền
    const E0020 = ['code' => 20, 'message' => 'Không có quyền truy cập', 'httpStatus' => 403];
    const E0021 = ['code' => 21, 'message' => 'Phiên làm việc đã hết hạn', 'httpStatus' => 401];
    const E0022 = ['code' => 22, 'message' => 'Xác thực không thành công', 'httpStatus' => 401];
    // 1.1.4 Lỗi giới hạn và tài nguyên
    const E0030 = ['code' => 30, 'message' => 'Quá giới hạn số lượng yêu cầu', 'httpStatus' => 429];
    const E0031 = ['code' => 31, 'message' => 'Tài nguyên không tìm thấy', 'httpStatus' => 404];
    const E0032 = ['code' => 32, 'message' => 'Hành động không được phép', 'httpStatus' => 403];
    // 1.1.5 Lỗi hệ thống
    const E0099 = ['code' => 99, 'message' => 'Lỗi hệ thống không xác định', 'httpStatus' => 500];



    // 1.2. User Service (1000–1999)
    // 1.2.1 Thông tin tài khoản
    const E1000 = ['code' => 1000, 'message' => 'Tài khoản đã tồn tại', 'httpStatus' => 409];
    const E1001 = ['code' => 1001, 'message' => 'Email đã tồn tại', 'httpStatus' => 409];
    const E1002 = ['code' => 1002, 'message' => 'Số điện thoại đã tồn tại', 'httpStatus' => 409];
    const E1003 = ['code' => 1003, 'message' => 'Tài khoản bị khóa', 'httpStatus' => 403];
    const E1004 = ['code' => 1004, 'message' => 'Tài khoản không tồn tại', 'httpStatus' => 404];
    const E1005 = ['code' => 1005, 'message' => 'Sai tên đăng nhập hoặc mật khẩu', 'httpStatus' => 401];
    const E1006 = ['code' => 1006, 'message' => 'Username đã tồn tại', 'httpStatus' => 409];
    const E1007 = ['code' => 1007, 'message' => 'Không thể xóa tài khoản', 'httpStatus' => 409];
    
    // 1.2.2 Dữ liệu không hợp lệ
    const E1010 = ['code' => 1010, 'message' => 'Tên người dùng không hợp lệ', 'httpStatus' => 400];
    const E1011 = ['code' => 1011, 'message' => 'Email không hợp lệ', 'httpStatus' => 400];
    const E1012 = ['code' => 1012, 'message' => 'Số điện thoại không hợp lệ', 'httpStatus' => 400];
    const E1013 = ['code' => 1013, 'message' => 'Địa chỉ không hợp lệ', 'httpStatus' => 400];
    const E1014 = ['code' => 1014, 'message' => 'Mật khẩu không hợp lệ', 'httpStatus' => 400];
    const E1015 = ['code' => 1015, 'message' => 'Trường dữ liệu bị thiếu', 'httpStatus' => 400];
    // 1.2.3 Lỗi xác thực
    const E1020 = ['code' => 1020, 'message' => 'Token không hợp lệ', 'httpStatus' => 401];
    const E1021 = ['code' => 1021, 'message' => 'Token đã hết hạn', 'httpStatus' => 401];
    const E1022 = ['code' => 1022, 'message' => 'Không có quyền truy cập', 'httpStatus' => 403];
    const E1023 = ['code' => 1023, 'message' => 'Không thể xác thực', 'httpStatus' => 401];
    const E1024 = ['code' => 1024, 'message' => 'Mật khẩu hiện tại không chính xác', 'httpStatus' => 401];
    // 1.2.4 Lỗi hệ thống
    const E1030 = ['code' => 1030, 'message' => 'Lỗi máy chủ nội bộ', 'httpStatus' => 500];
    const E1031 = ['code' => 1031, 'message' => 'Không thể kết nối cơ sở dữ liệu', 'httpStatus' => 500];
    const E1032 = ['code' => 1032, 'message' => 'Thao tác không thành công', 'httpStatus' => 500];
    // 1.2.5 Lỗi giới hạn
    const E1040 = ['code' => 1040, 'message' => 'Quá nhiều yêu cầu', 'httpStatus' => 429];
    const E1041 = ['code' => 1041, 'message' => 'Đã đạt giới hạn tạo tài khoản', 'httpStatus' => 429];
    // 1.2.6 Lỗi khác
    const E1999 = ['code' => 1999, 'message' => 'Lỗi không xác định', 'httpStatus' => 500];



    // 1.3. Authentication/Authorization Service (2000–2999)
    // 1.3.1 Lỗi đăng nhập
    const E2000 = ['code' => 2000, 'message' => 'Tên đăng nhập hoặc mật khẩu không đúng', 'httpStatus' => 401];
    const E2001 = ['code' => 2001, 'message' => 'Tài khoản đã bị vô hiệu hóa', 'httpStatus' => 403];
    const E2002 = ['code' => 2002, 'message' => 'Bạn chưa đăng nhập', 'httpStatus' => 403];
    const E2003 = ['code' => 2003, 'message' => 'Quá nhiều lần thử đăng nhập thất bại', 'httpStatus' => 429];    
    // 1.3.2 Lỗi xác thực (Authentication)
    const E2010 = ['code' => 2010, 'message' => 'Token không hợp lệ', 'httpStatus' => 401];
    const E2011 = ['code' => 2011, 'message' => 'Token đã hết hạn', 'httpStatus' => 401];
    const E2012 = ['code' => 2012, 'message' => 'Token đã bị thu hồi', 'httpStatus' => 401];
    const E2013 = ['code' => 2013, 'message' => 'Thiếu thông tin xác thực', 'httpStatus' => 401];
    const E2014 = ['code' => 2014, 'message' => 'Thiếu thông tin xác thực', 'httpStatus' => 401];
    // 1.3.3 Lỗi phân quyền (Authorization)
    const E2020 = ['code' => 2020, 'message' => 'Không có quyền truy cập vào tài nguyên này', 'httpStatus' => 403];
    const E2021 = ['code' => 2021, 'message' => 'Vai trò người dùng không được phép thực hiện hành động này', 'httpStatus' => 403];
    const E2022 = ['code' => 2022, 'message' => 'Người dùng không có quyền này', 'httpStatus' => 404];
    const E2024 = ['code' => 2024, 'message' => 'Quyền này không tồn tại', 'httpStatus' => 404];
    const E2025 = ['code' => 2025, 'message' => 'Cần đăng nhập để thực hiện hành động này', 'httpStatus' => 401];
    
    // 1.3.4 Lỗi đăng ký
    const E2030 = ['code' => 2030, 'message' => 'Email đã được sử dụng', 'httpStatus' => 409];
    const E2031 = ['code' => 2031, 'message' => 'Tên đăng nhập đã được sử dụng', 'httpStatus' => 409];
    const E2032 = ['code' => 2032, 'message' => 'Mật khẩu không đáp ứng yêu cầu bảo mật', 'httpStatus' => 400];
    const E2033 = ['code' => 2033, 'message' => 'Xác nhận mật khẩu không khớp', 'httpStatus' => 400];
    // 1.3.5 Lỗi liên quan đến OTP/2FA
    const E2040 = ['code' => 2040, 'message' => 'Mã OTP không chính xác', 'httpStatus' => 400];
    const E2041 = ['code' => 2041, 'message' => 'Mã OTP đã hết hạn', 'httpStatus' => 400];
    const E2042 = ['code' => 2042, 'message' => 'Mã OTP đã được sử dụng', 'httpStatus' => 400];
    const E2043 = ['code' => 2043, 'message' => '2FA chưa được bật cho tài khoản', 'httpStatus' => 403];
    // 1.3.6 Lỗi liên quan đến refresh token
    const E2050 = ['code' => 2050, 'message' => 'Refresh token không hợp lệ', 'httpStatus' => 401];
    const E2051 = ['code' => 2051, 'message' => 'Refresh token đã hết hạn', 'httpStatus' => 401];
    // 1.3.7 Lỗi hệ thống
    const E2999 = ['code' => 2999, 'message' => 'Lỗi không xác định trong dịch vụ xác thực/phân quyền', 'httpStatus' => 500];



    // 1.4. Payment Service (3000–3999)
    // 1.4.1 Lỗi giao dịch
    const E3000 = ['code' => 3000, 'message' => 'Giao dịch không thành công', 'httpStatus' => 400];
    const E3001 = ['code' => 3001, 'message' => 'Số dư không đủ để thực hiện giao dịch', 'httpStatus' => 402];
    const E3002 = ['code' => 3002, 'message' => 'Phương thức thanh toán không được hỗ trợ', 'httpStatus' => 400];
    const E3003 = ['code' => 3003, 'message' => 'Giao dịch bị hủy bởi người dùng', 'httpStatus' => 400];
    const E3004 = ['code' => 3004, 'message' => 'Mã giao dịch không hợp lệ', 'httpStatus' => 404];
    // 1.4.2 Lỗi xác thực thanh toán
    const E3010 = ['code' => 3010, 'message' => 'Lỗi xác thực thẻ tín dụng/thẻ ghi nợ', 'httpStatus' => 401];
    const E3011 = ['code' => 3011, 'message' => 'Thẻ tín dụng đã hết hạn', 'httpStatus' => 402];
    const E3012 = ['code' => 3012, 'message' => 'Thẻ tín dụng bị từ chối', 'httpStatus' => 402];
    const E3013 = ['code' => 3013, 'message' => 'OTP thanh toán không chính xác', 'httpStatus' => 400];
    const E3014 = ['code' => 3014, 'message' => 'OTP thanh toán đã hết hạn', 'httpStatus' => 400];
    // 1.4.3 Lỗi xử lý thanh toán
    const E3020 = ['code' => 3020, 'message' => 'Hệ thống thanh toán không phản hồi', 'httpStatus' => 503];
    const E3021 = ['code' => 3021, 'message' => 'Thời gian xử lý giao dịch bị quá hạn', 'httpStatus' => 504];
    const E3022 = ['code' => 3022, 'message' => 'Lỗi không xác định từ cổng thanh toán', 'httpStatus' => 502];
    const E3023 = ['code' => 3023, 'message' => 'Không thể kết nối tới hệ thống ngân hàng', 'httpStatus' => 503];
    // 1.4.4 Lỗi hoàn tiền
    const E3030 = ['code' => 3030, 'message' => 'Không thể thực hiện hoàn tiền', 'httpStatus' => 400];
    const E3031 = ['code' => 3031, 'message' => 'Yêu cầu hoàn tiền không hợp lệ', 'httpStatus' => 400];
    const E3032 = ['code' => 3032, 'message' => 'Giao dịch không đủ điều kiện hoàn tiền', 'httpStatus' => 403];
    const E3033 = ['code' => 3033, 'message' => 'Hoàn tiền đã được thực hiện trước đó', 'httpStatus' => 409];
    // 1.4.5 Lỗi giới hạn thanh toán
    const E3040 = ['code' => 3040, 'message' => 'Đã vượt quá hạn mức giao dịch trong ngày', 'httpStatus' => 429];
    const E3041 = ['code' => 3041, 'message' => 'Số tiền giao dịch vượt quá hạn mức cho phép', 'httpStatus' => 400];
    const E3042 = ['code' => 3042, 'message' => 'Số lần giao dịch vượt quá giới hạn', 'httpStatus' => 429];
    // 1.4.6 Lỗi hệ thống
    const E3999 = ['code' => 3999, 'message' => 'Lỗi không xác định trong dịch vụ thanh toán', 'httpStatus' => 500];



    // 1.5. Notification Service (4000–4999)
    // 1.5.1 Lỗi chung
    const E4000 = ['code' => 4000, 'message' => 'Gửi thông báo không thành công', 'httpStatus' => 500];
    const E4001 = ['code' => 4001, 'message' => 'Thông tin người nhận không hợp lệ', 'httpStatus' => 400];
    const E4002 = ['code' => 4002, 'message' => 'Nội dung thông báo bị thiếu', 'httpStatus' => 400];
    const E4003 = ['code' => 4003, 'message' => 'Phương thức gửi thông báo không được hỗ trợ', 'httpStatus' => 400];
    // 1.5.2 Lỗi liên quan đến email
    const E4010 = ['code' => 4010, 'message' => 'Không thể gửi email', 'httpStatus' => 500];
    const E4011 = ['code' => 4011, 'message' => 'Địa chỉ email không hợp lệ', 'httpStatus' => 400];
    const E4012 = ['code' => 4012, 'message' => 'SMTP server không phản hồi', 'httpStatus' => 503];
    const E4013 = ['code' => 4013, 'message' => 'Quá giới hạn gửi email trong ngày', 'httpStatus' => 429];
    const E4014 = ['code' => 4014, 'message' => 'Địa chỉ email người nhận bị từ chối', 'httpStatus' => 400];
    // 1.5.3 Lỗi liên quan đến SMS/OTP
    const E4020 = ['code' => 4020, 'message' => 'Không thể gửi SMS', 'httpStatus' => 500];
    const E4021 = ['code' => 4021, 'message' => 'Số điện thoại không hợp lệ', 'httpStatus' => 400];
    const E4022 = ['code' => 4022, 'message' => 'Nhà cung cấp dịch vụ SMS không phản hồi', 'httpStatus' => 503];
    const E4023 = ['code' => 4023, 'message' => 'Quá giới hạn gửi OTP trong ngày', 'httpStatus' => 429];
    const E4024 = ['code' => 4024, 'message' => 'Mã OTP không được gửi thành công', 'httpStatus' => 500];
    // 1.5.4 Lỗi liên quan đến thông báo đẩy (Push Notification)
    const E4030 = ['code' => 4030, 'message' => 'Không thể gửi thông báo đẩy', 'httpStatus' => 500];
    const E4031 = ['code' => 4031, 'message' => 'Thiết bị nhận thông báo không hợp lệ', 'httpStatus' => 400];
    const E4032 = ['code' => 4032, 'message' => 'Token thiết bị không hợp lệ hoặc hết hạn', 'httpStatus' => 401];
    const E4033 = ['code' => 4033, 'message' => 'Dịch vụ thông báo đẩy không phản hồi', 'httpStatus' => 503];
    // 1.5.5 Lỗi giới hạn thông báo
    const E4040 = ['code' => 4040, 'message' => 'Quá giới hạn số lượng thông báo gửi trong ngày', 'httpStatus' => 429];
    const E4041 = ['code' => 4041, 'message' => 'Yêu cầu gửi thông báo bị từ chối do giới hạn', 'httpStatus' => 429];
    // 1.5.6 Lỗi hệ thống
    const E4999 = ['code' => 4999, 'message' => 'Lỗi không xác định trong dịch vụ thông báo', 'httpStatus' => 500];



    // 1.6. Data Service (5000–5999)
    // 1.6.1 Lỗi chung
    const E5000 = ['code' => 5000, 'message' => 'Lỗi xử lý dữ liệu', 'httpStatus' => 500];
    const E5001 = ['code' => 5001, 'message' => 'Dữ liệu đầu vào không hợp lệ', 'httpStatus' => 400];
    const E5002 = ['code' => 5002, 'message' => 'Không thể tải dữ liệu', 'httpStatus' => 500];
    const E5003 = ['code' => 5003, 'message' => 'Dữ liệu vượt quá kích thước cho phép', 'httpStatus' => 413];
    // 1.6.2 Lỗi liên quan đến tải lên (Upload)
    const E5010 = ['code' => 5010, 'message' => 'Không thể tải tệp lên', 'httpStatus' => 500];
    const E5011 = ['code' => 5011, 'message' => 'Định dạng tệp không được hỗ trợ', 'httpStatus' => 400];
    const E5012 = ['code' => 5012, 'message' => 'Dung lượng tệp vượt quá giới hạn', 'httpStatus' => 413];
    const E5013 = ['code' => 5013, 'message' => 'Thiếu dữ liệu hoặc tệp để tải lên', 'httpStatus' => 400];
    // 1.6.3 Lỗi liên quan đến tải xuống (Download)
    const E5020 = ['code' => 5020, 'message' => 'Không thể tải tệp xuống', 'httpStatus' => 500];
    const E5021 = ['code' => 5021, 'message' => 'Tệp không tồn tại', 'httpStatus' => 404];
    const E5022 = ['code' => 5022, 'message' => 'Tệp bị hỏng hoặc không thể truy cập', 'httpStatus' => 500];
    const E5023 = ['code' => 5023, 'message' => 'Yêu cầu tải xuống không hợp lệ', 'httpStatus' => 400];
    // 1.6.4 Lỗi liên quan đến dung lượng lưu trữ
    const E5030 = ['code' => 5030, 'message' => 'Không đủ dung lượng lưu trữ', 'httpStatus' => 507];
    const E5031 = ['code' => 5031, 'message' => 'Hạn mức lưu trữ đã đạt tối đa', 'httpStatus' => 507];
    const E5032 = ['code' => 5032, 'message' => 'Không thể mở rộng dung lượng lưu trữ', 'httpStatus' => 500];
    // 1.6.5 Lỗi liên quan đến quyền truy cập
    const E5040 = ['code' => 5040, 'message' => 'Không có quyền truy cập tệp', 'httpStatus' => 403];
    const E5041 = ['code' => 5041, 'message' => 'Tệp bị bảo vệ hoặc quyền bị hạn chế', 'httpStatus' => 403];
    // 1.6.6 Lỗi hệ thống
    const E5999 = ['code' => 5999, 'message' => 'Lỗi không xác định trong dịch vụ dữ liệu', 'httpStatus' => 500];



    // 2.1. Web bán hàng (10000–19999)
    // 2.1.1. Lỗi chung
    const E10000 = ['code' => 10000, 'message' => 'Lỗi không xác định trong hệ thống web bán hàng', 'httpStatus' => 500];
    const E10001 = ['code' => 10001, 'message' => 'Yêu cầu không hợp lệ', 'httpStatus' => 400];
    const E10002 = ['code' => 10002, 'message' => 'Tham số yêu cầu bị thiếu', 'httpStatus' => 400];
    const E10003 = ['code' => 10003, 'message' => 'Quyền truy cập bị từ chối', 'httpStatus' => 403];
    // 2.1.2 Lỗi liên quan đến người dùng (users, permissions, groups)
    const E10100 = ['code' => 10100, 'message' => 'Không tìm thấy người dùng', 'httpStatus' => 404];
    const E10101 = ['code' => 10101, 'message' => 'Người dùng không có quyền thực hiện hành động này', 'httpStatus' => 403];
    const E10102 = ['code' => 10102, 'message' => 'Không tìm thấy nhóm', 'httpStatus' => 404];
    const E10103 = ['code' => 10103, 'message' => 'Thành viên nhóm không hợp lệ', 'httpStatus' => 400];
    const E10104 = ['code' => 10104, 'message' => 'Quyền hạn không hợp lệ', 'httpStatus' => 400];
    const E10110 = ['code' => 10110, 'message' => 'Nhóm không tồn tại', 'httpStatus' => 400];
    
    // 2.1.3 Lỗi liên quan đến sản phẩm và danh mục (products, categories)
    const E10200 = ['code' => 10200, 'message' => 'Không tìm thấy sản phẩm', 'httpStatus' => 404];
    const E10201 = ['code' => 10201, 'message' => 'Sản phẩm đã hết hàng', 'httpStatus' => 400];
    const E10202 = ['code' => 10202, 'message' => 'Danh mục không tồn tại', 'httpStatus' => 404];
    const E10203 = ['code' => 10203, 'message' => 'Không thể thêm sản phẩm vào danh mục', 'httpStatus' => 500];
    const E10204 = ['code' => 10204, 'message' => 'Sản phẩm thiếu các lựa chọn', 'httpStatus' => 500];
    
    // 2.1.4 Lỗi liên quan đến giỏ hàng và danh sách yêu thích (cart, wishlist)
    const E10300 = ['code' => 10300, 'message' => 'Không tìm thấy giỏ hàng', 'httpStatus' => 404];
    const E10301 = ['code' => 10301, 'message' => 'Không thể thêm sản phẩm vào giỏ hàng', 'httpStatus' => 500];
    const E10302 = ['code' => 10302, 'message' => 'Không tìm thấy danh sách yêu thích', 'httpStatus' => 404];
    const E10303 = ['code' => 10303, 'message' => 'Không thể thêm sản phẩm vào danh sách yêu thích', 'httpStatus' => 500];
    // 2.1.5 Lỗi liên quan đến phiếu giảm giá (coupons)
    const E10400 = ['code' => 10400, 'message' => 'Phiếu giảm giá không tồn tại', 'httpStatus' => 404];
    const E10401 = ['code' => 10401, 'message' => 'Phiếu giảm giá đã hết hạn', 'httpStatus' => 400];
    const E10402 = ['code' => 10402, 'message' => 'Phiếu giảm giá không hợp lệ', 'httpStatus' => 400];
    const E10403 = ['code' => 10403, 'message' => 'Không thể áp dụng phiếu giảm giá', 'httpStatus' => 500];
    // 2.1.6 Lỗi liên quan đến đơn hàng (orders, order_details)
    const E10500 = ['code' => 10500, 'message' => 'Không tìm thấy đơn hàng', 'httpStatus' => 404];
    const E10501 = ['code' => 10501, 'message' => 'Không thể tạo đơn hàng', 'httpStatus' => 500];
    const E10502 = ['code' => 10502, 'message' => 'Chi tiết đơn hàng không hợp lệ', 'httpStatus' => 400];
    const E10503 = ['code' => 10503, 'message' => 'Không thể hủy đơn hàng', 'httpStatus' => 400];
    const E10504 = ['code' => 10504, 'message' => 'Không thể xác nhận thanh toán cho đơn hàng', 'httpStatus' => 500];
    // 2.1.7 Lỗi liên quan đến đánh giá (reviews)
    const E10600 = ['code' => 10600, 'message' => 'Không tìm thấy đánh giá', 'httpStatus' => 404];
    const E10601 = ['code' => 10601, 'message' => 'Người dùng không thể đánh giá sản phẩm này', 'httpStatus' => 403];
    const E10602 = ['code' => 10602, 'message' => 'Đánh giá không hợp lệ', 'httpStatus' => 400];
    const E10603 = ['code' => 10603, 'message' => 'Không thể thêm đánh giá', 'httpStatus' => 500];
    // 2.1.8 Dữ liệu không hợp lệ
    const E10700 = ['code' => 10700, 'message' => 'Id người dùng là bắt buộc', 'httpStatus' => 400];
    const E10701 = ['code' => 10701, 'message' => 'Tên file là bắt buộc', 'httpStatus' => 400];
    const E10702 = ['code' => 10702, 'message' => 'Kích thước file là bắt buộc', 'httpStatus' => 400];
    const E10710 = ['code' => 10710, 'message' => 'Nhập thiếu thông tin bắt buộc', 'httpStatus' => 400];
    const E10711 = ['code' => 10711, 'message' => 'Dữ liệu đầu vào không đúng định dạng', 'httpStatus' => 400];
    
    
    // 2.1.9 Lỗi hệ thống
    const E19999 = ['code' => 19999, 'message' => 'Lỗi không xác định trong ứng dụng', 'httpStatus' => 500];



    // 2.2. Web lưu trữ dữ liệu (20000–29999)
    const E20000 = ['code' => 20000, 'message' => 'File vượt quá kích thước cho phép', 'httpStatus' => 413];
    const E20200 = ['code' => 20200, 'message' => 'File không tồn tại', 'httpStatus' => 404];



    // 2.3. Mạng xã hội (30000–39999)
    const E30000 = ['code' => 30000, 'message' => 'Người dùng bị cấm', 'httpStatus' => 403];
    const E30200 = ['code' => 30200, 'message' => 'Bài viết không tồn tại', 'httpStatus' => 404];



    // 2.4. Ứng dụng khác (40000–49999)
    const E40000 = ['code' => 40000, 'message' => 'Lỗi không xác định trong ứng dụng', 'httpStatus' => 500];

    
}

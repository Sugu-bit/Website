# Hướng dẫn sử dụng API

- T chỉ viết các api mà chưa có ở phần test phía frontend thôi. hoặc cái nào t siêng thì t viết

## Security

### Login

- Đường dẫn truy cập `https://localhost:8000/api/login`.
- Phương thức: POST.

Ví dụ

- Body:

```json
{
  "username": "superadmin",
  "password": "123456"
}
```

- kết quả trả về:

```json
{
    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NjaW1lLmNsaWNrIiwiYXVkIjoiaHR0cHM6Ly9zaG9wLnNjaW1lLmNsaWNrIiwianRpIjoiNWVlYzNiMjI4ZGVjYjJkNjkxMjlkNjI0ZWRlY2ZjYzI4ZmY0YWE2MzViMWY4OTBkNDU0ZDQwODVlMGI5MTEzNSIsImlhdCI6MTczNTg4OTQwMi4xODk0OTIsImV4cCI6MTczNTg5MzAwMi4xODk0OTIsInVpZCI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQHNjaW1lLnZuIiwiaXNBY3RpdmUiOnRydWUsInR5cGUiOiJhY2Nlc3MiLCJyZWZyZXNoSWQiOiJjMjUzNzUzMzJhNWU2ZWEwZTY0MTE1NmQwNjMwY2JhMDlkNGExMzYzNDliNDJhOGU4OGM5MTA3ZTQzMmU3NTg1In0.j_qg0jVXUQ5kDE2WrOETlA7u7tlGHCHuVVdpLrfj_Ms",
    "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NjaW1lLmNsaWNrIiwiYXVkIjoiaHR0cHM6Ly9zaG9wLnNjaW1lLmNsaWNrIiwianRpIjoiYzI1Mzc1MzMyYTVlNmVhMGU2NDExNTZkMDYzMGNiYTA5ZDRhMTM2MzQ5YjQyYThlODhjOTEwN2U0MzJlNzU4NSIsImlhdCI6MTczNTg4OTQwMi4wODIyNDYsImV4cCI6MTc0MTA3MzQwMi4wODIyNDYsInVpZCI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQHNjaW1lLnZuIiwiaXNBY3RpdmUiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwicmV1c2VDb3VudCI6MH0.yRBbXUmVv_XNV4sfhag7LNCaW8LHXsNxyic0Lyrjcnc"
}
```

### Refresh token

- Đường dẫn truy cập `https://localhost:8000/api/refresh-token`.

- Phương thức: POST.

- Lưu ý: access token chỉ có thời gian sống tối đa 1 giờ.

Ví dụ

- Body:

```json
{
  "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NjaW1lLmNsaWNrIiwiYXVkIjoiaHR0cHM6Ly9zaG9wLnNjaW1lLmNsaWNrIiwianRpIjoiYzI1Mzc1MzMyYTVlNmVhMGU2NDExNTZkMDYzMGNiYTA5ZDRhMTM2MzQ5YjQyYThlODhjOTEwN2U0MzJlNzU4NSIsImlhdCI6MTczNTg4OTQwMi4wODIyNDYsImV4cCI6MTc0MTA3MzQwMi4wODIyNDYsInVpZCI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQHNjaW1lLnZuIiwiaXNBY3RpdmUiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwicmV1c2VDb3VudCI6MH0.yRBbXUmVv_XNV4sfhag7LNCaW8LHXsNxyic0Lyrjcnc"
}
```

- kết quả trả về:

```json
{
    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NjaW1lLmNsaWNrIiwiYXVkIjoiaHR0cHM6Ly9zaG9wLnNjaW1lLmNsaWNrIiwianRpIjoiN2E4NDllMTkzZTU1ODBmYTViOGQ0ZDhiMzA5YzdiMTYzOGM1MTYzZTFlMzMwNGI2MzcwODFlZDZlOGViYzJmMCIsImlhdCI6MTczNTg4OTYzNC4xNzY3NzIsImV4cCI6MTczNTg5MzIzNC4xNzY3NzIsInVpZCI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQHNjaW1lLnZuIiwiaXNBY3RpdmUiOnRydWUsInR5cGUiOiJhY2Nlc3MiLCJyZWZyZXNoSWQiOiJjMjUzNzUzMzJhNWU2ZWEwZTY0MTE1NmQwNjMwY2JhMDlkNGExMzYzNDliNDJhOGU4OGM5MTA3ZTQzMmU3NTg1In0.k-1SgMv9-TshYEr6UhO9jb-A2knV_nrQHwxWsyXdCfQ"
}
```

### Refresh refresh-token

- Đường dẫn truy cập `https://localhost:8000/api/refresh-refresh-token`.

- Phương thức: POST.

- Lưu ý: refresh token chỉ có thời gian sống tối đa 2 tháng, khuyến cáo 1 tháng thay đổi refresh token 1 lần. refresh token chỉ được cấp lại tối đa 12 lần. sau đó phải đăng nhập lại.

Ví dụ

Ví dụ

- Body:

```json
{
  "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NjaW1lLmNsaWNrIiwiYXVkIjoiaHR0cHM6Ly9zaG9wLnNjaW1lLmNsaWNrIiwianRpIjoiYzY2MzE1Mjc3MmU3ZDcyZDZiMDNhOTgzOWNlN2M0ZmExNjlmZDkyOTY4ZGNmODZmM2YyZTFmODBmMjZlY2RjNCIsImlhdCI6MTczNTkwMDE4MS4yMjAxMTcsImV4cCI6MTc0MTA4NDE4MS4yMjAxMTcsInVpZCI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQHNjaW1lLnZuIiwiaXNBY3RpdmUiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwicmV1c2VDb3VudCI6MH0.ylf_e5CAwRnMsgOiZAX2obgADTmy5XHpDgUMYS-Udx4"
}
```

- kết quả trả về:

```json
{
    "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NjaW1lLmNsaWNrIiwiYXVkIjoiaHR0cHM6Ly9zaG9wLnNjaW1lLmNsaWNrIiwianRpIjoiY2M5ZTNjZDllNTg4ZjY5MDdhM2Q5ODg5NDZlNWNlYzc2ZTIxMGJmYTE4MDJlMGMyNThjODIxYThmZjdhNDcyYiIsImlhdCI6MTczNTkwMDIzMC4wMjY3NTMsImV4cCI6MTc0MTA4NDIzMC4wMjY3NTMsInVpZCI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQHNjaW1lLnZuIiwiaXNBY3RpdmUiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwicmV1c2VDb3VudCI6MX0.98q7n6qaYDXwEswqW0fgeGWplr5ZyTRSI-9hfpgebKU"
}
```

### Logout

- Đường dẫn truy cập `https://localhost:8000/api/logout`.
- Phương thức: GET.

- kết quả trả về:

```json
{
  "message": "Logout successful"
}
```

### Change Password

- Đường dẫn truy cập `https://localhost:8000/api/change-password`.
- Phương thức: POST.

Ví dụ

- Body:

```json
{
  "currentPassword": "123456",
  "newPassword": "000000"
}
```

- kết quả trả về:

```json
{
    "message":"Password changed successfully."
}
```

### Verify Password

- Đường dẫn truy cập `https://localhost:8000/api/verify-password`.
- Phương thức: POST.

Ví dụ

- Body:

```json
{
  "password": "123456"
}
```

- kết quả trả về:

```json
{
  "message": "Password is correct."
}
```

## User

### Add User

- Đường dẫn truy cập `https://localhost:8000/api/users`.
- Phương thức: POST.

Ví dụ

- Body:

```json
{
  "username": "thang",
  "email": "nguyenhuuthang011@gmail.com",
  "password": "123456",
  "phone": "0123456789",
  "address": "12/đường abc/quận cde/hà nội/việt nam"
}
```

- kết quả trả về:

```json
{
    "id": 2,
    "username": "thang",
    "email": "nguyenhuuthang011@gmail.com",
    "phone": "0123456789",
    "address": "12/đường abc/quận cde/hà nội/việt nam"
}
```

### User List

- Đường dẫn truy cập: `https://localhost:8000/api/users?page=1&limit=3`.

- Phương thức: GET.

- kết quả trả về:

```json
[
    {
        "id": 1,
        "username": "superadmin",
        "email": "superadmin@scime.vn",
        "phone": null,
        "address": null
    },
    {
        "id": 4,
        "username": "meomeo",
        "email": "nguyenhuuthang011@gmail.com",
        "phone": "0392675240",
        "address": "41, 163 trần phú"
    },
    {
        "id": 7,
        "username": "thang",
        "email": "nguyenhuuthang2_t6ẻth6@hus.edu.vn",
        "phone": "0392675240",
        "address": "41, 163 trần phú"
    }
]
```

### Get User By ID

- Đường dẫn truy cập: `https://localhost:8000/api/users/{id}`.

- Phương thức: GET.

Ví dụ:

- Đường dẫn: `https://localhost:8000/api/users/2`.

- kết quả trả về:

```json
{
    "id": 2,
    "username": "thang",
    "email": "nguyenhuuthang011@gmail.com",
    "phone": "0123456789",
    "address": "12/đường abc/quận cde/hà nội/việt nam"
}
```

### Update User

- Đường dẫn truy cập: `https://localhost:8000/api/users/{user id}`.

- Phương thức: PUT.

Ví dụ:

- Đường dẫn: `https://localhost:8000/api/users/2`.

```json
{
  "username": "maomao",
  "email": "abcxyz@gmail.com",
  "password": "000000",
  "phone": "987653210",
  "address": "23, 45 Hai bà trưng",
}
```

- kết quả trả về:

```json
{
    "id": 2,
    "username": "maomao",
    "email": "abcxyz@gmail.com",
    "phone": "987653210",
    "address": "23, 45 Hai bà trưng"
}
```

### Delete User

- Đường dẫn truy cập: `https://localhost:8000/api/users/{user id}`.

- Phương thức: DELETE.

Ví dụ:

- Đường dẫn: `https://localhost:8000/api/users/3`.

- kết quả trả về:

```json
{
  "message": "User deleted"
}
```

## Product

- t vừa thêm một trường dữ liệu mới: `discountPercentage`. Thêm trường này chỉ để hiển thị lên là sẳn phẩm này đang được giảm giá bao nhiêu, nó không giảm giá mà chỉ đánh vào tâm lí người mua là: một đơn hàng giá 100k và một đơn giá 200k nhưng giảm 50% thì họ chọn cái 200k giảm 50%. giảm giá thật sự thì là mã giảm giá lưu trong bảng Coupon. người dùng cần có mã và add vào đơn hàng để được giảm giá.

### Tạo sản phẩm mới

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products`.
- Phương thức: POST.

Ví dụ

- Body:

```json
{
    "name": "tên sản phẩm",
    "locationAddress": "địa chỉ/sản phẩm/Việt Nam",
    "description": "mô tả về sản phẩm",
    "price": 3,
    "stock": 4,
    "categoryId": 2,
    "attribute": {
        "màu sắc": ["đen", "đỏ", "vàng", "xanh"],
        "size": ["40", "41", "42", "43"],
        "cỡ dây": ["26 AWG 1 mét", "22 AWG 1 mét", "abc", "xyz"]
    }
}
```

- kết quả trả về:

```json
{
    "id": 14,
    "name": "tên sản phẩm",
    "description": "mô tả về sản phẩm",
    "price": 3,
    "stock": 4,
    "locationAddress": "địa chỉ/sản phẩm/Việt Nam",
    "categoryId": 2,
    "attributes": {
        "màu sắc": [
            "đen",
            "đỏ",
            "vàng",
            "xanh"
        ],
        "size": [
            "40",
            "41",
            "42",
            "43"
        ],
        "cỡ dây": [
            "26 AWG 1 mét",
            "22 AWG 1 mét",
            "abc",
            "xyz"
        ]
    }
}
```

### Xem sản phẩm

#### Xem một sản phẩm dựa vào id

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products/{id product}`.
- Phương thức: GET.

Ví dụ

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products/10`.

- Kết quả trả về:

```json
{
    "id": 10,
    "name": "tên sản phẩm",
    "description": "mô tả về sản phẩm",
    "prices": null,
    "stock": 0,
    "locationAddress": "địa chỉ/sản phẩm/Việt Nam",
    "categoryId": null,
    "attributes": {
        "màu sắc": [
            "đen",
            "đỏ",
            "vàng",
            "xanh"
        ],
        "size": [
            "40",
            "41",
            "42",
            "43"
        ],
        "cỡ dây": [
            "26 AWG 1 mét",
            "22 AWG 1 mét",
            "abc",
            "xyz"
        ]
    }
}
```

#### Xem tất cả sản phẩm

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products?page=2&limit=5`.

- Phương thức: GET

- Kết quả trả về:

```json
[
    {
        "id": 6,
        "name": "xiaomi redme note 4",
        "description": "có thể không gửi trường này và attribute. nếu không gửi description thì nó là null, nếu không gửi attribute thì không có bản ghi được tạo ra",
        "price": null,
        "stock": 0,
        "locationAddress": "Hà Đông/Hà Nội/Việt Nam",
        "categoryId": null,
        "attributes": {
            "màu sắc": [
                "đen",
                "đỏ",
                "vàng",
                "xanh"
            ],
            "size": [
                "40",
                "41",
                "42",
                "43"
            ],
            "cỡ dây": [
                "26 AWG 1 mét",
                "22 AWG 1 mét",
                "abc",
                "xyz"
            ]
        },
        "discountPercentage": 0
    },
    {
        "id": 7,
        "name": "xiaomi redme note 4",
        "description": "có thể không gửi trường này và attribute. nếu không gửi description thì nó là null, nếu không gửi attribute thì không có bản ghi được tạo ra",
        "price": null,
        "stock": 0,
        "locationAddress": "Hà Đông/Hà Nội/Việt Nam",
        "categoryId": null,
        "attributes": {
            "màu sắc": [
                "đen",
                "đỏ",
                "vàng",
                "xanh"
            ],
            "size": [
                "40",
                "41",
                "42",
                "43"
            ],
            "cỡ dây": [
                "26 AWG 1 mét",
                "22 AWG 1 mét",
                "abc",
                "xyz"
            ]
        },
        "discountPercentage": 0
    },
    {
        "id": 8,
        "name": "đổi tên",
        "description": "đổi mô tả, nếu attribute có một khóa thì đổi cả cái mảng đó luôn á",
        "price": null,
        "stock": 0,
        "locationAddress": "đổi địa chỉ",
        "categoryId": null,
        "attributes": {
            "màu sắc": [
                "đổi",
                "thì",
                "ghi",
                "không",
                "đổi thì thôi"
            ],
            "size": [
                "40",
                "41",
                "42",
                "43"
            ],
            "cỡ dây": [
                "26 AWG 1 mét",
                "22 AWG 1 mét",
                "abc",
                "xyz"
            ]
        },
        "discountPercentage": 0
    },
    {
        "id": 9,
        "name": "đổi tên",
        "description": "đổi mô tả, nếu attribute có một khóa thì đổi cả cái mảng đó luôn á",
        "price": null,
        "stock": 0,
        "locationAddress": "đổi địa chỉ",
        "categoryId": null,
        "attributes": {
            "màu sắc": [
                "đổi",
                "thì",
                "ghi",
                "không",
                "đổi thì thôi"
            ],
            "size": [
                "40",
                "41",
                "42",
                "43"
            ],
            "cỡ dây": [
                "26 AWG 1 mét",
                "22 AWG 1 mét",
                "abc",
                "xyz"
            ]
        },
        "discountPercentage": 0
    },
    {
        "id": 11,
        "name": "tên sản phẩm",
        "description": "mô tả về sản phẩm",
        "price": 3,
        "stock": 4,
        "locationAddress": "địa chỉ/sản phẩm/Việt Nam",
        "categoryId": null,
        "attributes": {
            "màu sắc": [
                "đen",
                "đỏ",
                "vàng",
                "xanh"
            ],
            "size": [
                "40",
                "41",
                "42",
                "43"
            ],
            "cỡ dây": [
                "26 AWG 1 mét",
                "22 AWG 1 mét",
                "abc",
                "xyz"
            ]
        },
        "discountPercentage": 0
    }
]
```

### Cập nhật sản phẩm

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products/{id product}`.
- Phương thức: PUT.

Ví dụ

- Đường dẫn: `https://127.0.0.1:8000/api/products/20`.

- Body:

```json
{
    "name": "đổi tên",
    "locationAddress": "đổi địa chỉ",
    "price": 5,
    "stock": 7,
    "description": "đổi mô tả, nếu attribute có một khóa thì đổi cả cái mảng đó luôn á",
    "attribute": {
        "màu sắc": ["đổi", "thì", "ghi", "không", "đổi thì thôi"]
    }
}
```

- kết quả trả về:

```json
{
    "id": 20,
    "name": "đổi tên",
    "description": "đổi mô tả, nếu attribute có một khóa thì đổi cả cái mảng đó luôn á",
    "price": 5,
    "stock": 7,
    "locationAddress": "đổi địa chỉ",
    "categoryId": 2,
    "attributes": {
        "màu sắc": [
            "đổi",
            "thì",
            "ghi",
            "không",
            "đổi thì thôi"
        ],
        "size": [
            "40",
            "41",
            "42",
            "43"
        ],
        "cỡ dây": [
            "26 AWG 1 mét",
            "22 AWG 1 mét",
            "abc",
            "xyz"
        ]
    }
}
```

### Xóa một sản phẩm

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products/{id product}`.
- Phương thức: DELETE.

Ví dụ:

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products/10`.

```json
{
    "message": "Product deleted"
}
```

### Lấy danh sách sản phẩm từ danh mục sản phẩm

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products/by-category/{categoryId}`.
- Phương thức: GET.

Ví dụ:

-Đường dẫn: `https://127.0.0.1:8000/api/products/by-category/2`.

```json
[
    {
        "id": 16,
        "name": "tên sản phẩm",
        "description": "mô tả về sản phẩm",
        "price": 3,
        "stock": 4,
        "locationAddress": "địa chỉ/sản phẩm/Việt Nam",
        "categoryId": 2,
        "attributes": {
            "màu sắc": [
                "đen",
                "đỏ",
                "vàng",
                "xanh"
            ],
            "size": [
                "40",
                "41",
                "42",
                "43"
            ],
            "cỡ dây": [
                "26 AWG 1 mét",
                "22 AWG 1 mét",
                "abc",
                "xyz"
            ]
        }
    },
    {
        "id": 17,
        "name": "hello hello",
        "description": "mô tả về sản phẩm",
        "price": 3,
        "stock": 4,
        "locationAddress": "địa chỉ/sản phẩm/Việt Nam",
        "categoryId": 2,
        "attributes": {
            "màu sắc": [
                "đen",
                "đỏ",
                "vàng",
                "xanh"
            ],
            "size": [
                "40",
                "41",
                "42",
                "43"
            ],
            "cỡ dây": [
                "26 AWG 1 mét",
                "22 AWG 1 mét",
                "abc",
                "xyz"
            ]
        }
    }
]
```

### Thêm, cập sửa các thuộc tính và giá trị thuộc tính của sản phẩm

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products/{id product}/attribute`.
- Phương thức: POST, PUT.

Ví dụ:

- Đường dẫn `https://127.0.0.1:8000/api/products/3/attribute`.

- Body:

```json
{
    "attribute": ["size", "màu sắc", "cỡ dây"],

    "value": [
        [["38", "xanh", "nhỏ"], [500000, 12345]],
        [["38", "xanh", "vừa"], [600000, 1235]],
        [["39", "đỏ", "to khủng bố"], [50000, 1234]]
    ]
}
```

- Kết quả:

```json
{
    "message": "Attributes and options updated successfully"
}
```

### Lấy giá và số lượng hàng của một lựa chọn

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products/3/find-option`.
- Phương thức: POST.

Ví dụ:

- Body:

```json
{
    "size": "38",
    "màu sắc": "xanh",
    "cỡ dây": "vừa"
}
```

- Kết quả:

```json
{
    "id": 123,
    "price": 600000,
    "stock": 1235
}
```

### Lấy giá và số lượng mặc định

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products/{id product}/option-default`.
- Phương thức: GET.

Ví dụ:

- Đường dẫn `https://127.0.0.1:8000/api/products/16/option-default`.

- Kết quả:

```json
{
    "id": 1,
    "prices": 3,
    "stock": 4
}
```

### Lấy giá và số lượng theo option

- Đường dẫn truy cập `https://127.0.0.1:8000/api/products/options/2`.
- Phương thức: GET.

Ví dụ:

- Đường dẫn `https://127.0.0.1:8000/api/products/options/{id options}`.

- Kết quả:

```json
{
    "size": "38",
    "màu sắc": "xanh",
    "cỡ dây": "22 AWG 1 mét"
}
```

## Category

### Tạo mới danh mục

- Đường dẫn truy cập `https://localhost:8000/api/categories`.

- Phương thức: POST.

Ví dụ:

- Body:

```json
{
  "name": "Quần bò",
  "description": "không thích mô tả",
  "parentId": "1"
}
```

- Kết quả trả về

```json
{
  "id": 4,
  "name": "Quần bò",
  "description": "không thích mô tả",
  "hierarchyPath": "Quần áo/Quần bò",
  "hierarchyPathById": "1/4"
}
```

### Xem danh mục

#### Xem 1 danh mục dựa vào id

- Đường dẫn truy cập `https://localhost:8000/api/categories/{id}`.

- Phương thức: GET.

Ví dụ:

- Đường dẫn: `https://localhost:8000/api/categories/4`.

- Kết quả:

```json
{
  "id": 4,
  "name": "Quần bò",
  "description": "không thích mô tả",
  "hierarchyPath": "Quần áo/Quần bò",
  "hierarchyPathById": "1/4"
}
```

#### Xem tất cả danh mục

- Đường dẫn truy cập `https://localhost:8000/api/categories`.

- Phương thức: GET.

- Kết quả:

```json
[
  {
    "id": 1,
    "name": "Quần áo",
    "description": "",
    "hierarchyPath": "Quần áo",
    "hierarchyPathById": "1"
  },
  {
    "id": 2,
    "name": "meo meo",
    "description": "",
    "hierarchyPath": "meo meo",
    "hierarchyPathById": "2"
  },
  {
    "id": 3,
    "name": "thực phẩm",
    "description": "không",
    "hierarchyPath": "thực phẩm",
    "hierarchyPathById": "3"
  },
  {
    "id": 4,
    "name": "Quần bò",
    "description": "không thích mô tả",
    "hierarchyPath": "Quần áo/Quần bò",
    "hierarchyPathById": "1/4"
  }
]
```

### Cập nhật danh mục

- Đường dẫn truy cập `https://localhost:8000/api/categories/{id}`.

- Phương thức: PUT.

Ví dụ:

- Đường dẫn: `https://localhost:8000/api/categories/4`.

- Body:

```json
{
  "name": "cập nhật",
  "description": "mô tả linh tinh",
  "parent": "2"
}
```

- Kết quả:

```json
{
  "id": 4,
  "name": "cập nhật",
  "description": "mô tả linh tinh",
  "hierarchyPath": "Quần áo/cập nhật",
  "hierarchyPathById": "1/4"
}
```

### Lấy các danh mục con từ danh mục cha

- Đường dẫn truy cập `https://localhost:8000/api/categories/{id danh mục cha}/subcategories`.

- Phương thức: GET.

Ví dụ:

- Đường dẫn: `https://localhost:8000/api/categories/1/subcategories`.

- Kết quả:

```json
[
  {
    "id": 4,
    "name": "cập nhật",
    "description": "mô tả linh tinh",
    "hierarchyPath": "Quần áo/cập nhật",
    "hierarchyPathById": "1/4"
  }
]
```

- có vẻ như cái danh mục cha không được sửa nhỉ. để tí sửa

### Xóa danh mục

- Đường dẫn truy cập `https://localhost:8000/api/categories/{id danh mục}`.

- Phương thức: DELETE.

Ví dụ:

- Đường dẫn: `https://localhost:8000/api/categories/4`.

- Kết quả:

```json
{
  "message": "Category deleted"
}
```

## Cart

### Create Cart Item

- Đường dẫn truy cập `https://localhost:8000/api/cart`.

- Phương thức: POST.

Ví dụ:

- Body:

```json
{
  "quantity": 20,
  "productOptionId": 1
}
```

- Kết quả:

```json
{
    "id": 7,
    "quantity": 20,
    "stock": 12345,
    "price": 500000,
    "createdAt": "2025-01-09 15:33:47",
    "userId": 1,
    "productId": 3,
    "attributes": {
        "size": "38",
        "màu sắc": "xanh",
        "cỡ dây": "26 AWG 1 mét"
    }
}
```

### Xem sản phẩm trong giỏ hàng

#### Xem một sản phẩm

- Đường dẫn truy cập `https://localhost:8000/api/cart/{id sản phẩm}`.

- Phương thức: GET.

Ví dụ:

- Đường dẫn: `https://localhost:8000/api/cart/1`.

- Kết quả:

```json
{
    "id": 1,
    "quantity": 15,
    "stock": 4,
    "price": 3,
    "createdAt": "2025-01-04 09:46:35",
    "userId": 1,
    "productId": 11,
    "attributes": []
}
```

#### Xem tất cả sản phẩm trong giỏ hàng

- Đường dẫn truy cập `https://localhost:8000/api/cart`.

- Phương thức: GET.

- Kết quả:

```json
[
    {
        "id": 6,
        "quantity": 20,
        "stock": 12345,
        "price": 500000,
        "createdAt": "2025-01-09 15:33:47",
        "userId": 1,
        "productId": 3,
        "attributes": {
            "size": "38",
            "màu sắc": "xanh",
            "cỡ dây": "26 AWG 1 mét"
        }
    },
    {
        "id": 7,
        "quantity": 20,
        "stock": 12345,
        "price": 500000,
        "createdAt": "2025-01-09 15:33:47",
        "userId": 1,
        "productId": 3,
        "attributes": {
            "size": "38",
            "màu sắc": "xanh",
            "cỡ dây": "26 AWG 1 mét"
        }
    },
    {
        "id": 3,
        "quantity": 5,
        "stock": 1235,
        "price": 600000,
        "createdAt": "2025-01-05 07:26:08",
        "userId": 1,
        "productId": 3,
        "attributes": {
            "size": "38",
            "màu sắc": "xanh",
            "cỡ dây": "vừa"
        }
    },
    {
        "id": 1,
        "quantity": 15,
        "stock": 4,
        "price": 3,
        "createdAt": "2025-01-04 09:46:35",
        "userId": 1,
        "productId": 11,
        "attributes": []
    }
]
```

#### Xem tất cả sản phẩm trong giỏ hàng của mọi user

- Đường dẫn truy cập `https://localhost:8000/api/cart/all?page=2&limit=3`.

- Phương thức: GET.

- Kết quả:

```json
[
    {
        "id": 9,
        "quantity": 2,
        "stock": 4,
        "price": 3,
        "createdAt": "2025-01-10 18:43:16",
        "userId": 1,
        "productId": 54,
        "attributes": []
    },
    {
        "id": 8,
        "quantity": 4,
        "stock": 4,
        "price": 3,
        "createdAt": "2025-01-10 18:43:16",
        "userId": 1,
        "productId": 54,
        "attributes": []
    },
    {
        "id": 6,
        "quantity": 20,
        "stock": 12345,
        "price": 500000,
        "createdAt": "2025-01-09 15:33:47",
        "userId": 1,
        "productId": 3,
        "attributes": {
            "size": "38",
            "màu sắc": "xanh",
            "cỡ dây": "26 AWG 1 mét"
        }
    }
]
```

### Cập nhật sản phẩm trong giỏ hàng

- Đường dẫn truy cập `https://localhost:8000/api/cart/{id sản phẩm}`.

- Phương thức: PUT.

Ví dụ:

- Đường dẫn: `https://localhost:8000/api/cart/1`.

- Body:

```json
{
  "quantity": 15
}
```

- Kết quả:

```json
{
    "id": 1,
    "quantity": 15,
    "stock": 4,
    "price": 3,
    "createdAt": "2025-01-04 09:46:35",
    "userId": 1,
    "productId": 11,
    "attributes": []
}
```

### Xóa sản phẩm khỏi giỏ hàng

- Đường dẫn truy cập `https://localhost:8000/api/cart/{id sản phẩm}`.

- Phương thức: DELETE.

Ví dụ:

- Đường dẫn: `https://localhost:8000/api/cart/2`.

- Kết quả:

```json
{
  "message": "Cart item deleted"
}
```

## Order

### Create Order

- Đường dẫn truy cập `https://localhost:8000/api/orders`.

- Phương thức: POST.

Ví dụ:

- Body:

```json
{
  "paymentMethod": "COD",
  "shipCouponId": 1,
  "productCouponId": 1,
  "address": "Nhà ông Nguyễn Xuân A",
  "cart": [
    4,
    5
  ]
}
```

- Kết quả:

```json
{
  "id": 2,
  "userId": 1,
  "totalAmount": 0,
  "address": "Nhà ông Nguyễn Xuân A",
  "paymentMethod": "COD",
  "shippingStatus": "Đơn hàng đã được tạo",
  "paymentStatus": false,
  "shippingFee": 0,
  "productDiscount": 0,
  "shipDiscount": 0,
  "products": [
    [
      3,
      "áo",
      25,
      4,
      null
    ],
    [
      4,
      "quần 1",
      23,
      5,
      null
    ]
  ],
  "createdAt": {
    "date": "2025-01-05 12:29:18.365422",
    "timezone_type": 3,
    "timezone": "Europe/Berlin"
  },
  "updatedAt": {
    "date": "2025-01-05 12:29:18.365425",
    "timezone_type": 3,
    "timezone": "Europe/Berlin"
  }
}
```

### Xem Order

#### Xem tất cả đơn hàng (admin)

- Đường dẫn truy cập: `https://127.0.0.1:8000/api/orders/all?page=1&limit=2`.

- Phương thức: GET.

- Kết quả:

```json
[
    {
        "id": 2,
        "userId": 1,
        "totalAmount": 0,
        "address": "Nhà ông Nguyễn Văn B",
        "paymentMethod": "COD",
        "shippingStatus": "Đơn hàng đã được tạo",
        "paymentStatus": false,
        "shippingFee": 0,
        "productDiscount": 0,
        "shipDiscount": 0,
        "products": [],
        "createdAt": {
            "date": "2025-01-05 12:29:18.000000",
            "timezone_type": 3,
            "timezone": "Europe/Berlin"
        },
        "updatedAt": {
            "date": "2025-01-05 12:40:46.000000",
            "timezone_type": 3,
            "timezone": "Europe/Berlin"
        }
    },
    {
        "id": 1,
        "userId": 1,
        "totalAmount": 46,
        "address": "Nhà Ông nguyễn Văn A",
        "paymentMethod": "COD",
        "shippingStatus": "Đơn hàng đã được tạo",
        "paymentStatus": false,
        "shippingFee": 0,
        "productDiscount": 0,
        "shipDiscount": 0,
        "products": [
            [
                1,
                "áo",
                23,
                1,
                null
            ],
            [
                2,
                "quần 1",
                23,
                1,
                null
            ]
        ],
        "createdAt": {
            "date": "2025-01-05 12:28:37.000000",
            "timezone_type": 3,
            "timezone": "Europe/Berlin"
        },
        "updatedAt": {
            "date": "2025-01-05 12:51:53.000000",
            "timezone_type": 3,
            "timezone": "Europe/Berlin"
        }
    }
]
```

#### Xem tất cả đơn hàng của mình

- Đường dẫn truy cập: `https://localhost:8000/api/orders`.

- Phương thức: GET.

- Kết quả:

```json
[
  {
    "id": 1,
    "userId": 1,
    "totalAmount": 46,
    "address": "êr",
    "paymentMethod": "COD",
    "shippingStatus": "Đơn hàng đã được tạo",
    "paymentStatus": false,
    "shippingFee": 0,
    "productDiscount": 0,
    "shipDiscount": 0,
    "products": [
    [
      1,
      "áo",
      23,
      1,
      null
    ],
    [
      2,
      "quần 1",
      23,
      1,
      null
    ]
  ],
    "createdAt": {
      "date": "2025-01-05 12:28:37.000000",
      "timezone_type": 3,
      "timezone": "Europe/Berlin"
    },
    "updatedAt": {
      "date": "2025-01-05 12:28:37.000000",
      "timezone_type": 3,
      "timezone": "Europe/Berlin"
    }
  },
  {
    "id": 2,
    "userId": 1,
    "totalAmount": 0,
    "address": "Nhà ông Nguyễn Xuân A",
    "paymentMethod": "COD",
    "shippingStatus": "Đơn hàng đã được tạo",
    "paymentStatus": false,
    "shippingFee": 0,
    "productDiscount": 0,
    "shipDiscount": 0,
    "products": [
    [
      3,
      "áo",
      25,
      4,
      null
    ],
    [
      4,
      "quần 1",
      23,
      5,
      null
    ]
  ],
    "createdAt": {
      "date": "2025-01-05 12:29:18.000000",
      "timezone_type": 3,
      "timezone": "Europe/Berlin"
    },
    "updatedAt": {
      "date": "2025-01-05 12:29:18.000000",
      "timezone_type": 3,
      "timezone": "Europe/Berlin"
    }
  }
]
```

#### Xem một đơn hàng

- Đường truy cập: `https://localhost:8000/api/orders/{id đơn hàng}`.

- Phương thức: GET.

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/orders/1`.

- Kết quả:

```json
{
  "id": 1,
  "userId": 1,
  "totalAmount": 46,
  "address": "êr",
  "paymentMethod": "COD",
  "shippingStatus": "Đơn hàng đã được tạo",
  "paymentStatus": false,
  "shippingFee": 0,
  "productDiscount": 0,
  "shipDiscount": 0,
  "products": [
    [
      1,
      "áo",
      23,
      1,
      null
    ],
    [
      2,
      "quần 1",
      23,
      1,
      null
    ]
  ],
  "createdAt": {
    "date": "2025-01-05 12:28:37.000000",
    "timezone_type": 3,
    "timezone": "Europe/Berlin"
  },
  "updatedAt": {
    "date": "2025-01-05 12:28:37.000000",
    "timezone_type": 3,
    "timezone": "Europe/Berlin"
  }
}
```

### Sửa Order

- Đường truy cập: `https://localhost:8000/api/orders/{id đơn hàng}`.

- Phương thức: PUT.

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/orders/2`.

- Body:

```json
{
  "address": "Nhà ông Nguyễn Văn B"
}
```

- Kết quả:

```json
{
  "id": 2,
  "userId": 1,
  "totalAmount": 0,
  "address": "Nhà ông Nguyễn Văn B",
  "paymentMethod": "COD",
  "shippingStatus": "Đơn hàng đã được tạo",
  "paymentStatus": false,
  "shippingFee": 0,
  "productDiscount": 0,
  "shipDiscount": 0,
  "createdAt": {
    "date": "2025-01-05 12:29:18.000000",
    "timezone_type": 3,
    "timezone": "Europe/Berlin"
  },
  "updatedAt": {
    "date": "2025-01-05 12:40:46.508928",
    "timezone_type": 3,
    "timezone": "Europe/Berlin"
  }
}
```

### Trả hàng, hoàn tiền

```json
???
```

## OrderDetail

### Xem OrderDetail

- Đường truy cập: `https://localhost:8000/api/order-details`.

- Phương thức: GET.

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/order-details/2`.

- Kết quả:

```json
{
  "id": 2,
  "name": "quần 1",
  "orderId": 1,
  "quantity": 1,
  "productId": 21,
  "price": 23,
  "url": null,
  "attribute": null
}
```

## Group

### Tạo nhóm

- Đường truy cập: `https://localhost:8000/api/group`.

- Phương thức: POST.

Ví dụ:

- Body:

```json
{
    "name": "admin",
    "description": "đây là nhóm tạo ra để phân quyền admin cho dễ"
}
```

- Kết quả:

```json
{
    "id": 1,
    "name": "admin",
    "description": "đây là nhóm tạo ra để phân quyền admin cho dễ"
}
```

### Xem nhóm

#### Xem từng nhóm

- Đường truy cập: `https://localhost:8000/api/group/{id nhóm}`.

- Phương thức: GET.

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/group/1`.

- Kết quả:

```json
{
    "id": 1,
    "name": "admin",
    "description": "đây là nhóm tạo ra để phân quyền admin cho dễ"
}
```

#### Xem tất cả nhóm

- Đường truy cập: `https://localhost:8000/api/group?page=1&limit=2`.

- Phương thức: GET.

- Kết quả:

```json
[
    {
        "id": 1,
        "name": "admin",
        "description": "đây là nhóm tạo ra để phân quyền admin cho dễ"
    },
    {
        "id": 3,
        "name": "hello hello",
        "description": "nhóm abc, xyz"
    },
    {
        "id": 5,
        "name": "mao mao",
        "description": "nhóm abc, xyz"
    }
]
```

### Cập nhật nhóm

- Đường truy cập: `https://localhost:8000/api/group/{id nhóm}`.

- Phương thức: PUT.

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/group/2`.

- Body:

```json
{
    "name": "đổi nhá",
    "description": "sửa mô tả nhá"
}
```

- Kết quả:

```json
{
    "id": 2,
    "name": "đổi nhá",
    "description": "sửa mô tả nhá"
}
```

### Xóa nhóm

- Đường truy cập: `https://localhost:8000/api/group/{id nhóm}`.

- Phương thức: DELETE.

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/group/2`.

- Kết quả:

```json
{
    "message": "Group deleted"
}
```

## Group Member

### Thêm thành viên vào nhóm

- Đường truy cập: `https://localhost:8000/api/group-member/add`.

- Phương thức: POST.

Ví dụ:

- Body:

```json
{
    "groupId": 5,
    "userId": 1
}
```

- Kết quả:

```json
{
  "message": "User added to group successfully",
  "group_member": {
    "user": {
      "id": 1,
      "username": "superadmin",
      "email": "superadmin@scime.vn",
      "phone": null,
      "address": null
    },
    "group": {
      "id": 5,
      "name": "mao mao",
      "description": "nhóm abc, xyz"
    }
  }
}
```

### Lấy tất cả các nhóm mà người dùng thuộc về

- Đường truy cập: `https://localhost:8000/api/group-member/{id người dùng}/groups`.

- Phương thức: GET.

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/group-member/user_1/groups`.

- Kết quả:

```json
[
    {
        "id": 1,
        "name": "admin",
        "description": "đây là nhóm tạo ra để phân quyền admin cho dễ"
    },
    {
        "id": 3,
        "name": "hello hello",
        "description": "nhóm abc, xyz"
    },
    {
        "id": 5,
        "name": "mao mao",
        "description": "nhóm abc, xyz"
    }
]
```

### Lấy tất cả các nhóm mà người dùng hiện tại thuộc về

- Đường truy cập: `https://localhost:8000/api/group-member/user/groups`.

- Phương thức: GET.

- Lưu ý là phải đăng nhập.

Ví dụ:

- Kết quả:

```json
[
    {
        "id": 1,
        "name": "admin",
        "description": "đây là nhóm tạo ra để phân quyền admin cho dễ"
    },
    {
        "id": 3,
        "name": "hello hello",
        "description": "nhóm abc, xyz"
    },
    {
        "id": 5,
        "name": "mao mao",
        "description": "nhóm abc, xyz"
    }
]
```

### Lấy tất cả người dùng thuộc một nhóm

- Đường truy cập: `https://localhost:8000/api/group-member/group_{id}/users`.

- Phương thức: GET.

Ví dụ:

- Đường dẫn: `https://localhost:8000/api/group-member/group_1/users`.

- Kết quả:

```json
[
    {
        "id": 1,
        "username": "superadmin",
        "email": "superadmin@scime.vn",
        "phone": null,
        "address": null
    }
]
```

### Xóa thành viên khỏi nhóm

- Đường truy cập: `https://localhost:8000/api/group-member/remove`.

- Phương thức: POST.

Ví dụ:

- Body:

```json
{
    "userId": 1,
    "groupId": 1
}
```

- Kết quả:

```json
{
    "message": "User removed from group successfully"
}
```

### Kiểm tra người dùng có thuộc nhóm không

- Đường truy cập: `https://localhost:8000/api/group-member/check`.

- Phương thức: POST.

Ví dụ:

- Body:

```json
{
    "groupId": 5,
    "userId": 1
}
```

- Kết quả:

```json
{
    "is_in_group": true
}
```

## Wishlist

### Thêm sản phẩm vào wishlist

- Đường truy cập: `https://localhost:8000/api/wishlist`.

- Phương thức: POST.

Ví dụ:

- Body:

```json
{
    "userId": 1,
    "productId": 1
}
```

- Kết quả:

```json
{
  "id": 2,
  "userId": 1,
  "productId": 1,
  "createdAt": "2025-01-07 08:50:55"
}
```

### Xem wishlist

#### Xem tất cả wishlist

- Đường truy cập: `https://localhost:8000/api/wishlists/all`.

- Phương thức: GET.

Ví dụ:

- Kết quả:

```json
[
  {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "createdAt": "2025-01-07 08:49:38"
  },
  {
    "id": 2,
    "userId": 1,
    "productId": 1,
    "createdAt": "2025-01-07 08:50:55"
  }
]
```

#### Xem wishlist theo id

- Đường truy cập: `https://localhost:8000/api/wishlist/{id wishlist}`.

- Phương thức: GET.

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/wishlist/1`.

- Kết quả:

```json
{
  "id": 1,
  "userId": 1,
  "productId": 1,
  "createdAt": "2025-01-07 08:49:38"
}
```

#### Xem danh sách wishlist của người dùng hiện tại

- Đường truy cập: `https://localhost:8000/api/user/wishlists`.

- Phương thức: GET.

- Lưu ý: phải đăng nhập.

Ví dụ:

- Kết quả:

```json
{
  "id": 1,
  "userId": 1,
  "productId": 1,
  "createdAt": "2025-01-07 08:49:38"
}
```

### Xóa sản phẩm khỏi wishlist

- Đường truy cập: `https://localhost:8000/api/wishlist/{id wishlist}`.

- Phương thức: DELETE.

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/wishlist/1`.

- Kết quả:

```json
{
  "message": "Wishlist item deleted"
}
```

## Quyền

### Xem các quyền

- Đường truy cập: `https://localhost:8000/api/permission`.

- Phương thức: GET.

- Lưu ý: Người dùng phải có quyền: "xem quyền".

- Kết quả:

```json
[
    "view_users",
    "view_user_details",
    "create_user",
    "edit_user",
    "delete_user",
    "activate_deactivate_user",
    "manage_user_permissions",
    "view_groups",
    "view_group_details",
    "create_group",
    "edit_group",
    "delete_group",
    "manage_group_members",
    "manage_group_permissions",
    "create_permission",
    "edit_permission",
    "delete_permission",
    "view_products",
    "view_product_details",
    "create_product",
    "edit_product",
    "delete_product",
    "manage_featured_products",
    "manage_product_stock",
    "view_categories",
    "create_category",
    "edit_category",
    "delete_category",
    "create_cart",
    "view_carts",
    "edit_carts",
    "delete_carts",
    "view_wishlists",
    "edit_wishlists",
    "delete_wishlists",
    "view_coupons",
    "create_coupon",
    "edit_coupon",
    "delete_coupon",
    "activate_deactivate_coupon",
    "view_orders",
    "view_order_details",
    "update_shipping_status",
    "update_payment_status",
    "delete_order",
    "view_reviews",
    "approve_disapprove_review",
    "delete_review",
    "access_admin_dashboard",
    "manage_system_settings",
    "view_system_logs",
    "view_permissions"
]
```

## Quyền người dùng

### Cấp quyền cho người dùng

- Đường truy cập: `https://localhost:8000/api/user-permissions`.

- Phương thức: POST.

Ví dụ:

- Body:

```json
{
    "user_id": 4,
    "permissions": {
        "edit_user": {
            "is_active": true,
            "is_denied": false,
            "target": 3
        },
        "create_category": {
            "is_active": false,
            "is_denied": false,
            "target": 3
        },
        "edit_product": {
            "is_active": true,
            "is_denied": false,
            "target": "all"
        }
        
    }
}
```

- Kết quả:

```json
[
    {
        "permission": "edit_user",
        "status": "assigned"
    },
    {
        "permission": "create_category",
        "status": "assigned"
    },
    {
        "permission": "edit_product",
        "status": "assigned"
    }
]
```

### Cập nhật quyền cho người dùng

- Đường truy cập: `https://localhost:8000/api/user-permissions`.

- Phương thức: PUT.

Ví dụ:

- Body:

```json
{
    "user_id": 4,
    "permissions": {
        "edit_user": {
            "is_active": true,
            "is_denied": true,
            "target": 3
        },
        "create_category": {
            "is_active": false,
            "is_denied": false,
            "target": 3
        },
        "edit_product": {
            "is_active": false,
            "is_denied": true,
            "target": "all"
        }
    }
}
```

- Kết quả:

```json
[
    {
        "permission": "edit_user",
        "status": "updated"
    },
    {
        "permission": "create_category",
        "status": "updated"
    },
    {
        "permission": "edit_product",
        "status": "updated"
    }
]
```

### Xem các quyền của người dùng

- Đường truy cập: `https://localhost:8000/api/user-permissions/{id người dùng}`.

- Phương thức: GET.

- Lưu ý: Người dùng phải có quyền: "xem quyền".

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/user-permissions/1`.

- Kết quả:

```json
[
    "view_users",
    "view_user_details",
    "create_user",
    "edit_user",
    "delete_user",
    "activate_deactivate_user",
    "manage_user_permissions",
    "view_groups",
    "view_group_details",
    "create_group",
    "edit_group",
    "delete_group",
    "manage_group_members",
    "manage_group_permissions",
    "create_permission",
    "edit_permission",
    "delete_permission",
    "view_products",
    "view_product_details",
    "create_product",
    "edit_product",
    "delete_product",
    "manage_featured_products",
    "manage_product_stock",
    "view_categories",
    "create_category",
    "edit_category",
    "delete_category",
    "create_cart",
    "view_carts",
    "edit_carts",
    "delete_carts",
    "view_wishlists",
    "edit_wishlists",
    "delete_wishlists",
    "view_coupons",
    "create_coupon",
    "edit_coupon",
    "delete_coupon",
    "activate_deactivate_coupon",
    "view_orders",
    "view_order_details",
    "update_shipping_status",
    "update_payment_status",
    "delete_order",
    "view_reviews",
    "approve_disapprove_review",
    "delete_review",
    "access_admin_dashboard",
    "manage_system_settings",
    "view_system_logs",
    "view_permissions"
]
```

### Thu hồi quyền người dùng

- Đường truy cập: `https://localhost:8000/api/user-permissions`.

- Phương thức: DELDETE.

- Lưu ý: Người dùng phải có quyền: "xóa quyền người dùng".

Ví dụ:

- Body:

```json
{
    "user_id": 4,
    "permissions": [
        "edit_user",
        "create_category",
        "edit_product"
    ]
}
```

- Kết quả:

```json
{
    "message":"Permissions deleted successfully."
}
```

## Quyền nhóm

### Cấp quyền cho nhóm

- Đường truy cập: `https://localhost:8000/api/group-permissions`.

- Phương thức: POST.

Ví dụ:

- Body:

```json
{
    "group_id": 3,
    "permissions": {
        "edit_user": {
            "is_active": true,
            "is_denied": false,
            "target": 3
        },
        "create_category": {
            "is_active": false,
            "is_denied": false,
            "target": 3
        },
        "edit_product": {
            "is_active": true,
            "is_denied": false,
            "target": "all"
        }
        
    }
}
```

- Kết quả:

```json
[
    {
        "permission": "edit_user",
        "status": "assigned"
    },
    {
        "permission": "create_category",
        "status": "assigned"
    },
    {
        "permission": "edit_product",
        "status": "assigned"
    }
]
```

### Cập nhật quyền cho nhóm

- Đường truy cập: `https://localhost:8000/api/group-permissions`.

- Phương thức: PUT.

Ví dụ:

- Body:

```json
{
    "group_id": 3,
    "permissions": {
        "edit_user": {
            "is_active": true,
            "is_denied": true,
            "target": 3
        },
        "create_category": {
            "is_active": false,
            "is_denied": false,
            "target": 3
        },
        "edit_product": {
            "is_active": false,
            "is_denied": true,
            "target": "all"
        }
    }
}
```

- Kết quả:

```json
[
    {
        "permission": "edit_user",
        "status": "updated"
    },
    {
        "permission": "create_category",
        "status": "updated"
    },
    {
        "permission": "edit_product",
        "status": "updated"
    }
]
```

### Xem các quyền của nhóm

- Đường truy cập: `https://localhost:8000/api/group-permissions/{id nhóm}`.

- Phương thức: GET.

- Lưu ý: Nhóm phải có quyền: "xem quyền".

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/group-permissions/3`.

- Kết quả:

```json
[
    "edit_user",
    "create_category",
    "edit_product"
]
```


### Thu hồi quyền nhóm

- Đường truy cập: `https://localhost:8000/api/user-permissions`.

- Phương thức: DELDETE.

- Lưu ý: Nhóm phải có quyền: "xóa quyền người dùng".

Ví dụ:

- Body:

```json
{
    "group_id": 3,
    "permissions": [
        "edit_user",
        "create_category",
        "edit_product"
    ]
}
```

- Kết quả:

```json
{
    "message":"Permissions deleted successfully."
}
```

## Tìm kiếm sản phẩm

- Đường truy cập: `https://localhost:8000/api/search/products`.

- Phương thức: GET.

- Bạn cần truyền các tham số vào.

Ví dụ:

- Đường truy cập: `https://localhost:8000/api/search/products?keywords=xiaomi`.

kết quả:

```json
{
    "status": "success",
    "data": [
        {
            "product": {
                "id": 2,
                "name": "xiaomi redme note 4",
                "locationAddress": "Hà Đông/Hà Nội/Việt Nam",
                "categoryId": null,
                "description": "có thể không gửi trường này và attribute. nếu không gửi description thì nó là null, nếu không gửi attribute thì không có bản ghi được tạo ra",
                "price": null,
                "stock": 0,
                "attribute": {
                    "màu sắc": [
                        "đen",
                        "đỏ",
                        "vàng",
                        "xanh"
                    ],
                    "size": [
                        "40",
                        "41",
                        "42",
                        "43"
                    ],
                    "cỡ dây": [
                        "26 AWG 1 mét",
                        "22 AWG 1 mét",
                        "abc",
                        "xyz"
                    ]
                },
                "discountPercentage": 0
            },
            "relevanceScore": 5
        },
        {
            "product": {
                "id": 3,
                "name": "xiaomi redme note 4",
                "locationAddress": "Hà Đông/Hà Nội/Việt Nam",
                "categoryId": null,
                "description": "có thể không gửi trường này và attribute. nếu không gửi description thì nó là null, nếu không gửi attribute thì không có bản ghi được tạo ra",
                "price": 50000,
                "stock": 29625,
                "attribute": {
                    "màu sắc": [
                        "đen",
                        "đỏ",
                        "vàng",
                        "xanh"
                    ],
                    "size": [
                        "40",
                        "41",
                        "42",
                        "43",
                        "38",
                        "39"
                    ],
                    "cỡ dây": [
                        "26 AWG 1 mét",
                        "22 AWG 1 mét",
                        "abc",
                        "xyz",
                        "nhỏ",
                        "vừa",
                        "to khủng bố"
                    ]
                },
                "discountPercentage": 0
            },
            "relevanceScore": 5
        },
        {
            "product": {
                "id": 4,
                "name": "xiaomi redme note 4",
                "locationAddress": "Hà Đông/Hà Nội/Việt Nam",
                "categoryId": null,
                "description": "có thể không gửi trường này và attribute. nếu không gửi description thì nó là null, nếu không gửi attribute thì không có bản ghi được tạo ra",
                "price": null,
                "stock": 0,
                "attribute": {
                    "màu sắc": [
                        "đen",
                        "đỏ",
                        "vàng",
                        "xanh"
                    ],
                    "size": [
                        "40",
                        "41",
                        "42",
                        "43"
                    ],
                    "cỡ dây": [
                        "26 AWG 1 mét",
                        "22 AWG 1 mét",
                        "abc",
                        "xyz"
                    ]
                },
                "discountPercentage": 0
            },
            "relevanceScore": 5
        },
        {
            "product": {
                "id": 5,
                "name": "xiaomi redme note 4",
                "locationAddress": "Hà Đông/Hà Nội/Việt Nam",
                "categoryId": null,
                "description": "có thể không gửi trường này và attribute. nếu không gửi description thì nó là null, nếu không gửi attribute thì không có bản ghi được tạo ra",
                "price": null,
                "stock": 0,
                "attribute": {
                    "màu sắc": [
                        "đen",
                        "đỏ",
                        "vàng",
                        "xanh"
                    ],
                    "size": [
                        "40",
                        "41",
                        "42",
                        "43"
                    ],
                    "cỡ dây": [
                        "26 AWG 1 mét",
                        "22 AWG 1 mét",
                        "abc",
                        "xyz"
                    ]
                },
                "discountPercentage": 0
            },
            "relevanceScore": 5
        },
        {
            "product": {
                "id": 6,
                "name": "xiaomi redme note 4",
                "locationAddress": "Hà Đông/Hà Nội/Việt Nam",
                "categoryId": null,
                "description": "có thể không gửi trường này và attribute. nếu không gửi description thì nó là null, nếu không gửi attribute thì không có bản ghi được tạo ra",
                "price": null,
                "stock": 0,
                "attribute": {
                    "màu sắc": [
                        "đen",
                        "đỏ",
                        "vàng",
                        "xanh"
                    ],
                    "size": [
                        "40",
                        "41",
                        "42",
                        "43"
                    ],
                    "cỡ dây": [
                        "26 AWG 1 mét",
                        "22 AWG 1 mét",
                        "abc",
                        "xyz"
                    ]
                },
                "discountPercentage": 0
            },
            "relevanceScore": 5
        },
        {
            "product": {
                "id": 7,
                "name": "xiaomi redme note 4",
                "locationAddress": "Hà Đông/Hà Nội/Việt Nam",
                "categoryId": null,
                "description": "có thể không gửi trường này và attribute. nếu không gửi description thì nó là null, nếu không gửi attribute thì không có bản ghi được tạo ra",
                "price": null,
                "stock": 0,
                "attribute": {
                    "màu sắc": [
                        "đen",
                        "đỏ",
                        "vàng",
                        "xanh"
                    ],
                    "size": [
                        "40",
                        "41",
                        "42",
                        "43"
                    ],
                    "cỡ dây": [
                        "26 AWG 1 mét",
                        "22 AWG 1 mét",
                        "abc",
                        "xyz"
                    ]
                },
                "discountPercentage": 0
            },
            "relevanceScore": 5
        }
    ],
    "pagination": {
        "total": 6,
        "page": 1,
        "limit": 10
    }
}
```

- Đường truy cập: `https://localhost:8000/api/search/products?keywords=xiao&minPrice=500&maxPrice=100000&page=2&limit=5`.

kết quả:

```json
{
    "status": "success",
    "data": [
        {
            "product": {
                "id": 7,
                "name": "xiaomi redme note 4",
                "locationAddress": "Hà Đông/Hà Nội/Việt Nam",
                "categoryId": null,
                "description": "có thể không gửi trường này và attribute. nếu không gửi description thì nó là null, nếu không gửi attribute thì không có bản ghi được tạo ra",
                "price": null,
                "stock": 0,
                "attribute": {
                    "màu sắc": [
                        "đen",
                        "đỏ",
                        "vàng",
                        "xanh"
                    ],
                    "size": [
                        "40",
                        "41",
                        "42",
                        "43"
                    ],
                    "cỡ dây": [
                        "26 AWG 1 mét",
                        "22 AWG 1 mét",
                        "abc",
                        "xyz"
                    ]
                },
                "discountPercentage": 0
            },
            "relevanceScore": 5
        }
    ],
    "pagination": {
        "total": 6,
        "page": 2,
        "limit": 5
    }
}
```

- sản phẩm phải cho giá vào nhé, tôi đang code nếu giá là null vẫn trả về

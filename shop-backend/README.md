# Shop backend

API cho website bán hàng. Frontend React nằm trong repository [Sugu-bit/Website](https://github.com/Sugu-bit/Website).

## Yêu cầu

- PHP 8.2 trở lên, bật extension `pdo_pgsql`, `ctype` và `iconv`
- Composer
- PostgreSQL 17 (hoặc phiên bản tương thích)
- Node.js và npm nếu muốn chạy cả website

## Chạy backend trên Windows

### 1. Cài dependency

Mở PowerShell tại thư mục backend:

```powershell
composer install
```

### 2. Cấu hình PostgreSQL

Tạo database `shop`, sau đó cấu hình kết nối trong file `.env.local` ở thư mục backend. Dùng thông tin PostgreSQL của máy bạn:

```dotenv
APP_ENV=dev
APP_DEBUG=1
DATABASE_URL="postgresql://<user>:<password>@127.0.0.1:5432/shop?serverVersion=17.2&charset=utf8"
CORS_ALLOW_ORIGIN='^https?://localhost(:[0-9]+)?$'
```

Thay `<user>`, `<password>` và cổng `5432` bằng cấu hình PostgreSQL của bạn. Không commit thông tin kết nối hoặc bí mật cá nhân.

Dump `web.sql` chứa schema và dữ liệu PostgreSQL đã xuất sẵn. Sau khi tạo database, có thể nạp dump bằng:

```powershell
psql -U your_user -d shop -f .\web.sql
```

Dump có các lệnh gán owner theo cấu hình PostgreSQL của môi trường đã xuất dữ liệu. Nếu restore báo role không tồn tại, hãy tạo role phù hợp hoặc điều chỉnh owner trong dump cho PostgreSQL cục bộ. Nếu bạn không dùng dump, hãy tạo schema theo entity và cấu hình Doctrine Migrations trước khi chạy API.

### 3. Khởi tạo người dùng và quyền (khi cần)

Với database mới chưa có người dùng, chạy:

```powershell
php bin/console app:setup-initial
```

Lệnh sẽ yêu cầu nhập mật khẩu cho tài khoản `superadmin` và đồng bộ quyền. Nếu database đã có người dùng, không chạy lệnh này trừ khi bạn đã kiểm tra dữ liệu hiện có.

### 4. Chạy API

```powershell
$env:APP_ENV = "dev"
$env:APP_DEBUG = "1"
php -S 127.0.0.1:8000 -t public
```

API chạy tại `http://127.0.0.1:8000`; frontend sử dụng base URL `http://127.0.0.1:8000/api`.

## Chạy toàn bộ website

Mở một terminal khác tại thư mục cha chứa backend, rồi clone frontend cạnh thư mục backend nếu chưa có:

```powershell
cd ..
git clone https://github.com/Sugu-bit/Website.git shop-frontend
cd shop-frontend
```

Trong terminal tại thư mục frontend:

```powershell
npm install
$env:REACT_APP_API_URL = "http://127.0.0.1:8000/api"
npm start
```

Mở [http://localhost:3000](http://localhost:3000). Giữ cả hai terminal (API và frontend) mở trong lúc sử dụng website.

Nếu có file `run-shop.bat` ở thư mục cha chứa cả `shop-backend` và `shop-frontend`, bạn cũng có thể chạy file đó để khởi động hai server. Script không tự khởi động PostgreSQL hoặc tạo/nạp database; hãy hoàn thành cấu hình và khởi tạo database trước.

## Một số lệnh hữu ích

Chạy kiểm tra cấu hình Symfony:

```powershell
php bin/console about
```

Xóa cache môi trường dev:

```powershell
php bin/console cache:clear
```

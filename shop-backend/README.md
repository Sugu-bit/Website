# Shop backend

Symfony API for the BuyP storefront. The frontend is in the parent directory; see the [project setup guide](../README.md).

## Requirements

- PHP 8.2 or newer with `pdo_pgsql`, `ctype`, and `iconv`
- Composer
- PostgreSQL 17 or a compatible version
- Node.js and npm to run the frontend

## Configure and run the API

From this directory, install dependencies:

```powershell
composer install
```

Create `.env.local` in this directory and set local values for `APP_SECRET`, `JWT_SECRET`, `DATABASE_URL`, `CORS_ALLOW_ORIGIN`, `MAILER_DSN`, and `UPLOAD_DIR`. For example:

```dotenv
APP_ENV=dev
APP_DEBUG=1
APP_SECRET=replace-with-a-random-secret
DATABASE_URL="postgresql://<user>:<password>@127.0.0.1:5432/shop?serverVersion=17.2&charset=utf8"
JWT_SECRET=replace-with-another-random-secret
CORS_ALLOW_ORIGIN='^https?://localhost(:[0-9]+)?$'
MAILER_DSN=null://null
UPLOAD_DIR=data
```

Create an empty database named `shop`, then create its tables:

```powershell
php bin/console doctrine:schema:create
```

Optionally seed the sample categories:

```powershell
psql -U your_user -d shop -f .\categories_script.sql
```

The user/order database dump is not part of this repository because it contains private records and authentication tokens. On a new database, you can create an initial administrator with:

```powershell
php bin/console app:setup-initial
```

Start the API:

```powershell
php -S 127.0.0.1:8000 -t public
```

The API is available at `http://127.0.0.1:8000`; the frontend uses `http://127.0.0.1:8000/api`.

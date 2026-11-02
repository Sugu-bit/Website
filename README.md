# BuyP shop

This repository contains the React storefront at its root and the Symfony/PHP API in [`shop-backend/`](./shop-backend/). The database contents and credentials are not included.

## Requirements

- Windows, PowerShell, and Node.js with npm
- PHP 8.2 or newer and Composer
- PostgreSQL 17 or a compatible version

## Run locally

### 1. Configure the backend

Open PowerShell in `shop-backend` and install the PHP dependencies:

```powershell
composer install
```

Create `shop-backend/.env.local` with your local settings. Generate your own secret values; do not commit this file.

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

Create an empty PostgreSQL database named `shop`, then create its tables:

```powershell
php bin/console doctrine:schema:create
```

Optionally add the sample product categories:

```powershell
psql -U your_user -d shop -f .\categories_script.sql
```

The database dump is intentionally not included because it contains user, order, and authentication-token data. To create an initial administrator on a new database, run `php bin/console app:setup-initial` and follow the prompts.

Start the API from the backend folder:

```powershell
php -S 127.0.0.1:8000 -t public
```

### 2. Start the frontend

Open another PowerShell window at the repository root:

```powershell
npm install
$env:REACT_APP_API_URL = "http://127.0.0.1:8000/api"
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Optional: use the Windows launcher

After configuring PostgreSQL and the backend `.env.local`, run `.\run-shop.bat` from the repository root. It starts the API and frontend in separate windows and installs dependencies if needed. It does not create the database or load data.

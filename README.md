# Shop website

This repository contains the React storefront. The Symfony API is a separate project and should be available in a sibling folder named `shop-backend`.

## Requirements

- Windows with PowerShell
- Node.js 22.11.0 or a compatible version, with npm
- PHP 8.2 or newer and Composer
- PostgreSQL 17 or a compatible version

## Run the website

### 1. Prepare the backend

Place the Symfony backend project in a `shop-backend` folder next to this repository. Follow its [setup guide](./shop-backend/README.md) to install PHP dependencies, configure PostgreSQL, and load the database.

The backend API should be available at `http://127.0.0.1:8000`. Keep its terminal open.

### 2. Start the frontend

Open PowerShell in this repository and run:

```powershell
npm install
$env:REACT_APP_API_URL = "http://127.0.0.1:8000/api"
npm start
```

Open [http://localhost:3000](http://localhost:3000). Keep the frontend terminal open while using the website.

### Optional: use the Windows launcher

If `run-shop.bat` is available in the parent folder containing both `shop-frontend` and `shop-backend`, run it to start both servers. The launcher does not start PostgreSQL or create or import the database; complete the backend setup first.

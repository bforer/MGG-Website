# Deployment Guide for xneelo

This guide explains how to deploy the MGG website to xneelo hosting.

## Prerequisites

1. FTP credentials from xneelo
2. Node.js and npm installed
3. All dependencies installed (`npm install`)

## Setup

### 1. Install Dependencies

First, install the deployment dependencies:

```bash
npm install
```

### 2. Configure FTP Credentials

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and add your FTP credentials:

```env
FTP_USER=your_ftp_username
FTP_PASSWORD=your_ftp_password
FTP_HOST=ftp.dev.brandboom.co.za
FTP_PORT=21
```

**Important:** The `.env` file is already in `.gitignore` and will not be
committed to version control.

## Deployment

### Deploy to xneelo

Run the deployment script:

```bash
npm run deploy
```

This will:

1. Build the site (`npm run build`)
2. Upload all files from the `dist/` folder to `/public_html/mgg/` on your
   xneelo server

### Manual Build (if needed)

If you only want to build without deploying:

```bash
npm run build
```

The built files will be in the `dist/` folder.

## Deployment Structure

Files are deployed to:

- **Remote Path:** `/public_html/mgg/`
- **Website URL:** `https://dev.brandboom.co.za/mgg/`

## Troubleshooting

### Connection Issues

- Verify your FTP credentials are correct
- Check that the FTP host is correct (usually `ftp.yourdomain.com` or
  `ftp.dev.brandboom.co.za`)
- Ensure port 21 is not blocked by your firewall
- Try using passive mode (already enabled in the script)

### File Upload Issues

- Check that the `dist/` folder exists after building
- Verify you have write permissions to `/public_html/mgg/` on the server
- Check the FTP user has access to the target directory

### Build Issues

- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: The build will fail if there are critical errors
- Clear the `dist/` folder and rebuild: `rm -rf dist && npm run build`

## Notes

- The deployment script uses `ftp-deploy` package
- Files are uploaded via FTP (not SFTP)
- The script does NOT delete remote files that don't exist locally (safe mode)
- To enable deletion of remote files, change `deleteRemote: false` to `true` in
  `deploy.js`

# Rclone Setup for R2

Rclone is a much more efficient way to upload large numbers of files to R2 compared to using Wrangler.

## Setup

1. **Install rclone** (already done):
   ```bash
   brew install rclone
   ```

2. **Configure R2 credentials**:
   
   Edit `rclone-r2.conf` and add your R2 credentials:
   ```ini
   [r2]
   type = s3
   provider = Cloudflare
   endpoint = https://7127e60f62cb97d6c9127c274489af9a.r2.cloudflarestorage.com
   access_key_id = YOUR_R2_ACCESS_KEY_ID
   secret_access_key = YOUR_R2_SECRET_ACCESS_KEY
   acl = private
   no_check_bucket = true
   ```

   Get your credentials from:
   - Cloudflare Dashboard → R2 → Manage R2 API tokens
   - Create a new API token with read/write permissions

## Testing

Test your configuration:
```bash
./scripts/test-rclone.sh
```

## Uploading Dictionaries

Upload all dictionaries (hw4, ll, sg):
```bash
./scripts/rclone-upload.sh
```

## Rclone Commands

List bucket contents:
```bash
rclone --config rclone-r2.conf ls r2:mawrid-dictionaries/mawridreader/
```

Upload a specific dictionary:
```bash
rclone --config rclone-r2.conf copy data/images/hw4 r2:mawrid-dictionaries/mawridreader/hw4 --progress
```

Sync (upload only new/changed files):
```bash
rclone --config rclone-r2.conf sync data/images/hw4 r2:mawrid-dictionaries/mawridreader/hw4 --progress
```

## Advantages over Wrangler

- **Parallel uploads**: Uploads multiple files simultaneously
- **Resume support**: Can resume interrupted uploads
- **Progress tracking**: Shows detailed progress information
- **Efficiency**: Only uploads new/changed files with sync
- **Speed**: Much faster for bulk operations
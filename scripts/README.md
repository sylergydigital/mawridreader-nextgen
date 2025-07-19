# Scripts

This directory contains utility scripts for managing the Mawrid Reader project.

## R2 Upload Scripts

### Prerequisites

1. Install Wrangler (already in package.json):
   ```bash
   npm install
   ```

2. Authenticate with Cloudflare:
   ```bash
   wrangler login
   ```

3. Configure your Cloudflare account ID:
   ```bash
   wrangler whoami
   # Copy your account ID and update wrangler.toml if needed
   ```

### Available Scripts

#### `test-r2-upload.sh`
Test script to verify R2 configuration by uploading a single file.

```bash
./scripts/test-r2-upload.sh
```

#### `upload-to-r2.js`
Main upload script for bulk uploading dictionary images to R2.

```bash
# Upload only Arabic-English dictionaries (hw4, ll, sg)
node scripts/upload-to-r2.js

# To upload all dictionaries, edit the script and set:
# const DICTIONARIES_TO_UPLOAD = null;
```

### R2 Bucket Structure

After upload, files will be organized as:
```
mawridreader/
├── hw4/          # Hans Wehr 4th edition
│   ├── 100/      # Pages 1-199
│   ├── 200/      # Pages 200-399
│   └── ...
├── ll/           # Lane's Lexicon
└── sg/           # Steingass
```

### Accessing Uploaded Files

Files will be accessible at:
```
https://mawridreader.sylergy.net/mawridreader/[dictionary]/[range]/[page].png
```

Example:
```
https://mawridreader.sylergy.net/mawridreader/hw4/100/14.png
```

### Notes

- The upload script shows progress every 10 files
- Failed uploads are logged but don't stop the process
- You can resume uploads by running the script again
- For large uploads, consider running in a screen/tmux session
#!/bin/bash

# Setup rclone configuration from .env file

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Error: .env file not found"
    exit 1
fi

# Load environment variables from .env
export $(cat .env | grep -v '^#' | xargs)

# Check required variables
if [ -z "$R2_ACCESS_KEY_ID" ] || [ -z "$R2_SECRET_ACCESS_KEY" ]; then
    echo "Error: R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be set in .env"
    exit 1
fi

# Create rclone config
cat > rclone-r2.conf << EOF
[r2]
type = s3
provider = Cloudflare
endpoint = https://7127e60f62cb97d6c9127c274489af9a.r2.cloudflarestorage.com
access_key_id = ${R2_ACCESS_KEY_ID}
secret_access_key = ${R2_SECRET_ACCESS_KEY}
acl = private
no_check_bucket = true
EOF

echo "✓ Created rclone-r2.conf with credentials from .env"

# Test the configuration
echo ""
echo "Testing configuration..."
rclone --config rclone-r2.conf lsd r2:mawrid-dictionaries

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Configuration successful!"
    echo ""
    echo "You can now run:"
    echo "  ./scripts/test-rclone.sh      # Test upload"
    echo "  ./scripts/rclone-upload.sh    # Upload all dictionaries"
else
    echo ""
    echo "✗ Configuration test failed"
    echo "Please check your credentials in .env"
fi
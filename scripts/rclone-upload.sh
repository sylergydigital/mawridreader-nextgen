#!/bin/bash

# Upload dictionaries to R2 using rclone
# This is much faster than uploading one file at a time

CONFIG_FILE="rclone-r2.conf"
BUCKET="mawrid-dictionaries"
R2_PREFIX="mawridreader"
LOCAL_BASE="data/images"

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo "Error: rclone config file not found at $CONFIG_FILE"
    echo "Please create it with your R2 credentials"
    exit 1
fi

# Check if credentials are configured
if ! grep -q "access_key_id" "$CONFIG_FILE"; then
    echo "Error: R2 credentials not configured in $CONFIG_FILE"
    echo "Please add:"
    echo "  access_key_id = YOUR_R2_ACCESS_KEY_ID"
    echo "  secret_access_key = YOUR_R2_SECRET_ACCESS_KEY"
    exit 1
fi

echo "=== Rclone R2 Upload Script ==="
echo "Bucket: $BUCKET"
echo "Prefix: $R2_PREFIX"
echo ""

# Function to upload a dictionary
upload_dictionary() {
    local dict=$1
    echo "=== Uploading $dict ==="
    
    # Count files
    local count=$(find "$LOCAL_BASE/$dict" -type f -name "*.png" | wc -l)
    echo "Files to upload: $count"
    
    # Upload with progress
    rclone --config "$CONFIG_FILE" \
        copy "$LOCAL_BASE/$dict" \
        "r2:$BUCKET/$R2_PREFIX/$dict" \
        --progress \
        --transfers 10 \
        --checkers 10 \
        --no-check-dest \
        --s3-upload-concurrency 10
    
    echo "Completed $dict"
    echo ""
}

# Upload each dictionary
for dict in hw4 ll sg; do
    if [ -d "$LOCAL_BASE/$dict" ]; then
        upload_dictionary "$dict"
    else
        echo "Warning: Dictionary $dict not found at $LOCAL_BASE/$dict"
    fi
done

echo "=== All uploads complete ==="

# Show summary
echo ""
echo "Verifying uploads:"
for dict in hw4 ll sg; do
    count=$(rclone --config "$CONFIG_FILE" ls "r2:$BUCKET/$R2_PREFIX/$dict" | wc -l)
    echo "$dict: $count files uploaded"
done
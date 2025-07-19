#!/bin/bash

# Upload a specific dictionary to R2
# Usage: ./scripts/upload-dictionary.sh [dictionary]
# Example: ./scripts/upload-dictionary.sh hw4

if [ -z "$1" ]; then
    echo "Usage: $0 [dictionary]"
    echo "Example: $0 hw4"
    echo "Available: hw4, ll, sg"
    exit 1
fi

DICT=$1
BUCKET_NAME="mawrid-dictionaries"
R2_PREFIX="mawridreader"
BASE_PATH="data/images"

echo "Uploading $DICT to R2..."

# Check if dictionary exists
if [ ! -d "$BASE_PATH/$DICT" ]; then
    echo "Error: Dictionary $DICT not found at $BASE_PATH/$DICT"
    exit 1
fi

# Count files
total=$(find "$BASE_PATH/$DICT" -type f -name "*.png" | wc -l)
echo "Total files to upload: $total"

# Upload files
count=0
find "$BASE_PATH/$DICT" -type f -name "*.png" | sort | while read file; do
    count=$((count + 1))
    
    # Create R2 path
    relative_path=${file#$BASE_PATH/}
    r2_path="$R2_PREFIX/$relative_path"
    
    # Upload file
    wrangler r2 object put "$BUCKET_NAME/$r2_path" --file="$file" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "[$count/$total] ✓ $relative_path"
    else
        echo "[$count/$total] ✗ $relative_path (failed)"
    fi
    
    # Progress indicator every 50 files
    if [ $((count % 50)) -eq 0 ]; then
        echo "=== Progress: $count/$total files uploaded ==="
    fi
done

echo "=== Completed uploading $DICT ==="
#!/bin/bash

# Batch upload script that uses parallel processing
# This is much faster than uploading one file at a time

BUCKET_NAME="mawrid-dictionaries"
R2_PREFIX="mawridreader"
BASE_PATH="data/images"

# Function to upload a single file
upload_file() {
    local file=$1
    local r2_path=$2
    
    wrangler r2 object put "$BUCKET_NAME/$r2_path" --file="$file" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✓ $r2_path"
    else
        echo "✗ $r2_path" >&2
    fi
}

export -f upload_file
export BUCKET_NAME

# Process each dictionary
for dict in hw4 ll sg; do
    echo "=== Processing $dict ==="
    
    # Count total files
    total=$(find "$BASE_PATH/$dict" -type f -name "*.png" | wc -l)
    echo "Total files: $total"
    
    # Generate upload commands and run in parallel
    find "$BASE_PATH/$dict" -type f -name "*.png" | while read file; do
        # Create R2 path
        relative_path=${file#$BASE_PATH/}
        r2_path="$R2_PREFIX/$relative_path"
        
        echo "$file|$r2_path"
    done | xargs -P 10 -I {} bash -c '
        IFS="|" read -r file r2_path <<< "{}"
        upload_file "$file" "$r2_path"
    '
    
    echo "Completed $dict"
    echo ""
done

echo "=== Upload complete ==="
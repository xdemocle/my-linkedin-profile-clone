#!/bin/bash

# Script to add .svg extension to files in ./public/unsorted and move them to ./public/assets/images/svg

SOURCE_DIR="./public/unsorted"
TARGET_DIR="./public/assets/images/svg"

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Counter for processed files
count=0

echo "Processing SVG files from $SOURCE_DIR to $TARGET_DIR..."

# Process all files in the source directory (excluding .DS_Store)
for file in "$SOURCE_DIR"/*; do
    # Check if file exists and is a regular file
    if [[ -f "$file" ]]; then
        # Get the filename without path
        filename=$(basename "$file")

        # Skip .DS_Store and files that already have .svg extension
        if [[ "$filename" != ".DS_Store" && "$filename" != *.svg ]]; then
            # Move file and add .svg extension
            mv "$file" "$TARGET_DIR/$filename.svg"
            echo "Moved: $filename -> $filename.svg"
            ((count++))
        elif [[ "$filename" == *.svg ]]; then
            # Move SVG files as-is
            mv "$file" "$TARGET_DIR/$filename"
            echo "Moved: $filename"
            ((count++))
        fi
    fi
done

echo "Processing complete! Moved $count files to $TARGET_DIR"
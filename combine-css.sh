#!/bin/bash

# Backup existing output file if it exists
cp ./public/linkedin.css ./public/linkedin.backup.css

# Remove existing output file if it exists
rm -f ./public/linkedin.css

# Combine all CSS files in raw/assets/css/
echo "/* Combined CSS files - $(date) */" > ./public/linkedin.css
echo "" >> ./public/linkedin.css

# Loop through each CSS file and append to output
for file in ./public/assets/css/*.css; do
  if [ -f "$file" ]; then
    echo "/* File: $(basename $file) */" >> ./public/linkedin.css
    cat "$file" >> ./public/linkedin.css
    echo "" >> ./public/linkedin.css
    echo "" >> ./public/linkedin.css
  fi
done

# Make output file readable
chmod 644 ./public/linkedin.css

echo "CSS files combined into ./public/linkedin.css"

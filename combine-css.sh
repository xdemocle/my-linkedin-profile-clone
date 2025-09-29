#!/bin/bash

# Remove existing output file if it exists
rm -f ./public/output.css

# Combine all CSS files in raw/assets/css/
echo "/* Combined CSS files - $(date) */" > ./output.css
echo "" >> ./output.css

# Loop through each CSS file and append to output
for file in ./raw/unsorted/*.css; do
  if [ -f "$file" ]; then
    echo "/* File: $(basename $file) */" >> ./output.css
    cat "$file" >> ./public/output.css
    echo "" >> ./public/output.css
    echo "" >> ./public/output.css
  fi
done

# Make output file readable
chmod 644 ./public/output.css

echo "CSS files combined into ./output.css"

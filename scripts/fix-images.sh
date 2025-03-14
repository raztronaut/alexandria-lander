#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Download image2 (properly named as jpg)
curl -o public/images/image2.jpg https://picsum.photos/500/500.jpg

# Download tree image (properly named as jpg)
curl -o public/images/tree.jpg https://picsum.photos/1000/500.jpg

echo "Fixed images downloaded successfully!" 
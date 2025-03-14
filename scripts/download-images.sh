#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Download Ancient Philosophy image
curl -o "public/images/Ancient Philosophy May 2023.jpg" https://upload.wikimedia.org/wikipedia/commons/8/8c/David_-_The_Death_of_Socrates.jpg

# Download image1 (technology chip)
curl -o public/images/image1.jpg https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop

# Download image2 (Muhammad Ali)
curl -o public/images/image2.jpg https://upload.wikimedia.org/wikipedia/commons/8/89/Muhammad_Ali_vs._Sonny_Liston.jpg

# Download image3 (Black hole)
curl -o public/images/image3.jpg https://upload.wikimedia.org/wikipedia/commons/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg

# Download image4 (Afghan girl)
curl -o public/images/image4.jpg https://upload.wikimedia.org/wikipedia/commons/b/b4/Sharbat_Gula.jpg

# Download tree image
curl -o public/images/tree.jpg https://images.unsplash.com/photo-1501261379837-c3b516c6247d?q=80&w=1000&auto=format&fit=crop

echo "All images downloaded successfully!" 
#!/bin/bash

# Advanced Build Script with Maximum Minification and Obfuscation
# Copyright (c) 2024 Peter's School Help. All rights reserved.

echo "🔒 Building with maximum protection and minification..."

# Set production environment
export NODE_ENV=production
export VITE_MODE=production

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist dist-minified dist-obfuscated

# Build with maximum minification
echo "⚡ Building with maximum minification..."
npm run build:prod

# Create additional obfuscated build
echo "🔐 Creating obfuscated build..."
npm run build:obfuscated

# Add additional obfuscation to the obfuscated build
echo "🛡️ Adding additional obfuscation..."
if [ -d "dist-obfuscated" ]; then
    # Find all JS files and add random comments
    find dist-obfuscated -name "*.js" -exec sh -c '
        echo "// Obfuscated by Peter'\''s School Help - Copyright 2024" > temp_file
        cat "$1" >> temp_file
        mv temp_file "$1"
    ' _ {} \;
    
    # Add random variable names to CSS
    find dist-obfuscated -name "*.css" -exec sh -c '
        sed -i "s/--/--x/g" "$1"
    ' _ {} \;
fi

echo "✅ Build complete!"
echo "📁 Standard build: dist/"
echo "🔒 Minified build: dist-minified/"
echo "🛡️ Obfuscated build: dist-obfuscated/"

# Show file sizes
echo "📊 Build sizes:"
du -sh dist* 2>/dev/null || echo "No dist folders found"

echo "🚀 Ready for deployment!"

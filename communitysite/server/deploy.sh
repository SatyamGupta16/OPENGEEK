#!/bin/bash

# Clean deployment script for Render
echo "Starting deployment..."

# Remove any existing node_modules and lock files
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Install dependencies with exact versions
npm install --production --no-optional

# Rebuild native modules
npm rebuild

echo "Deployment preparation complete!"
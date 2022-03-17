#!/bin/sh
cd build
git init
git checkout -b  build
git remote add origin https://github.com/aabdulbasset/vreact.git
git add .
git commit -m "Automated push"
git push origin build
ssh -p 65002 u123510861@153.92.6.127 "cd public_html && rm -rf asset-manifest.json favicon.ico index.html static temp .git && git clone -b build --single-branch https://github.com/aabdulbasset/vreact.git temp && cd temp && find . -maxdepth 1 -exec mv {} .. \; && cd .. && rm -rf temp"

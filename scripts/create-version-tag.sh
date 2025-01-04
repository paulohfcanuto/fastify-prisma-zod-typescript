#!/bin/bash
VERSION=$(node -p "require('./package.json').version")
git tag -a "v$VERSION" -m "Release version $VERSION"
git push origin "v$VERSION" 
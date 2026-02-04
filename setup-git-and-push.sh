#!/bin/bash
# Run this in Git Bash from the project root (e:\frontend-equino)
cd "$(dirname "$0")"

# 1. Initialize repository (skip if already initialized)
if [ ! -d .git ]; then
  git init
fi

# 2. Stage all files
git add .

# 3. First commit
git commit -m "Initial commit"

# 4. Add remote (remove existing 'origin' if present to avoid error)
git remote remove origin 2>/dev/null
git remote add origin https://github.com/No-Country-simulation/S02-26-Equipo-22-Web-App-Front.git

# 5. Push to main
git branch -M main
git push -u origin main

echo "Done."

# Deployment Guide

## GitHub Pages Deployment

This project is configured for easy deployment to GitHub Pages.

### Prerequisites
1. Push your code to a GitHub repository
2. Make sure the repository is public (or you have GitHub Pro for private repos)

### Setup Steps

1. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/agile-shaman"
   ```
   Replace `YOUR_USERNAME` with your actual GitHub username.

2. **Enable GitHub Pages** in your repository:
   - Go to your GitHub repository
   - Navigate to Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: Select "gh-pages"
   - Folder: "/ (root)"

### Deployment Options

#### Option 1: Automatic Deployment (Recommended)
The repository includes a GitHub Action (`.github/workflows/deploy.yml`) that automatically builds and deploys when you push to the main branch.

Just push your code:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

The action will automatically:
- Build the project
- Deploy to the `gh-pages` branch
- Make it available at your GitHub Pages URL

#### Option 2: Manual Deployment
If you prefer manual control:

```bash
# Build and deploy manually
npm run deploy
```

This will:
- Build the project (`npm run build`)
- Deploy the `dist` folder to the `gh-pages` branch

### Access Your Game
After deployment, your game will be available at:
```
https://YOUR_USERNAME.github.io/agile-shaman
```

### Notes
- First deployment may take a few minutes to become available
- The game will automatically return to the landing page when refreshed
- All assets (images, etc.) are correctly configured for the GitHub Pages subdirectory

### Troubleshooting
- Ensure your repository is public or you have GitHub Pages enabled for private repos
- Check the Actions tab for any deployment failures
- Verify the `base` path in `vite.config.ts` matches your repository name

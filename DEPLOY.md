# 🚀 Deployment Guide

## Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts:
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: github-contribution-tracker
   - Directory: ./
   - Override settings: No

## Deploy to Netlify

1. Build the project:
```bash
bun run build
```

2. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

## Deploy to GitHub Pages

1. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/awsomeproject"
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add deploy script to `package.json`:
```json
{
  "scripts": {
    "deploy": "bun run build && gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
bun run deploy
```

## Environment Variables (Optional)

To increase GitHub API rate limits, add a GitHub token:

1. Create `.env.local`:
```
VITE_GITHUB_TOKEN=your_github_token_here
```

2. Update API calls in `src/App.jsx` to include the token in headers:
```javascript
headers: {
  'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`
}
```

**Never commit `.env.local` to git!**

## Performance Tips

- Use GitHub token for higher rate limits (5000 req/hour)
- Enable caching for API responses
- Consider adding a backend proxy to hide the token
- Use CDN for faster global access

---

Choose the platform that best fits your needs! All three options are free for personal projects.

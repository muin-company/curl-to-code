# Deployment Guide

## Quick Deploy Options

### 1. GitHub Pages (Recommended - Free)

**Setup:**
```bash
# Push to GitHub
git remote add origin https://github.com/yourusername/curl-to-code.git
git push -u origin main
```

**Enable GitHub Pages:**
1. Go to repository Settings
2. Navigate to "Pages" section
3. Source: Deploy from branch
4. Branch: `main` / `root`
5. Click Save

**Your site will be live at:**
`https://yourusername.github.io/curl-to-code/`

**Custom Domain (Optional):**
1. Add a `CNAME` file with your domain:
   ```bash
   echo "curl2code.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```
2. Configure DNS:
   - Add CNAME record: `www` → `yourusername.github.io`
   - Add A records for apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
3. Enable HTTPS in repository settings

---

### 2. Netlify (Free + Auto Deploy)

**Option A: Drag & Drop**
1. Go to [netlify.com](https://netlify.com)
2. Drag the project folder to deploy area
3. Done! Live in seconds

**Option B: Git Integration (Auto-deploy on push)**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Or connect GitHub repo in Netlify dashboard
```

**Benefits:**
- Auto-deploy on git push
- Free SSL certificate
- Custom domain easy setup
- Form handling (if you add contact forms)
- Branch previews

---

### 3. Vercel (Free + Ultra Fast)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Benefits:**
- Edge network (fastest CDN)
- Auto-deploy on push
- Preview deployments
- Free SSL
- Analytics included

---

### 4. Cloudflare Pages (Free + Fast)

1. Push code to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect repository
4. Build settings:
   - Build command: (leave empty)
   - Output directory: `/`
5. Deploy

**Benefits:**
- Cloudflare CDN (excellent performance)
- Free unlimited bandwidth
- DDoS protection
- Analytics

---

### 5. Firebase Hosting (Free Tier)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

**Benefits:**
- Google infrastructure
- Free SSL
- Custom domain
- Version history

---

### 6. AWS S3 + CloudFront

**S3 Setup:**
```bash
# Create bucket
aws s3 mb s3://curl-to-code

# Upload files
aws s3 sync . s3://curl-to-code --exclude ".git/*"

# Enable website hosting
aws s3 website s3://curl-to-code --index-document index.html
```

**Make public:**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::curl-to-code/*"
  }]
}
```

**CloudFront (CDN):**
1. Create CloudFront distribution
2. Origin: S3 bucket
3. Enable HTTPS
4. Add custom domain

**Benefits:**
- Highly scalable
- Full control
- Very cheap ($0.50/month for low traffic)

---

## Pre-Deployment Checklist

### ✅ SEO Optimization

1. **Update meta tags in index.html:**
   ```html
   <link rel="canonical" href="https://your-actual-domain.com">
   <meta property="og:url" content="https://your-actual-domain.com">
   ```

2. **Add robots.txt:**
   ```txt
   User-agent: *
   Allow: /
   Sitemap: https://your-domain.com/sitemap.xml
   ```

3. **Add sitemap.xml:**
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://your-domain.com/</loc>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

4. **Create favicon:**
   - Add `favicon.ico` (16x16, 32x32, 48x48)
   - Add Apple touch icon (180x180)
   ```html
   <link rel="icon" type="image/x-icon" href="/favicon.ico">
   <link rel="apple-touch-icon" href="/apple-touch-icon.png">
   ```

### ✅ Performance

1. **Minify HTML (optional for single file):**
   ```bash
   # Using html-minifier
   npx html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html
   ```

2. **Test Performance:**
   - Run Lighthouse audit
   - Target: 95+ on all metrics
   - Fix any issues

3. **Enable Compression:**
   - Gzip/Brotli (most hosts do this automatically)

### ✅ Analytics (Optional)

**Google Analytics:**
```html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Plausible Analytics (Privacy-friendly):**
```html
<script defer data-domain="your-domain.com" src="https://plausible.io/js/script.js"></script>
```

### ✅ Security Headers

Add these headers (most hosts support via config):

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer-when-downgrade
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**For Netlify (_headers file):**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer-when-downgrade
```

**For Vercel (vercel.json):**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## Post-Deployment

### 🔍 Submit to Search Engines

1. **Google Search Console:**
   - Add property: https://search.google.com/search-console
   - Submit sitemap
   - Request indexing

2. **Bing Webmaster Tools:**
   - Add site: https://www.bing.com/webmasters
   - Submit sitemap

3. **Manual Indexing:**
   - Google: Use URL Inspection tool
   - Bing: Submit URL

### 📊 Monitor

1. **Analytics:**
   - Check daily visitors
   - Track popular languages
   - Monitor conversion funnel

2. **Error Tracking:**
   - Set up Sentry (optional)
   - Monitor browser console errors

3. **Uptime Monitoring:**
   - Use UptimeRobot (free)
   - Get alerts if site goes down

### 🚀 Promote

1. **Developer Communities:**
   - Post on Reddit (r/webdev, r/programming)
   - Share on Hacker News
   - Tweet about it
   - Product Hunt launch

2. **SEO Content:**
   - Write blog posts about cURL
   - Create tutorials linking to tool
   - Answer Stack Overflow questions

3. **Backlinks:**
   - Submit to tool directories
   - List on developer resource sites

---

## Continuous Updates

```bash
# Make changes locally
git add .
git commit -m "Improvement: feature X"
git push

# Auto-deploys on:
# - GitHub Pages (within minutes)
# - Netlify (instant)
# - Vercel (instant)
# - Cloudflare Pages (instant)
```

---

## Cost Comparison

| Provider | Free Tier | Custom Domain | Bandwidth | SSL |
|----------|-----------|---------------|-----------|-----|
| GitHub Pages | Unlimited | ✅ | 100GB/month | ✅ |
| Netlify | 100GB | ✅ | 100GB/month | ✅ |
| Vercel | 100GB | ✅ | 100GB/month | ✅ |
| Cloudflare Pages | Unlimited | ✅ | Unlimited | ✅ |
| Firebase | 10GB | ✅ | 360MB/day | ✅ |

**Recommendation:** Start with GitHub Pages or Netlify. Both are excellent and free.

---

## Troubleshooting

**Issue: Copy to clipboard doesn't work**
- Cause: HTTP (not HTTPS)
- Solution: Use HTTPS (all hosts above provide free SSL)

**Issue: Slow loading**
- Cause: Large files or many requests
- Solution: This tool is a single file, should be instant
- Check: Browser dev tools Network tab

**Issue: 404 on custom domain**
- Cause: DNS not propagated
- Solution: Wait 24-48 hours for DNS propagation
- Check: `dig your-domain.com` or `nslookup your-domain.com`

**Issue: Changes not showing**
- Cause: Browser cache
- Solution: Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

---

**Ready to deploy? Pick a platform above and ship it! 🚀**

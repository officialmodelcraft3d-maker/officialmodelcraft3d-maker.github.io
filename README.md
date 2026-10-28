# Model Craft 3D — website

SolidWorks CAD, reverse engineering, 3D sculpting and rendering studio. Node.js (Express) site, deployed to GitHub Pages from `main`.

## Run locally
```
npm install
npm run dev        # builds public/index.html and starts http://localhost:3000
```

## Edit content
- Page body + styles: `preview.html` (then `npm run build` regenerates `public/index.html`, sitemap, robots, llms.txt)
- Portfolio list: the `PROJECTS` array at the bottom of `preview.html`; images live in `public/portfolio/`
- Client logos: `public/clients/`
- Founder photo / logo: `public/img/`

## Quote form
On GitHub Pages (static) the form falls back to an email / WhatsApp link. On a Node host (Render, Railway, VPS, cPanel Node app) set `SMTP_USER` and `SMTP_PASS` (Gmail App Password) and submissions are emailed to `QUOTE_TO`.

## Custom domain
Set the repository variable `SITE_URL` to `https://www.yourdomain.com`, add the domain under Settings → Pages, and point DNS at GitHub Pages (see DEPLOY.md).

// Builds public/index.html from preview.html (the page body + styles) and adds the SEO / AEO / GEO head.
// Usage: SITE_URL=https://www.example.com node scripts/build.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE_URL = (process.env.SITE_URL || 'https://modelcraft3d.com').replace(/\/$/, '');
const NAME = 'Model Craft 3D';
const DESC = 'Reverse engineering, 3D sculpting, printable models and product rendering with a 24–48 hour turnaround, plus manufacturing through partner shops in China and the USA. Serving the USA, UK, Canada and Australia. Free quote within 24 hours.';
const PHONE = '+1-575-418-4265';
const EMAIL = 'Official.modelcraft3d@gmail.com';
const INSTAGRAM = 'https://www.instagram.com/model_craft_3d_';
const BOOKING = 'https://calendar.app.google/p6tHS3K8GBUi3tX96';

let body = fs.readFileSync(path.join(ROOT, 'preview.html'), 'utf8');
// Strip the artifact-only lines
body = body.replace(/^<title>.*<\/title>\n/, '').replace(/^<meta name="claude:viewport-fit-sides"[^\n]*\n/m, '').replace(/^<meta name="description"[^\n]*\n/m, '');

const faqs = [...body.matchAll(/<details><summary>(.*?)<\/summary><div class="a">(.*?)<\/div><\/details>/g)]
  .map(m => ({ '@type': 'Question', name: strip(m[1]), acceptedAnswer: { '@type': 'Answer', text: strip(m[2]) } }));

function strip(s) { return s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim(); }

const areas = [
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'Canada' },
  { '@type': 'Country', name: 'Australia' }
];

const ld = [
  {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': SITE_URL + '/#business',
    name: NAME,
    alternateName: 'ModelCraft3D',
    slogan: 'Idea to Reality',
    url: SITE_URL + '/',
    logo: SITE_URL + '/img/logo.png',
    image: SITE_URL + '/img/og.jpg',
    description: DESC,
    telephone: PHONE,
    email: EMAIL,
    priceRange: '$$',
    founder: { '@id': SITE_URL + '/#founder' },
    sameAs: [INSTAGRAM],
    areaServed: areas,
    knowsAbout: ['CAD modelling', 'SolidWorks', 'Blender', 'Geomagic Design X', 'AutoCAD', 'Reverse engineering', '3D sculpting', '3D printing', 'Product design', 'Product rendering', 'CNC machining', 'Injection moulding', 'Sheet metal design', 'Contract manufacturing'],
    makesOffer: [
      offer('CAD modelling', 'Parts, mechanical components, complex assemblies and 2D technical drawings. Output: STEP, IGES, DWG, PDF.'),
      offer('Reverse engineering', 'Photos, scans or a physical part rebuilt as a production-ready CAD model. STEP file provided.'),
      offer('3D sculpting', 'Characters, busts, trophies, jewellery and art pieces ready for printing or casting. Output: ZTL, OBJ, STL.'),
      offer('Printable models', 'Custom parts and prototypes for 3D printing, checked and ready to print. Output: STL, 3MF.'),
      offer('Sheet metal parts', 'Parts for laser cutting with flat-pattern DXF files for custom sheet metal parts. Output: DXF, STEP.'),
      offer('Enclosure design', 'Custom PCB enclosures ready for 3D printing and manufacturing. Output: STEP, STL.'),
      offer('Injection moulding parts', 'Injection-moulding-ready plastic parts with draft, wall thickness and 2D drawings. Output: STEP, 2D drawing.'),
      offer('Rendering and animation', 'Realistic renders of prototypes and product animation in Blender. Output: 4K PNG, MP4.'),
      offer('Manufacturing and prototyping', 'CNC machining, injection moulding, sheet metal and castings through partners in China; 3D printing through partner shops in the USA; QC photos and shipping handled.')
    ],
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '22:00' }],
    potentialAction: { '@type': 'ReserveAction', target: BOOKING, name: 'Book a free 20-minute consultation' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': SITE_URL + '/#founder',
    name: 'Rashid Subhani',
    jobTitle: 'Product Design Engineer',
    image: SITE_URL + '/img/founder.jpg',
    worksFor: { '@id': SITE_URL + '/#business' },
    knowsAbout: ['Parametric 3D modelling', '2D to 3D conversion', 'Assembly design', 'Sheet metal design', '3D printing optimisation', 'CNC machining-ready files', 'Engineering drawings (ANSI/ISO)', 'KeyShot rendering', 'Blender', 'SolidWorks', 'Reverse engineering', 'Manufacturing'],
    sameAs: [INSTAGRAM]
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_URL + '/#website',
    url: SITE_URL + '/',
    name: NAME,
    publisher: { '@id': SITE_URL + '/#business' },
    inLanguage: 'en'
  }
];

function offer(name, description) {
  return { '@type': 'Offer', itemOffered: { '@type': 'Service', name, description, provider: { '@id': SITE_URL + '/#business' }, areaServed: areas } };
}

// Pre-render the project grid so crawlers and answer engines see every project without JavaScript
const projMatch = body.match(/const PROJECTS=\[([\s\S]*?)\n\];/);
if (projMatch) {
  const PROJECTS = JSON.parse('[' + projMatch[1].trim().replace(/,\s*$/, '') + ']');
  const SHOW = 12;
  const gridHtml = PROJECTS.map((p, i) => `<figure${i >= SHOW ? ' class="hidden-item"' : ''}><div class="ph"><img src="/portfolio/${p[0]}.jpg" alt="${p[1]} — 3D model by Model Craft 3D" loading="lazy" width="800" height="600"></div><figcaption><b>${p[1]}</b><span>${p[2]} · <i>Completed in ${p[3]}</i></span></figcaption></figure>`).join('');
  body = body.replace('<div class="work" id="work-grid"></div>', `<div class="work" id="work-grid">${gridHtml}</div>`);
}

const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Model Craft 3D | Reverse Engineering, 3D Sculpting, Printable Models &amp; Manufacturing — USA, UK, Canada, Australia</title>
<meta name="description" content="${DESC}">
<link rel="canonical" href="${SITE_URL}/">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#0a4fd6">
<meta name="geo.placename" content="United States; United Kingdom; Canada; Australia">
<link rel="alternate" hreflang="en-US" href="${SITE_URL}/">
<link rel="alternate" hreflang="en-GB" href="${SITE_URL}/">
<link rel="alternate" hreflang="en-CA" href="${SITE_URL}/">
<link rel="alternate" hreflang="en-AU" href="${SITE_URL}/">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="Model Craft 3D — Your idea. Expert hands.">
<meta property="og:description" content="${DESC}">
<meta property="og:url" content="${SITE_URL}/">
<meta property="og:image" content="${SITE_URL}/img/og.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Model Craft 3D — Your idea. Expert hands.">
<meta name="twitter:description" content="${DESC}">
<meta name="twitter:image" content="${SITE_URL}/img/og.jpg">
<link rel="icon" href="/img/favicon.png" sizes="32x32"><link rel="apple-touch-icon" href="/img/icon-192.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="image" href="/video/wheel-poster.jpg">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
`;

const html = head + body.replace(/src="(img|clients|portfolio|video)\//g, 'src="/$1/').replace(/poster="video\//g, 'poster="/video/').replace(/(src|href)="viewer\//g, '$1="/viewer/').replace(/src="portfolio\/\$\{/g, 'src="/portfolio/${') + `
</body>
</html>
`;

const pub = path.join(ROOT, 'public');
fs.writeFileSync(path.join(pub, 'index.html'), html);

fs.writeFileSync(path.join(pub, 'robots.txt'), `User-agent: *\nAllow: /\n\n# AI / answer-engine crawlers are welcome\nUser-agent: GPTBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

const today = new Date().toISOString().slice(0, 10);
const imgs = fs.readdirSync(path.join(pub, 'portfolio')).filter(f => f.endsWith('.jpg'))
  .map(f => `    <image:image><image:loc>${SITE_URL}/portfolio/${f}</image:loc><image:title>${f.replace(/\.jpg$/, '').replace(/-/g, ' ')} — 3D model by Model Craft 3D</image:title></image:image>`).join('\n');
fs.writeFileSync(path.join(pub, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority>
${imgs}
  </url>
</urlset>
`);

fs.writeFileSync(path.join(pub, 'site.webmanifest'), JSON.stringify({ name: NAME, short_name: 'ModelCraft3D', start_url: '/', display: 'browser', background_color: '#ffffff', theme_color: '#0a4fd6', icons: [{ src: '/img/icon-192.png', sizes: '192x192', type: 'image/png' }] }, null, 2));

// llms.txt — plain-language summary for AI answer engines (AEO / GEO)
fs.writeFileSync(path.join(pub, 'llms.txt'), `# Model Craft 3D

> Remote 3D design and manufacturing studio founded by Rashid Subhani (Product Design Engineer). Reverse engineering, 3D sculpting, printable models, product design and rendering, with manufacturing through partner factories in China (CNC, moulding, sheet metal, castings) and 3D printing shops in the USA. Standard turnaround 24–48 hours. Clients in the USA, UK, Canada and Australia. 500+ projects, 800+ clients, 4 years of industry experience, projects ranging from single machined parts and sheet metal brackets to complex assemblies, PCB enclosures and consumer products.

- Website: ${SITE_URL}/
- WhatsApp: ${PHONE}
- Email: ${EMAIL}
- Book a free 20-minute consultation: ${BOOKING}
- Instagram: ${INSTAGRAM}

## Services
- CAD modelling: parts, mechanical components, complex assemblies, 2D technical drawings (STEP, IGES, DWG, PDF)
- Reverse engineering: photos, scans or physical part to production-ready CAD; STEP file provided (STEP, DWG)
- 3D sculpting: characters, busts, trophies, jewellery, art pieces for printing or casting (ZTL, OBJ, STL)
- Printable models: custom parts and prototypes, ready to print (STL, 3MF)
- Sheet metal parts: laser-cutting-ready parts with flat-pattern DXF (DXF, STEP)
- Enclosure design: custom PCB enclosures for 3D printing and manufacturing (STEP, STL)
- Injection moulding parts: moulding-ready plastic parts with 2D drawings (STEP, 2D drawing)
- Rendering: realistic renders and Blender animation (4K PNG, MP4)
- Manufacturing: CNC, injection moulding, sheet metal, castings via partners in China; 3D printing via partner shops in the USA; DFM check, QC photos, shipping

## Software
- SolidWorks, Blender, Geomagic Design X, AutoCAD, KeyShot

## Founder expertise
- Parametric 3D modelling, 2D to 3D conversion, assembly design, sheet metal design, 3D printing optimisation, CNC machining-ready files, engineering drawings to ANSI/ISO standards, KeyShot and Blender rendering

## Pricing and timing
- Rate: USD 25 per hour, with an hours estimate agreed before work starts
- Quote within 24 hours; most projects delivered in 24–48 hours depending on complexity
- Two revision rounds included; NDA available
`);

fs.writeFileSync(path.join(pub, '404.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Model Craft 3D</title><style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;color:#0f1424;text-align:center;padding:24px}a{color:#0a4fd6}</style></head><body><div><img src="/img/logo.png" alt="Model Craft 3D" style="height:60px"><h1>Page not found</h1><p><a href="/">Back to the homepage</a></p></div></body></html>`);

console.log('Built public/index.html for', SITE_URL, '| FAQ entries:', faqs.length);

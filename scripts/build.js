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
    '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to get a CAD model or 3D design from Model Craft 3D',
    totalTime: 'P2D',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Brief', text: 'Send a sketch, photo or paragraph on WhatsApp (+1 575 418 4265) or the website form.' },
      { '@type': 'HowToStep', position: 2, name: 'Quote', text: 'Receive an hours estimate at USD 25 per hour and a timeline within a few hours.' },
      { '@type': 'HowToStep', position: 3, name: 'Model', text: 'The part is modelled in professional CAD; previews are shared as work progresses.' },
      { '@type': 'HowToStep', position: 4, name: 'Deliver', text: 'Files (STEP, STL, DXF, DWG, renders) are delivered in 24–48 hours, or the finished part ships from a partner shop.' }
    ]
  },
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

const html = head + body.replace(/src="(img|clients|portfolio|video)\//g, 'src="/$1/').replace(/poster="video\//g, 'poster="/video/').replace(/(src|href)="viewer\//g, '$1="/viewer/').replace(/`spin\//g, '`/spin/').replace(/href="((?:cad-|reverse-|3d-|sheet-|product-)[a-z0-9-]+\/)"/g, 'href="/$1"').replace(/src="portfolio\/\$\{/g, 'src="/portfolio/${') + `
</body>
</html>
`;

const pub = path.join(ROOT, 'public');
fs.writeFileSync(path.join(pub, 'index.html'), html);

fs.writeFileSync(path.join(pub, 'robots.txt'), `User-agent: *\nAllow: /\n\n# AI / answer-engine crawlers are welcome\nUser-agent: GPTBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

fs.writeFileSync(path.join(pub, 'site.webmanifest'), JSON.stringify({ name: NAME, short_name: 'ModelCraft3D', start_url: '/', display: 'browser', background_color: '#ffffff', theme_color: '#0a4fd6', icons: [{ src: '/img/icon-192.png', sizes: '192x192', type: 'image/png' }] }, null, 2));


// ---------- Landing pages (GEO / AEO) ----------
const { countries, services } = require('./pages');
const styleBlock = body.match(/<style>[\s\S]*?<\/style>/)[0];
const fontLink = body.match(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/)[0];
const headerBlock = body.match(/<header>[\s\S]*?<\/header>/)[0].replace(/href="#/g, 'href="/#').replace(/src="img\//g, 'src="/img/');
const footerBlock = body.match(/<footer>[\s\S]*?<\/footer>/)[0].replace(/href="#/g, 'href="/#').replace(/src="img\//g, 'src="/img/');
const waBlock = body.match(/<a class="wa-float"[\s\S]*?<\/a>/)[0];
const menuJs = `<script>const mb=document.getElementById('menuBtn'),ul=document.querySelector('.nav ul');mb&&mb.addEventListener('click',()=>{const o=mb.getAttribute('aria-expanded')==='true';mb.setAttribute('aria-expanded',String(!o));ul.style.display=o?'':'flex';if(!o){Object.assign(ul.style,{position:'absolute',top:'74px',left:0,right:0,background:'#fff',flexDirection:'column',padding:'16px var(--gx)',borderBottom:'1px solid var(--line)',gap:'14px'})}});</script>`;
const pageCss = `<style>
.lp-hero{padding-block:64px 48px;border-bottom:1px solid var(--line);position:relative;overflow:hidden}
.lp-hero h1{font-size:clamp(30px,4.2vw,50px);font-weight:800;letter-spacing:-.025em;max-width:22ch}
.lp-hero .answer{font-size:19px;color:var(--ink);max-width:70ch;margin-top:18px;line-height:1.55;border-left:4px solid var(--orange);padding-left:16px}
.lp-hero .lede{margin-top:14px}
.lp-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}
.crumbs{font:500 12px var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--muted);display:flex;gap:8px;margin-bottom:22px}.crumbs a{text-decoration:none;color:var(--blue)}
.lp-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
.lp-list{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.lp-list li{display:flex;gap:12px;align-items:flex-start;font-size:15px;color:var(--ink-2)}.lp-list li::before{content:"";flex:none;width:10px;height:10px;margin-top:7px;border-radius:50%;background:var(--blue)}
.lp-list li:nth-child(3n+2)::before{background:var(--orange);border-radius:2px}.lp-list li:nth-child(3n)::before{background:var(--green);clip-path:polygon(50% 0,100% 100%,0 100%)}
.lp-card{border:1px solid var(--line);border-radius:14px;padding:24px;background:#fff}
.lp-card h3{font-size:18px;font-weight:700;margin-bottom:12px}
.lp-cta{background:var(--ink);color:#fff;border-radius:16px;padding:32px;display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between;margin-top:48px}
.lp-cta h2{font-size:clamp(22px,2.6vw,30px);font-weight:700;max-width:28ch}
.lp-cta p{color:#c7cee0;margin-top:6px}
.lp-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:40px}.lp-links a{font-size:13px;font-weight:600;color:var(--ink-2);background:var(--bg-2);border-radius:999px;padding:8px 14px;text-decoration:none}.lp-links a:hover{background:var(--blue-soft);color:var(--blue)}
.proof{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:32px}
.proof div{border-radius:12px;padding:14px 16px;color:#fff;display:grid;gap:2px}.proof b{font:800 22px/1 var(--display)}.proof span{font-size:12px;opacity:.9}
@media (max-width:900px){.lp-grid{grid-template-columns:1fr}.proof{grid-template-columns:repeat(2,1fr)}}
</style>`;
const sample = fs.readdirSync(path.join(pub0(), 'portfolio')).filter(f => f.endsWith('.jpg'));
function pub0() { return path.join(ROOT, 'public'); }
function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
function pageHead(p, url, descr, ld) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(descr)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#0a4fd6">
<meta property="og:type" content="website"><meta property="og:site_name" content="${NAME}"><meta property="og:title" content="${esc(p.h1)}"><meta property="og:description" content="${esc(descr)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE_URL}/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/img/favicon.png" sizes="32x32"><link rel="apple-touch-icon" href="/img/icon-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fontLink}
${styleBlock}
${pageCss}
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
`;
}
function proof() {
  return `<div class="proof"><div style="background:var(--orange)"><b>24–48 h</b><span>typical delivery</span></div><div style="background:var(--blue)"><b>$25/hr</b><span>estimate up front</span></div><div style="background:var(--green)"><b>500+</b><span>projects completed</span></div><div style="background:var(--ink)"><b>4</b><span>countries served</span></div></div>`;
}
function faqHtml(faqs) {
  return `<div class="faq">${faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><div class="a">${esc(a)}</div></details>`).join('')}</div>`;
}
function ctaHtml(text) {
  return `<div class="lp-cta"><div><h2>${esc(text)}</h2><p>Reply within 24 hours. WhatsApp +1 (575) 418-4265 · Official.modelcraft3d@gmail.com</p></div><div class="hero-actions"><a class="btn btn-orange" href="/#contact">Get a quote</a><a class="btn btn-wa" href="https://wa.me/15754184265" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn-ghost" href="https://calendar.app.google/p6tHS3K8GBUi3tX96" target="_blank" rel="noopener">Book a call</a></div></div>`;
}
function related(exceptSlug) {
  const all = [...services.map(s => ({ slug: s.slug, label: s.name })), ...countries.map(c => ({ slug: c.slug, label: `CAD design ${c.short}` }))].filter(x => x.slug !== exceptSlug);
  return `<nav class="lp-links" aria-label="Related pages"><a href="/">Home</a>${all.map(x => `<a href="/${x.slug}/">${esc(x.label)}</a>`).join('')}</nav>`;
}
function writePage(slug, html) { const dir = path.join(pub0(), slug); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, 'index.html'), html); }
const pageUrls = [];
const areaAll = [{ '@type': 'Country', name: 'United States' }, { '@type': 'Country', name: 'United Kingdom' }, { '@type': 'Country', name: 'Canada' }, { '@type': 'Country', name: 'Australia' }];

for (const c of countries) {
  const url = `${SITE_URL}/${c.slug}/`; pageUrls.push(url);
  const art = (c.code === 'US' || c.code === 'GB') ? 'the ' + c.country : c.country;
  const adj = { US: 'US', GB: 'UK', CA: 'Canadian', AU: 'Australian' }[c.code];
  const descr = c.answer;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: `${NAME} — ${c.country}`, url, parentOrganization: { '@id': SITE_URL + '/#business' }, areaServed: { '@type': 'Country', name: c.country }, telephone: PHONE, email: EMAIL, priceRange: 'USD 25 per hour', description: descr },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' }, { '@type': 'ListItem', position: 2, name: `CAD design services ${c.short}`, item: url }] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];
  const html = pageHead(c, url, descr, ld) + headerBlock + `
<main>
<section class="lp-hero"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>${esc(c.country)}</span></nav>
  <span class="eyebrow">Serving ${esc(art)}</span>
  <h1>${esc(c.h1)}</h1>
  <p class="answer">${esc(c.answer)}</p>
  <p class="lede">${esc(c.lede)}</p>
  <div class="lp-actions"><a class="btn btn-orange" href="/#contact">Get a quote in 24 hours →</a><a class="btn btn-wa" href="https://wa.me/15754184265?text=${encodeURIComponent('Hi Model Craft 3D, I am in ' + c.country + ' and need a quote for a 3D/CAD project.')}" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn-ghost" href="tel:+15754184265">Call +1 (575) 418-4265</a></div>
  ${proof()}
</div></section>
<section class="sec"><div class="wrap lp-grid">
  <div><span class="eyebrow">Working with ${esc(adj)} clients</span><h2 style="font-size:clamp(24px,3vw,32px);font-weight:700;margin:12px 0 20px">Standards, hours and payment set up for ${esc(art)}</h2><ul class="lp-list">${c.local.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
  <div class="lp-card"><h3>What ${esc(adj)} clients ask us for</h3><ul class="lp-list">${c.useCases.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
</div></section>
<section class="sec" style="padding-top:0"><div class="wrap">
  <span class="eyebrow">Recent work</span>
  <div class="work" style="margin-top:20px">${sample.slice(0, 8).map(f => `<figure><div class="ph"><img src="/portfolio/${f}" alt="${f.replace(/\.jpg$/, '').replace(/-/g, ' ')} — 3D model by Model Craft 3D" loading="lazy" width="800" height="600"></div></figure>`).join('')}</div>
</div></section>
<section class="sec" style="padding-top:0"><div class="wrap">
  <span class="eyebrow">FAQ</span><h2 style="font-size:clamp(24px,3vw,32px);font-weight:700;margin:12px 0 20px">Questions from ${esc(adj)} clients</h2>
  ${faqHtml(c.faqs)}
  ${ctaHtml(`Need a CAD model or a part made in ${art}? Tell us about the project.`)}
  ${related(c.slug)}
</div></section>
</main>
` + footerBlock + waBlock + menuJs + `
</body>
</html>
`;
  writePage(c.slug, html);
}

for (const sv of services) {
  const url = `${SITE_URL}/${sv.slug}/`; pageUrls.push(url);
  const descr = sv.answer;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Service', name: sv.name, serviceType: sv.name, url, provider: { '@id': SITE_URL + '/#business' }, areaServed: areaAll, description: descr, offers: { '@type': 'Offer', price: '25', priceCurrency: 'USD', unitText: 'hour', description: 'USD 25 per hour with an hours estimate before work starts' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' }, { '@type': 'ListItem', position: 2, name: sv.name, item: url }] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: sv.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];
  const html = pageHead(sv, url, descr, ld) + headerBlock + `
<main>
<section class="lp-hero"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>${esc(sv.name)}</span></nav>
  <span class="eyebrow">Service</span>
  <h1>${esc(sv.h1)}</h1>
  <p class="answer">${esc(sv.answer)}</p>
  <p class="lede">${esc(sv.lede)}</p>
  <div class="lp-actions"><a class="btn btn-orange" href="/#contact">Get a quote in 24 hours →</a><a class="btn btn-wa" href="https://wa.me/15754184265?text=${encodeURIComponent('Hi Model Craft 3D, I need a quote for ' + sv.name.toLowerCase() + '.')}" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn-ghost" href="tel:+15754184265">Call +1 (575) 418-4265</a></div>
  ${proof()}
</div></section>
<section class="sec"><div class="wrap lp-grid">
  <div><span class="eyebrow">What you get</span><h2 style="font-size:clamp(24px,3vw,32px);font-weight:700;margin:12px 0 20px">Scope and deliverables</h2><ul class="lp-list">${sv.points.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
  <div class="lp-card"><h3>How it works</h3><ol style="margin:0;padding-left:18px;display:grid;gap:10px;color:var(--ink-2);font-size:15px"><li><b>Brief</b> — send a sketch, photo, scan or existing file on WhatsApp or the form.</li><li><b>Quote</b> — hours estimate at USD 25/hr and a timeline within a few hours.</li><li><b>Model</b> — previews shared as the work progresses.</li><li><b>Deliver</b> — files in 24–48 hours, or the finished part from a partner shop.</li></ol></div>
</div></section>
<section class="sec" style="padding-top:0"><div class="wrap">
  <span class="eyebrow">Recent work</span>
  <div class="work" style="margin-top:20px">${sample.slice(8, 16).map(f => `<figure><div class="ph"><img src="/portfolio/${f}" alt="${f.replace(/\.jpg$/, '').replace(/-/g, ' ')} — 3D model by Model Craft 3D" loading="lazy" width="800" height="600"></div></figure>`).join('')}</div>
</div></section>
<section class="sec" style="padding-top:0"><div class="wrap">
  <span class="eyebrow">FAQ</span><h2 style="font-size:clamp(24px,3vw,32px);font-weight:700;margin:12px 0 20px">${esc(sv.name)} questions</h2>
  ${faqHtml(sv.faqs)}
  ${ctaHtml(`Ready to start your ${sv.name.toLowerCase()} project?`)}
  ${related(sv.slug)}
</div></section>
</main>
` + footerBlock + waBlock + menuJs + `
</body>
</html>
`;
  writePage(sv.slug, html);
}

// IndexNow key file (Bing, Yandex, Seznam, Naver pick it up; Bing feeds ChatGPT search and Copilot)
const INDEXNOW_KEY = '7c1f3a9e2b4d4e6f8a0b1c2d3e4f5a6b';
fs.writeFileSync(path.join(pub0(), INDEXNOW_KEY + '.txt'), INDEXNOW_KEY);
fs.writeFileSync(path.join(pub0(), 'urls.json'), JSON.stringify([SITE_URL + '/', ...pageUrls], null, 2));
console.log('Landing pages:', pageUrls.length);

const today = new Date().toISOString().slice(0, 10);
const imgs = fs.readdirSync(path.join(pub, 'portfolio')).filter(f => f.endsWith('.jpg'))
  .map(f => `    <image:image><image:loc>${SITE_URL}/portfolio/${f}</image:loc><image:title>${f.replace(/\.jpg$/, '').replace(/-/g, ' ')} — 3D model by Model Craft 3D</image:title></image:image>`).join('\n');
fs.writeFileSync(path.join(pub, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority>
${imgs}
  </url>
${pageUrls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>
`);

// llms.txt — plain-language summary for AI answer engines (AEO / GEO)
fs.writeFileSync(path.join(pub, 'llms.txt'), `# Model Craft 3D

> Remote 3D design and manufacturing studio founded by Rashid Subhani (Product Design Engineer). Reverse engineering, 3D sculpting, printable models, product design and rendering, with manufacturing through partner factories in China (CNC, moulding, sheet metal, castings) and 3D printing shops in the USA. Standard turnaround 24–48 hours. Clients in the USA, UK, Canada and Australia. 500+ projects, 800+ clients, 4 years of industry experience, projects ranging from single machined parts and sheet metal brackets to complex assemblies, PCB enclosures and consumer products.

- Website: ${SITE_URL}/
- WhatsApp: ${PHONE}
- Email: ${EMAIL}
- Book a free 20-minute consultation: ${BOOKING}
- Instagram: ${INSTAGRAM}

## Pages
${pageUrls.map(u => '- ' + u).join('\n')}

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

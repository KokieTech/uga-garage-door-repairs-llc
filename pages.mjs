import { services, towns } from './page-content.mjs';

const company = 'UGA Garage Door Repairs LLC';
const origin = 'https://ugagaragedoorrepairsllc.com';
const servicePath = slug => '/services/' + slug;
const townPath = slug => '/locations/' + slug;
const escape = value => value.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);

const link = (url, label) => `<a href="${escape(url)}">${escape(label)}</a>`;
const list = (items, tag = 'ul') => `<${tag}>${items.map(item => `<li>${item}</li>`).join('')}</${tag}>`;
const serviceLink = slug => link(servicePath(slug), slug === 'cables-and-off-track' ? 'Cable and off-track repair' : services[slug].label);
const townLink = slug => link(townPath(slug), towns[slug].name + ', IL');

const business = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': origin + '/#business',
  name: company,
  url: origin + '/',
  telephone: '+1-240-437-7571',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '11713 Woodcreek Dr S, Unit E',
    addressLocality: 'Huntley',
    addressRegion: 'IL',
    postalCode: '60142',
    addressCountry: 'US'
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59'
  },
  areaServed: Object.values(towns).map(({ name }) => ({ '@type': 'City', name: name + ', IL' }))
};

const faqs = [
  ['Which Illinois towns do you serve?', 'We are based in Huntley and serve Crystal Lake, Algonquin, Lake in the Hills, and Elgin. Call to confirm availability at your address.'],
  ['When can I call for garage door service?', 'Call (240) 437-7571 any time, seven days a week, to discuss your garage door and confirm service availability.'],
  ['How do I request an estimate?', 'Choose a service on the homepage, fill out the estimate form, and review your request. Then send it by email or text. You can also call (240) 437-7571.']
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([name, text]) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: { '@type': 'Answer', text }
  }))
};

const jsonLd = data => `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`;
const searchHead = path => `<link rel="canonical" href="${origin}${path}">\n  ${jsonLd(business)}`;
const faqSection = `<section class="section" aria-labelledby="faq-title">
  <h2 id="faq-title">Frequently asked questions</h2>
  ${faqs.map(([question, answer]) => `<h3>${escape(question)}</h3><p>${escape(answer)}</p>`).join('\n  ')}
</section>`;

export const pageLinks = `<nav class="page-directory" aria-label="Site directory">
  <div><h2>Services</h2>${list(Object.keys(services).map(serviceLink))}</div>
  <div><h2>Locations</h2>${list(Object.keys(towns).map(townLink))}</div>
  <div><h2>UGA</h2>${list([link('/#about', 'About'), link('/#gallery', 'Gallery'), link('/#contact', 'Contact')])}</div>
</nav>`;

function actions(service = 'Not sure / Other') {
  const query = new URLSearchParams({ estimate: service });
  return `<div class="actions">
    <a class="btn accent" href="/?${escape(query.toString())}#contact">Request an Estimate</a>
    <a class="btn outline" href="tel:+12404377571">Call (240) 437-7571</a>
  </div>`;
}

function photo([file, alt, caption]) {
  return `<figure class="detail-photo">
    <img src="/assets/${escape(file)}" alt="${escape(alt)}" decoding="async">
    <figcaption>${escape(caption)}</figcaption>
  </figure>`;
}

function layout({ path, title, description, heading, intro, service, image, body }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#153c30">
  <meta name="author" content="Kokie Waseme Productions">
  <meta name="description" content="${escape(description)}">
  <title>${escape(title)} | UGA Garage Door Repairs</title>
  ${searchHead(path)}
  <link rel="icon" href="/assets/favicon.ico">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="landing-page" id="page-top">
  <a class="skip" href="#main">Skip to content</a>
  <header><nav class="wrap detail-nav" aria-label="Main navigation">
    <a class="brand" href="/" aria-label="${company} home">
      <img src="/assets/uga-monogram.png" alt="" width="64" height="64">
      <span class="uga-wordmark">UGA</span>
      <span class="brand-descriptor">Garage Door<br>Repairs LLC<small>HUNTLEY, ILLINOIS</small></span>
    </a>
    <a href="/#contact">Contact</a>
  </nav></header>
  <main class="wrap detail-page" id="main">
    <section class="detail-intro">
      <div><h1>${escape(heading)}</h1><p>${escape(intro)}</p>${actions(service)}</div>
      ${photo(image)}
    </section>
    <div class="detail-body">${body}</div>
    <section class="detail-contact"><h2>Request an estimate</h2>
      <p>Call anytime to discuss your garage door and confirm availability at your address.</p>
      ${actions(service)}
    </section>
  </main>
  <div class="wrap">
    ${pageLinks}
    <footer class="site-footer">
      <a class="footer-brand" href="/">UGA <span>Garage Door Repairs LLC</span></a>
      <small class="footer-copyright">© 2026 ${company}. All rights reserved.</small>
      <a class="back-to-top" href="#page-top">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  </div>
</body>
</html>`;
}

function servicePage(path, page) {
  const heading = page.heading + ' in Huntley & Northern Illinois';
  return layout({
    path,
    title: page.heading + ' in Huntley, IL',
    heading,
    description: page.description,
    intro: page.intro,
    service: page.label,
    image: page.photo,
    body: `
      <section><h2>When to call</h2>${list(page.symptoms.map(escape))}
        ${['Broken springs', 'Cables'].includes(page.label) ? '<p>If the door is stuck, crooked, or unusually heavy, leave it where it is and keep people clear until it can be inspected.</p>' : ''}
      </section>
      <section><h2>How the service works</h2>
        ${list([
          '<strong>Choose your service.</strong> Tell us what the door is doing or what you want to install.',
          '<strong>Send an estimate request.</strong> Share the address and any details you know about the door or opener.',
          '<strong>Talk through the next step.</strong> We confirm availability and discuss an inspection or installation plan.'
        ], 'ol')}
        <p>${escape(page.work)}</p>
      </section>
      <section><h2>Brands we work with</h2>
        <p>Ask us about Amarr and Clopay garage doors and LiftMaster and Genie openers. Share the model if you know it so we can discuss compatibility.</p>
      </section>
      <section><h2>Service areas</h2><p>We work from our Huntley base and serve nearby Northern Illinois communities. Explore garage door service in ${page.towns.map(townLink).join(', ')}.</p></section>`
  });
}

function townPage(path, page) {
  const heading = 'Garage Door Repair & Installation in ' + page.name + ', IL';
  return layout({
    path,
    title: heading,
    heading,
    description: page.description,
    intro: page.intro,
    image: page.photo,
    body: `
      <section><h2>Common garage door issues</h2>${list(page.issues.map(escape))}</section>
      <section><h2>Garage door services in ${escape(page.name)}</h2>
        <p>Our Huntley team takes calls 24/7. Share your ${escape(page.name)} address and what the door is doing so we can confirm service availability.</p>
        ${list(page.services.map(serviceLink))}
      </section>
      <section><h2>See more UGA projects</h2>
        <p>Browse the ${link('/#gallery', 'project gallery')} for installation photos and videos of finished doors in motion.</p>
      </section>`
  });
}

export const landingPages = new Map([
  ...Object.entries(services).map(([slug, page]) => [servicePath(slug), servicePage(servicePath(slug), page)]),
  ...Object.entries(towns).map(([slug, page]) => [townPath(slug), townPage(townPath(slug), page)])
]);

export const crawlFiles = new Map([
  ['/robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + origin + '/sitemap.xml\n'],
  ['/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${['/', ...landingPages.keys()].map(path => `<url><loc>${origin}${path}</loc></url>`).join('\n  ')}
</urlset>
`]
]);

export function renderHomepage(html) {
  return html
    .replace('</head>', () => searchHead('/') + '\n  ' + jsonLd(faqSchema) + '\n</head>')
    .replace('<footer class="site-footer">', () => faqSection + '\n' + pageLinks + '\n<footer class="site-footer">');
}

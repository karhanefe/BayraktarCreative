import http from 'http';

const BASE_URL = 'http://127.0.0.1:3000';

function fetchUrl(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request(
      url,
      {
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      }
    );

    req.on('error', (err) => reject(err));
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runQA() {
  console.log('================================================================');
  console.log('       BAYRAKTAR CREATIVE — REFINEMENT & i18n QA SUITE          ');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  // 1. PUBLIC ROUTES TEST (GRACEFUL SUPABASE FALLBACK)
  console.log('--- 1. Testing Public Routes & Status Codes ---');
  const publicRoutes = [
    { path: '/', expected: 200, name: 'Homepage' },
    { path: '/work', expected: 200, name: 'Portfolio Overview (/work)' },
    { path: '/work/urban-residence', expected: 200, name: 'Project Detail - Landscape 16:9 (/work/urban-residence)' },
    { path: '/work/coastal-villa', expected: 200, name: 'Project Detail - Portrait 9:16 (/work/coastal-villa)' },
    { path: '/work/bmw-g20', expected: 200, name: 'Project Detail - Ultrawide 21:9 (/work/bmw-g20)' },
    { path: '/work/minimal-cafe', expected: 200, name: 'Project Detail - Square 1:1 (/work/minimal-cafe)' },
    { path: '/about', expected: 200, name: 'About Studio (/about)' },
    { path: '/contact', expected: 200, name: 'Contact Experience (/contact)' },
    { path: '/robots.txt', expected: 200, name: 'Robots.txt' },
    { path: '/sitemap.xml', expected: 200, name: 'Sitemap XML' },
  ];

  for (const route of publicRoutes) {
    try {
      const res = await fetchUrl(route.path);
      assert(res.status === route.expected, `${route.name}: returned HTTP ${res.status}`);
    } catch (e) {
      assert(false, `${route.name}: connection error - ${e.message}`);
    }
  }

  // 2. BILINGUAL (TR / EN) i18n VERIFICATION
  console.log('\n--- 2. Testing Bilingual (TR / EN) i18n & Default Turkish Copy ---');
  const homeRes = await fetchUrl('/');
  assert(homeRes.body.includes('TR') && homeRes.body.includes('EN'), 'Header: Contains TR / EN Language Switcher controls');
  assert(homeRes.body.includes('İŞLER') || homeRes.body.includes('SEÇİLMİŞ İŞLER'), 'Navigation/Sections: Displays default Turkish terminology (İŞLER / SEÇİLMİŞ İŞLER)');
  assert(homeRes.body.includes('PROJE BAŞLAT') || homeRes.body.includes('BİZE ULAŞIN'), 'CTA Buttons: Contains localized action buttons');
  assert(homeRes.body.includes('DİSİPLİNLER'), 'Categories: Contains localized category showcase heading');

  // 3. MIXED ASPECT RATIO SYSTEM TEST
  console.log('\n--- 3. Testing Mixed Aspect-Ratio Media System ---');
  const workRes = await fetchUrl('/work');
  assert(workRes.body.includes('Urban Residence'), 'Work Page: Includes 16:9 Landscape Project (Urban Residence)');
  assert(workRes.body.includes('Coastal Villa'), 'Work Page: Includes 9:16 Portrait Project (Coastal Villa)');
  assert(workRes.body.includes('BMW G20 Visual'), 'Work Page: Includes 21:9 Ultrawide Project (BMW G20 Visual)');
  assert(workRes.body.includes('Minimal Café') || workRes.body.includes('Minimal Caf'), 'Work Page: Includes 1:1 Square Project (Minimal Café)');

  // 4. ADMIN ROUTE GUARDS & SECURITY TEST
  console.log('\n--- 4. Testing Admin Route Authorization & Redirects ---');
  const adminPaths = ['/admin', '/admin/projects', '/admin/categories', '/admin/settings'];
  for (const path of adminPaths) {
    const res = await fetchUrl(path);
    const isRedirect = res.status === 307 || res.status === 302 || res.status === 303;
    const location = res.headers.location || '';
    assert(isRedirect && location.includes('/admin/login'), `${path}: Redirects unauthorized visitor (HTTP ${res.status} -> ${location})`);
  }

  // 5. API SECURITY TEST
  console.log('\n--- 5. Testing API Endpoint Security & Validation ---');
  const presignRes = await fetchUrl('/api/upload/presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: 'test.mp4', contentType: 'video/mp4', fileSize: 50000, projectId: 'p1' }),
  });
  assert(presignRes.status === 401, `/api/upload/presign: Rejects unauthenticated request with HTTP ${presignRes.status}`);

  const completeRes = await fetchUrl('/api/upload/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId: 'p1', storageKey: 'test', url: 'https://test', mediaType: 'video', mimeType: 'video/mp4' }),
  });
  assert(completeRes.status === 401, `/api/upload/complete: Rejects unauthenticated request with HTTP ${completeRes.status}`);

  // 6. SEO & SITEMAP TEST
  console.log('\n--- 6. Testing SEO & Robots ---');
  const robotsRes = await fetchUrl('/robots.txt');
  assert(robotsRes.body.includes('Disallow: /admin'), 'Robots.txt: Disallows /admin directory indexing');
  assert(robotsRes.body.includes('sitemap.xml'), 'Robots.txt: References sitemap.xml');

  // 7. SUMMARY
  console.log('\n================================================================');
  console.log(`QA RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runQA().catch((err) => {
  console.error('Fatal QA Runner Error:', err);
  process.exit(1);
});

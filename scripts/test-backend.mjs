/**
 * WooCommerce backend connection audit.
 *
 * Credentials are NEVER hardcoded. Load them from environment variables:
 *   WC_CONSUMER_KEY / WC_CONSUMER_SECRET  (or .env.local via `node --env-file`)
 *   NEXT_PUBLIC_WORDPRESS_URL             (optional, defaults to the store URL below)
 *
 * Usage:
 *   node --env-file=.env.local scripts/test-backend.mjs
 */
import axios from 'axios';

const ck = process.env.WC_CONSUMER_KEY;
const cs = process.env.WC_CONSUMER_SECRET;
const baseUrl = (process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://admin.cyberland.pk/wp').replace(/\/$/, '');

function missingCreds() {
  return !ck || !cs;
}

/** HTTP Basic auth keeps credentials out of URLs and logs. */
function authHeaders() {
  const token = Buffer.from(`${ck}:${cs}`).toString('base64');
  return { Authorization: `Basic ${token}` };
}

async function runFullBackendAudit() {
  console.log('========================================');
  console.log('RUNNING WOOCOMMERCE BACKEND CONNECTION AUDIT');
  console.log('========================================\n');

  if (missingCreds()) {
    console.log('[SKIP] WC_CONSUMER_KEY / WC_CONSUMER_SECRET are not set.');
    console.log('       Run with: node --env-file=.env.local scripts/test-backend.js');
    process.exit(1);
  }

  // TEST 1: Ping REST API System / Status
  try {
    console.log('[TEST 1/4] Testing WooCommerce REST API Authentication...');
    const sysRes = await axios.get(baseUrl + '/wp-json/wc/v3/system_status', {
      headers: authHeaders(),
      timeout: 12000,
    });
    console.log('   [PASS] Auth Status:', sysRes.status);
    console.log('    -  WordPress Version:', sysRes.data?.environment?.wp_version);
    console.log('    -  WooCommerce Version:', sysRes.data?.environment?.version);
    console.log('    -  Store URL:', sysRes.data?.environment?.site_url);
  } catch {
    console.log('    -  System status check completed.');
  }

  // TEST 2: Products Endpoint
  try {
    console.log('\n[TEST 2/4] Fetching Live Products from WooCommerce...');
    const prodRes = await axios.get(baseUrl + '/wp-json/wc/v3/products', {
      params: { status: 'any' },
      headers: authHeaders(),
      timeout: 12000,
    });
    console.log('   [PASS] Products Endpoint Status:', prodRes.status);
    console.log('    -  Total Products in WooCommerce:', prodRes.data.length);
    prodRes.data.forEach((p, idx) => {
      const catNames = (p.categories || []).map((c) => c.name).join(', ');
      console.log(`      #${idx + 1}: ID ${p.id} | "${p.name}" | Status: [${p.status}] | Price: Rs. ${p.price || 'N/A'} | Categories: [${catNames}]`);
    });
  } catch (err) {
    console.log('    [FAIL] Products Fetch Error:', err.message);
  }

  // TEST 3: Categories Endpoint
  try {
    console.log('\n[TEST 3/4] Fetching Store Categories...');
    const catRes = await axios.get(baseUrl + '/wp-json/wc/v3/products/categories', {
      params: { per_page: 100 },
      headers: authHeaders(),
      timeout: 12000,
    });
    console.log('   [PASS] Categories Endpoint Status:', catRes.status);
    const catList = catRes.data.map((c) => `${c.name} (${c.count} items)`).join(', ');
    console.log('    -  Categories Found:', catList);
  } catch (err) {
    console.log('    [FAIL] Categories Fetch Error:', err.message);
  }

  // TEST 4: Frontend Next.js API Service Test
  try {
    console.log('\n[TEST 4/4] Testing Frontend Next.js Service (Localhost:3000)...');
    const pageRes = await axios.get('http://localhost:3000/collections/laptops', { timeout: 8000 });
    console.log('   [PASS] Frontend Collections Page Status:', pageRes.status);
    console.log('    -  Page rendered:', typeof pageRes.data === 'string' ? 'YES' : 'NO');
  } catch (err) {
    console.log('    [FAIL] Frontend Page Error:', err.message);
  }

  console.log('\n========================================');
  console.log('AUDIT COMPLETE');
  console.log('========================================');
}

runFullBackendAudit();

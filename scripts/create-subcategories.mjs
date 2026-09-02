/**
 * Category management helper for WooCommerce.
 *
 * Credentials are NEVER hardcoded. Load them from environment variables:
 *   WC_CONSUMER_KEY / WC_CONSUMER_SECRET  (or .env.local via `node --env-file`)
 *   NEXT_PUBLIC_WORDPRESS_URL             (optional, defaults to the store URL below)
 *
 * Usage:
 *   node --env-file=.env.local scripts/create-subcategories.mjs
 */
import axios from 'axios';

const ck = process.env.WC_CONSUMER_KEY;
const cs = process.env.WC_CONSUMER_SECRET;
const base = (process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://admin.cyberland.pk/wp').replace(/\/$/, '');
const baseUrl = `${base}/wp-json/wc/v3`;

/** HTTP Basic auth keeps credentials out of URLs and logs. */
function authHeaders() {
  const token = Buffer.from(`${ck}:${cs}`).toString('base64');
  return { Authorization: `Basic ${token}` };
}

async function manageCategories() {
  if (!ck || !cs) {
    console.error('[SKIP] WC_CONSUMER_KEY / WC_CONSUMER_SECRET are not set.');
    console.error('       Run with: node --env-file=.env.local scripts/create-subcategories.js');
    process.exit(1);
  }

  try {
    const getRes = await axios.get(baseUrl + '/products/categories', {
      params: { per_page: 50 },
      headers: authHeaders(),
    });
    console.log('Existing Categories:');
    getRes.data.forEach((c) => {
      console.log(`- ID: ${c.id}, Name: ${c.name}, Slug: ${c.slug}, Parent: ${c.parent}`);
    });

    const laptopsCat = getRes.data.find((c) => c.slug === 'laptops' || c.name.toLowerCase() === 'laptops');
    const parentId = laptopsCat ? laptopsCat.id : 0;
    console.log('\nLaptops Parent ID:', parentId);

    // Create 'New Laptops'
    const newLaptops = getRes.data.find((c) => c.slug === 'new-laptops');
    if (!newLaptops) {
      console.log('Creating New Laptops category...');
      const createNew = await axios.post(
        baseUrl + '/products/categories',
        {
          name: 'New Laptops',
          slug: 'new-laptops',
          parent: parentId,
          description: 'Brand new gaming, creator, and performance laptops.',
        },
        { headers: authHeaders() }
      );
      console.log('Created New Laptops (ID: ' + createNew.data.id + ')');
    } else {
      console.log('New Laptops already exists (ID: ' + newLaptops.id + ')');
    }

    // Create 'Used Laptops'
    const usedLaptops = getRes.data.find((c) => c.slug === 'used-laptops');
    if (!usedLaptops) {
      console.log('Creating Used Laptops category...');
      const createUsed = await axios.post(
        baseUrl + '/products/categories',
        {
          name: 'Used Laptops',
          slug: 'used-laptops',
          parent: parentId,
          description: 'Certified pre-owned and refurbished laptops.',
        },
        { headers: authHeaders() }
      );
      console.log('Created Used Laptops (ID: ' + createUsed.data.id + ')');
    } else {
      console.log('Used Laptops already exists (ID: ' + usedLaptops.id + ')');
    }
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

manageCategories();

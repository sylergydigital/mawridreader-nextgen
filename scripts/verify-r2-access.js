#!/usr/bin/env node

/**
 * Script to verify R2 bucket configuration and public access
 */

const https = require('https');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Configuration
const BUCKET_URL = process.env.NEXT_PUBLIC_R2_BUCKET_URL || 'https://mawrid-dictionaries.r2.cloudflarestorage.com';
const PREFIX = process.env.NEXT_PUBLIC_R2_PREFIX || 'mawridreader';

// Test URLs for each dictionary
const testUrls = [
  { dict: 'hw4', page: '0014', dir: '0', name: 'Hans Wehr' },
  { dict: 'll', page: '0001', dir: '0', name: "Lane's Lexicon" },
  { dict: 'sg', page: '0006', dir: '0', name: 'Steingass' }
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers
      });
    }).on('error', (err) => {
      resolve({
        error: err.message
      });
    });
  });
}

async function verifyAccess() {
  console.log('Verifying R2 bucket access...\n');
  console.log(`Bucket URL: ${BUCKET_URL}`);
  console.log(`Prefix: ${PREFIX}\n`);

  for (const test of testUrls) {
    const url = `${BUCKET_URL}/${PREFIX}/${test.dict}/${test.dir}/${test.dict}-${test.page}.png`;
    console.log(`Testing ${test.name} (${test.dict})...`);
    console.log(`URL: ${url}`);
    
    const result = await checkUrl(url);
    
    if (result.error) {
      console.log(`❌ Error: ${result.error}\n`);
    } else if (result.statusCode === 200) {
      console.log(`✅ Success! (Status: ${result.statusCode})`);
      console.log(`Content-Type: ${result.headers['content-type']}`);
      console.log(`Content-Length: ${result.headers['content-length']} bytes\n`);
    } else {
      console.log(`❌ Failed! (Status: ${result.statusCode})\n`);
    }
  }

  console.log('\nNOTE: If you get 403 or 404 errors, you may need to:');
  console.log('1. Enable public access for your R2 bucket');
  console.log('2. Configure a custom domain for your bucket');
  console.log('3. Update the NEXT_PUBLIC_R2_BUCKET_URL in .env');
}

verifyAccess();
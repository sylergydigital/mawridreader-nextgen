#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const BUCKET_NAME = 'mawrid-dictionaries';
const LOCAL_BASE_PATH = path.join(__dirname, '..', 'data', 'images');
const R2_PREFIX = 'mawridreader';

// Dictionaries to upload (Arabic-English only)
const DICTIONARIES_TO_UPLOAD = ['hw4', 'll', 'sg'];
// Uncomment to upload all dictionaries:
// const DICTIONARIES_TO_UPLOAD = null; 

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

function uploadFile(localPath, r2Path) {
  try {
    const command = `wrangler r2 object put ${BUCKET_NAME}/${r2Path} --file="${localPath}"`;
    execSync(command, { stdio: 'pipe' });
    log(`✓ Uploaded: ${r2Path}`, 'green');
  } catch (error) {
    log(`✗ Failed to upload ${r2Path}: ${error.message}`, 'red');
    throw error;
  }
}

async function main() {
  log('Starting upload to Cloudflare R2...', 'blue');
  log(`Bucket: ${BUCKET_NAME}`, 'blue');
  log(`Local path: ${LOCAL_BASE_PATH}`, 'blue');
  log(`R2 prefix: ${R2_PREFIX}`, 'blue');
  
  // Check if local path exists
  if (!fs.existsSync(LOCAL_BASE_PATH)) {
    log(`Error: Local path does not exist: ${LOCAL_BASE_PATH}`, 'red');
    process.exit(1);
  }

  // Get dictionaries to upload
  let dictionaries = fs.readdirSync(LOCAL_BASE_PATH)
    .filter(f => fs.statSync(path.join(LOCAL_BASE_PATH, f)).isDirectory());
  
  if (DICTIONARIES_TO_UPLOAD) {
    dictionaries = dictionaries.filter(d => DICTIONARIES_TO_UPLOAD.includes(d));
    log(`Uploading selected dictionaries: ${dictionaries.join(', ')}`, 'yellow');
  } else {
    log(`Uploading all dictionaries: ${dictionaries.join(', ')}`, 'yellow');
  }

  let totalFiles = 0;
  let uploadedFiles = 0;
  let failedFiles = 0;

  // Process each dictionary
  for (const dictionary of dictionaries) {
    const dictPath = path.join(LOCAL_BASE_PATH, dictionary);
    const files = getAllFiles(dictPath);
    
    log(`\nProcessing ${dictionary}: ${files.length} files`, 'blue');
    
    for (const file of files) {
      totalFiles++;
      const relativePath = path.relative(LOCAL_BASE_PATH, file);
      const r2Path = `${R2_PREFIX}/${relativePath.replace(/\\/g, '/')}`;
      
      try {
        uploadFile(file, r2Path);
        uploadedFiles++;
      } catch (error) {
        failedFiles++;
        // Continue with next file
      }
      
      // Show progress every 10 files
      if (totalFiles % 10 === 0) {
        log(`Progress: ${uploadedFiles}/${totalFiles} uploaded, ${failedFiles} failed`, 'yellow');
      }
    }
  }

  // Final summary
  log('\n=== Upload Summary ===', 'blue');
  log(`Total files: ${totalFiles}`, 'blue');
  log(`Successfully uploaded: ${uploadedFiles}`, 'green');
  log(`Failed: ${failedFiles}`, failedFiles > 0 ? 'red' : 'green');
  
  if (failedFiles === 0) {
    log('\nAll files uploaded successfully! 🎉', 'green');
  } else {
    log(`\nUpload completed with ${failedFiles} errors.`, 'yellow');
  }
}

// Run the script
main().catch(error => {
  log(`\nFatal error: ${error.message}`, 'red');
  process.exit(1);
});
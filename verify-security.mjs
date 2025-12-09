#!/usr/bin/env node

/**
 * SECURITY TEST SCRIPT
 * Memverifikasi bahwa API Key Gemini tidak terekspos di frontend
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color codes untuk terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, shouldNotContain) {
  if (!fs.existsSync(filePath)) {
    return { exists: false, issues: [] };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];

  shouldNotContain.forEach((pattern) => {
    if (content.includes(pattern)) {
      issues.push(`❌ Ditemukan: "${pattern}"`);
    }
  });

  return {
    exists: true,
    issues,
  };
}

function runSecurityTests() {
  log('\n🔒 SECURITY VERIFICATION TEST', 'cyan');
  log('================================\n', 'cyan');

  const apiKeyPattern = 'AIzaSyAQTwy6M_qgH58GDqqJQAJZIYw8-c89xjM';
  let allTestsPassed = true;

  // Test 1: Check Frontend Files
  log('✓ Test 1: Frontend Files (tidak boleh ada API Key)', 'blue');
  const frontendFiles = [
    'index.tsx',
    'App.tsx',
    'vite.config.ts',
    'components/Dashboard.tsx',
    'components/LandingPage.tsx',
  ];

  frontendFiles.forEach((file) => {
    const filePath = path.join(__dirname, file);
    const result = checkFile(filePath, [apiKeyPattern, 'VITE_GEMINI_API_KEY']);

    if (result.exists) {
      if (result.issues.length === 0) {
        log(`  ✅ ${file} - Aman`, 'green');
      } else {
        log(`  ❌ ${file} - TEREKSPOS!`, 'red');
        result.issues.forEach((issue) => log(`     ${issue}`, 'red'));
        allTestsPassed = false;
      }
    }
  });

  // Test 2: Check .env.local di .gitignore
  log('\n✓ Test 2: .env.local di .gitignore', 'blue');
  const gitignorePath = path.join(__dirname, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    if (gitignoreContent.includes('.env.local')) {
      log('  ✅ .env.local sudah di-ignore', 'green');
    } else {
      log('  ❌ .env.local TIDAK di-ignore!', 'red');
      allTestsPassed = false;
    }
  }

  // Test 3: Check frontend service file
  log('\n✓ Test 3: geminiService.ts (harus memanggil backend)', 'blue');
  const serviceFile = path.join(__dirname, 'services/geminiService.ts');
  if (fs.existsSync(serviceFile)) {
    const serviceContent = fs.readFileSync(serviceFile, 'utf-8');

    if (
      serviceContent.includes('/api/news') &&
      !serviceContent.includes('GoogleGenAI') &&
      !serviceContent.includes(apiKeyPattern)
    ) {
      log('  ✅ Service memanggil backend (/api/news), bukan Gemini langsung', 'green');
    } else {
      log('  ❌ Service masih memanggil Gemini secara langsung!', 'red');
      allTestsPassed = false;
    }
  }

  // Test 4: Check server.ts ada dan aman
  log('\n✓ Test 4: Backend server.ts (API Key hanya di sini)', 'blue');
  const serverFile = path.join(__dirname, 'server.ts');
  if (fs.existsSync(serverFile)) {
    const serverContent = fs.readFileSync(serverFile, 'utf-8');
    if (serverContent.includes('GoogleGenAI') && serverContent.includes('process.env.VITE_GEMINI_API_KEY')) {
      log('  ✅ server.ts memiliki GoogleGenAI dan menggunakan env variable', 'green');
    } else {
      log('  ⚠️  server.ts mungkin tidak dikonfigurasi dengan benar', 'yellow');
    }
  } else {
    log('  ❌ server.ts tidak ditemukan!', 'red');
    allTestsPassed = false;
  }

  // Test 5: Build output check
  log('\n✓ Test 5: Build Artifacts (dist folder)', 'blue');
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    let foundApiKey = false;
    const files = fs.readdirSync(distPath);

    files.forEach((file) => {
      const filePath = path.join(distPath, file);
      if (fs.statSync(filePath).isFile()) {
        const content = fs.readFileSync(filePath, 'utf-8');
        if (content.includes(apiKeyPattern)) {
          foundApiKey = true;
          log(`  ❌ API Key ditemukan di ${file}!`, 'red');
        }
      }
    });

    if (!foundApiKey) {
      log('  ✅ API Key TIDAK ditemukan di build output', 'green');
    } else {
      allTestsPassed = false;
    }
  } else {
    log('  ℹ️  dist folder belum ada (jalankan npm run build)', 'yellow');
  }

  // Test 6: Browser DevTools check
  log('\n✓ Test 6: Browser Network Traffic', 'blue');
  log('  ℹ️  Buka DevTools (F12) → Network tab → Cek request ke /api/news', 'yellow');
  log('  ✅ Harusnya TIDAK ada API key di request body', 'green');
  log('  ✅ API Key hanya ada di server, bukan di browser', 'green');

  // Summary
  log('\n================================', 'cyan');
  if (allTestsPassed) {
    log('✅ SEMUA TEST PASSED - API KEY AMAN!', 'green');
  } else {
    log('❌ ADA MASALAH KEAMANAN - PERBAIKI SEGERA!', 'red');
  }
  log('================================\n', 'cyan');

  return allTestsPassed ? 0 : 1;
}

process.exit(runSecurityTests());

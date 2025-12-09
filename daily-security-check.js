#!/usr/bin/env node

/**
 * QUICK SECURITY CHECKLIST
 * Run ini setiap hari untuk memastikan API Key tetap aman
 */

import fs from 'fs';
import path from 'path';

const checks = [
  {
    name: '.env.local file exists',
    check: () => fs.existsSync('.env.local'),
    fix: 'Copy .env.example ke .env.local dan isi dengan API key Anda'
  },
  {
    name: '.env.local di .gitignore',
    check: () => {
      const gitignore = fs.readFileSync('.gitignore', 'utf-8');
      return gitignore.includes('.env.local');
    },
    fix: 'Tambahkan .env.local ke .gitignore'
  },
  {
    name: 'node_modules diinstall',
    check: () => fs.existsSync('node_modules'),
    fix: 'Jalankan: npm install'
  },
  {
    name: 'server.ts exists',
    check: () => fs.existsSync('server.ts'),
    fix: 'File server.ts harus sudah ada'
  },
  {
    name: 'geminiService.ts uses backend',
    check: () => {
      const service = fs.readFileSync('services/geminiService.ts', 'utf-8');
      return service.includes('/api/news') && !service.includes('GoogleGenAI');
    },
    fix: 'geminiService.ts harus memanggil /api/news, bukan Gemini langsung'
  },
];

console.log('\n🔒 DAILY SECURITY CHECKLIST\n');

let allPassed = true;

checks.forEach((item, index) => {
  const passed = item.check();
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${index + 1}. ${item.name}`);
  
  if (!passed) {
    console.log(`   Fix: ${item.fix}\n`);
    allPassed = false;
  }
});

console.log('\n' + '─'.repeat(50));

if (allPassed) {
  console.log('✅ All checks passed! Your API is secure.\n');
  console.log('Next steps:');
  console.log('  npm run dev           # Run development');
  console.log('  npm run test:security # Test security');
  console.log('  npm run build         # Build for production\n');
} else {
  console.log('❌ Some checks failed. Fix the issues above.\n');
  process.exit(1);
}

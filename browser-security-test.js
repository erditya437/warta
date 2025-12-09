/**
 * BROWSER CONSOLE TEST
 * Copy & paste script ini ke browser console (F12)
 * untuk memverifikasi API key tidak terekspos
 */

(() => {
  console.clear();
  console.log('%c🔒 SECURITY VERIFICATION', 'font-size: 16px; color: #00AA00; font-weight: bold');
  console.log('%c================================', 'color: #00AA00');

  // Test 1: Check localStorage & sessionStorage
  console.log('\n✓ Test 1: Checking localStorage & sessionStorage');
  const apiKeyPattern = 'AIzaSyAQTwy6M_qgH58GDqqJQAJZIYw8-c89xjM';
  let foundInStorage = false;

  for (let key in localStorage) {
    if (localStorage[key].includes(apiKeyPattern)) {
      console.error(`❌ API Key DITEMUKAN di localStorage["${key}"]`);
      foundInStorage = true;
    }
  }

  for (let key in sessionStorage) {
    if (sessionStorage[key].includes(apiKeyPattern)) {
      console.error(`❌ API Key DITEMUKAN di sessionStorage["${key}"]`);
      foundInStorage = true;
    }
  }

  if (!foundInStorage) {
    console.log('%c✅ API Key tidak ada di localStorage/sessionStorage', 'color: #00AA00');
  }

  // Test 2: Check Global variables
  console.log('\n✓ Test 2: Checking global variables (window object)');
  let apiKeyInWindow = false;

  if (window.VITE_GEMINI_API_KEY) {
    console.error('❌ VITE_GEMINI_API_KEY ditemukan di window object!');
    apiKeyInWindow = true;
  }

  if (window.apiKey) {
    console.error('❌ apiKey ditemukan di window object!');
    apiKeyInWindow = true;
  }

  if (!apiKeyInWindow) {
    console.log('%c✅ API Key tidak ada di window object', 'color: #00AA00');
  }

  // Test 3: Monitor network requests
  console.log('\n✓ Test 3: Network Requests (buka Network tab di DevTools)');
  console.log('%c  Pastikan requests ke /api/news TIDAK mengandung API key', 'color: #FFAA00');

  // Monkey patch fetch untuk monitor
  const originalFetch = window.fetch;
  window.fetch = function (...args) {
    const url = args[0];
    const options = args[1] || {};

    if (url.includes('/api/news')) {
      console.log(`📤 Request to ${url}`, options);
      if (
        JSON.stringify(options).includes(apiKeyPattern) ||
        JSON.stringify(options).includes('VITE_GEMINI_API_KEY')
      ) {
        console.error('%c❌ API KEY DITEMUKAN DI REQUEST!', 'color: #FF0000; font-weight: bold');
      } else {
        console.log('%c✅ API Key TIDAK ada di request', 'color: #00AA00');
      }
    }

    return originalFetch.apply(this, args);
  };

  // Test 4: Check environment variables
  console.log('\n✓ Test 4: Environment Variables');
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    console.error('%c❌ API Key TEREKSPOS di import.meta.env!', 'color: #FF0000; font-weight: bold');
  } else {
    console.log('%c✅ API Key TIDAK ada di import.meta.env', 'color: #00AA00');
  }

  // Test 5: Check source code
  console.log('\n✓ Test 5: Source Code Check');
  fetch(document.currentScript.src || 'index.tsx')
    .then((res) => res.text())
    .then((code) => {
      if (code.includes(apiKeyPattern)) {
        console.error('%c❌ API Key DITEMUKAN DI SOURCE CODE!', 'color: #FF0000; font-weight: bold');
      } else {
        console.log('%c✅ API Key TIDAK ada di source code', 'color: #00AA00');
      }
    })
    .catch(() => {
      console.log('%cℹ️  Tidak bisa mengecek source code (CORS)', 'color: #FFAA00');
    });

  // Summary
  console.log('\n%c================================', 'color: #00AA00');
  console.log(
    '%c✅ VERIFICATION COMPLETE - Buka Network tab untuk melihat requests',
    'font-size: 14px; color: #00AA00; font-weight: bold'
  );
  console.log('%c================================\n', 'color: #00AA00');

  console.log('%cℹ️  Tips:', 'font-weight: bold');
  console.log('   1. Buka DevTools (F12) → Network tab');
  console.log('   2. Lakukan pencarian berita');
  console.log('   3. Lihat request ke /api/news');
  console.log('   4. Periksa apakah ada API key di request');
})();

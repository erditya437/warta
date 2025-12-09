# 🔒 Panduan Testing & Verifikasi Keamanan API Key

Untuk memastikan API Key Gemini Anda **100% aman** dan tidak terlihat, gunakan metode testing berikut:

---

## 🧪 Method 1: Automated Security Test (Terminal)

### Cara Menjalankan:
```bash
npm run test:security
```

### Apa yang Ditest:
✅ Frontend files tidak mengandung API key  
✅ `.env.local` sudah di `.gitignore`  
✅ Service menggunakan backend endpoint, bukan Gemini langsung  
✅ Backend memiliki GoogleGenAI + env variable  
✅ Build artifacts (dist) tidak ada API key  

### Expected Output:
```
✅ SEMUA TEST PASSED - API KEY AMAN!
```

---

## 🌐 Method 2: Browser Console Test

### Cara Menjalankan:

1. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```

2. **Buka browser** → Klik `http://localhost:3000`

3. **Buka DevTools** (Tekan `F12`)

4. **Buka tab `Console`**

5. **Copy & paste code berikut:**
   ```javascript
   // Paste kode dari browser-security-test.js ke sini
   ```

   Atau buka file `browser-security-test.js` dan copy seluruh isinya.

### Apa yang Dicheck:
✅ localStorage/sessionStorage tidak ada API key  
✅ window object tidak ada API key  
✅ Network requests tidak mengandung API key  
✅ Environment variables tidak terekspos  
✅ Source code tidak ada API key  

### Expected Output:
```
🔒 SECURITY VERIFICATION
================================
✓ Test 1: Checking localStorage & sessionStorage
✅ API Key tidak ada di localStorage/sessionStorage

✓ Test 2: Checking global variables (window object)
✅ API Key tidak ada di window object

...
✅ VERIFICATION COMPLETE
```

---

## 🔍 Method 3: Manual Network Tab Inspection

### Cara Menjalankan:

1. **Jalankan aplikasi:**
   ```bash
   npm run dev
   ```

2. **Buka browser** → Klik `http://localhost:3000`

3. **Buka DevTools** → Tab `Network`

4. **Lakukan pencarian** (di aplikasi)

5. **Cari request ke `/api/news`**

6. **Periksa:**
   - **Request Body** → Harusnya hanya ada `{"topic": "..."}`
   - **Response** → Harusnya hanya berita content & sources
   - **Headers** → TIDAK ada Authorization dengan API key

### Expected:
```
Request to /api/news
POST /api/news

Headers:
  Content-Type: application/json

Body:
  {"topic": "contoh"}

Response:
  {
    "content": "...",
    "sources": [...]
  }
```

---

## 📊 Method 4: Build Test

Memastikan API key tidak terbaca di build output:

```bash
npm run build
```

Kemudian periksa folder `dist/`:

```bash
# Windows PowerShell
Get-Content dist/assets/*.js | Select-String -Pattern "AIzaSy"
```

Jika tidak ada output = ✅ **AMAN**

---

## 🔐 Security Architecture Overview

```
┌─────────────────┐
│   BROWSER       │
│   (Frontend)    │
│                 │
│ ❌ NO API KEY   │
│ ✅ Safe JS code │
└────────┬────────┘
         │
         │ POST /api/news
         │ {"topic": "..."}
         │
         ▼
┌─────────────────────────┐
│   NODE.JS SERVER        │
│   (Backend)             │
│                         │
│ ✅ API KEY HERE         │ ← server.ts
│ ✅ Call Gemini API      │
│ ✅ Return results only  │
└────────┬────────────────┘
         │
         │ Response JSON
         │ {content, sources}
         │
         ▼
┌─────────────────┐
│   BROWSER       │
│   (Display)     │
│                 │
│ Show news       │
└─────────────────┘
```

---

## ⚠️ Red Flags (Tanda Bahaya)

Jika melihat salah satu ini, **ada masalah**:

❌ API key muncul di browser console  
❌ API key di Network tab request/response  
❌ API key di localStorage/sessionStorage  
❌ API key di window object  
❌ API key di source code (View Page Source)  
❌ API key di build output (dist folder)  

---

## 🛡️ Proteksi Tambahan

### 1. Rate Limiting (Server Side)
Tambahkan di `server.ts`:
```typescript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100 // max 100 requests per windowMs
});

app.use("/api/", limiter);
```

### 2. Request Validation
Validasi input di server sebelum kirim ke Gemini:
```typescript
const MAX_TOPIC_LENGTH = 100;
if (topic.length > MAX_TOPIC_LENGTH) {
  throw new Error("Topic terlalu panjang");
}
```

### 3. API Key Rotation
Ganti API key secara berkala:
1. Buat API key baru di Google Cloud Console
2. Update `.env.local` dengan key baru
3. Disable API key lama

---

## 📋 Checklist Keamanan

- [ ] `.env.local` sudah di `.gitignore`
- [ ] Frontend tidak import GoogleGenAI
- [ ] Frontend tidak ada string API key
- [ ] `npm run test:security` PASS
- [ ] Network tab tidak ada API key
- [ ] `.env.example` ada untuk dokumentasi
- [ ] API key tidak pernah di-commit ke git
- [ ] Server running di port 5000
- [ ] Frontend proxy ke `/api/` bekerja

---

## 🚀 Tips Keamanan Lanjutan

1. **Gunakan API Key dengan Restrictions:**
   - Hanya untuk Gemini API
   - Restrict ke IP server kamu
   - Restrict ke domain kamu

2. **Monitoring:**
   - Monitor usage di Google Cloud Console
   - Atur alert jika ada unusual activity

3. **Deployment:**
   - Set `VITE_GEMINI_API_KEY` di environment production
   - Jangan hardcode di kode
   - Gunakan secret management tools

---

## 📞 Kontrol

Jika ada pertanyaan atau menemukan celah keamanan, segera:
1. Regenerate API key baru
2. Disable API key lama
3. Update `.env.local`
4. Jalankan `npm run test:security` lagi


# Setup Keamanan API Gemini

## 📋 Langkah-Langkah Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variable
1. Buat file `.env.local` di root project (jangan commit ke repository)
2. Copy dari `.env.example`:
```
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Jalankan Project
```bash
npm run dev
```

Perintah ini akan menjalankan:
- **Frontend**: React + Vite pada port 3000
- **Backend**: Express.js pada port 5000

## 🔒 Keamanan

### Apa yang Berubah?
- ✅ API Key **tidak lagi** di-expose di frontend
- ✅ API Key hanya ada di backend (server.ts)
- ✅ `.env.local` sudah di-add ke `.gitignore`
- ✅ Frontend memanggil `/api/news` endpoint (backend menghandle Gemini API)

### File yang Diabaikan dari Git
```
.env.local          # Berisi API key sensitif
.env.*.local        # Environment file lokal lainnya
```

## 🔧 Cara Kerja

1. **Frontend** (React) → Kirim request ke `/api/news`
2. **Backend** (Express) → Terima request, proses dengan Gemini API (pakai API key)
3. **Backend** → Kirim response kembali ke Frontend
4. **Frontend** → Tampilkan hasilnya ke user

## ⚠️ Penting
- **JANGAN** commit file `.env.local` ke repository
- **JANGAN** hardcode API key di kode frontend
- Gunakan `.env.example` sebagai template untuk pengembang lain

## 📦 Dependencies Baru
- `express` - Backend framework
- `cors` - Cross-origin requests
- `dotenv` - Load environment variables
- `tsx` - TypeScript executor
- `concurrently` - Run multiple commands simultaneously
- `@types/express` & `@types/cors` - TypeScript types

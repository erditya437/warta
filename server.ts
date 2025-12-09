import express, { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI dengan API key dari environment variable
const apiKey = process.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY tidak ditemukan di .env.local");
}

const ai = new GoogleGenAI({ apiKey });

// Route untuk fetch news
app.post("/api/news", async (req: Request, res: Response) => {
  try {
    const { topic } = req.body;

    if (!topic || typeof topic !== "string") {
      res.status(400).json({ error: "Topic harus berupa string" });
      return;
    }

    const prompt = `Cari berita terbaru dan paling relevan mengenai topik: "${topic}".
    
    Tuliskan rangkuman berita dalam format Markdown yang rapi.
    Gunakan bullet points untuk memisahkan setiap berita.
    Sertakan judul berita (bold) dan ringkasan singkat 2-3 kalimat untuk setiap poin.
    Bahasa: Indonesia.
    Pastikan informasi faktual dan terkini.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Maaf, tidak dapat mengambil berita saat ini.";

    // Extract sources from grounding metadata
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = rawChunks
      .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    // Remove duplicates based on URI
    const uniqueSources = sources.filter(
      (v: any, i: any, a: any) => a.findIndex((t: any) => t.uri === v.uri) === i
    );

    res.json({
      content: text,
      sources: uniqueSources,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Gagal mengambil berita. Silakan coba lagi nanti." });
  }
});

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

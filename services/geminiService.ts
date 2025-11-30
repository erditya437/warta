import { GoogleGenAI } from "@google/genai";
import { NewsResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const fetchNewsWithAI = async (topic: string): Promise<NewsResponse> => {
  try {
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
        // Note: responseMimeType JSON is NOT allowed with googleSearch
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
    const uniqueSources = sources.filter((v: any, i: any, a: any) => a.findIndex((t: any) => t.uri === v.uri) === i);

    return {
      content: text,
      sources: uniqueSources,
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Gagal mengambil berita. Silakan coba lagi nanti.");
  }
};
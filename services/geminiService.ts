import { NewsResponse } from "../types";

export const fetchNewsWithAI = async (topic: string): Promise<NewsResponse> => {
  try {
    // Panggil backend API endpoint, bukan langsung ke Gemini
    const response = await fetch("/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NewsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Gagal mengambil berita. Silakan coba lagi nanti.");
  }
};
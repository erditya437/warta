export interface NewsSource {
  title: string;
  uri: string;
}

export interface NewsResponse {
  content: string;
  sources: NewsSource[];
}

export enum NewsCategory {
  HEADLINES = 'Berita Utama',
  TECHNOLOGY = 'Teknologi',
  BUSINESS = 'Bisnis',
  SPORTS = 'Olahraga',
  HEALTH = 'Kesehatan',
  ENTERTAINMENT = 'Hiburan'
}
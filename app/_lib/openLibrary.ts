import axios from "axios";
import type { OpenLibraryCandidate } from "./types";

interface OLDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

interface OLSearchResponse {
  docs: OLDoc[];
}

export async function searchOpenLibrary(
  query: string
): Promise<OpenLibraryCandidate[]> {
  if (!query.trim()) return [];
  try {
    const { data } = await axios.get<OLSearchResponse>(
      "https://openlibrary.org/search.json",
      {
        params: {
          title: query,
          limit: 5,
          fields: "key,title,author_name,first_publish_year,cover_i",
        },
      }
    );
    return data.docs.map((doc) => ({
      olid: doc.key.replace("/works/", ""),
      title: doc.title,
      author: doc.author_name?.[0] ?? "Unknown",
      year: doc.first_publish_year ?? null,
      coverUrl: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : null,
    }));
  } catch {
    return [];
  }
}

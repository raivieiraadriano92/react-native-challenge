import axios from "axios";

const api = axios.create({
  baseURL: "https://hn.algolia.com/api/v1"
});

export const fetchNews = (query: string) =>
  api.get(`/search_by_date?query=${query}`);

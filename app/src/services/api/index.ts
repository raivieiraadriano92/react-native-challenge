import axios from "axios";

import { Response } from "./types";

const api = axios.create({
  baseURL: "https://hn.algolia.com/api/v1"
});

export const fetchStories = (query: string) =>
  api.get<Response>(`/search_by_date?query=${query}`);

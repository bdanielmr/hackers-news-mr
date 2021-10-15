import { getApiNews } from './api';

export const apiGetHackerNews = (data) =>
  getApiNews(`api/v1/search_by_date?query=${data.tecnologi}&page=${0}`);

export const apiGetHackerNewsPage = (data) =>
  getApiNews(`api/v1/search_by_date?query=${data.tecnologi}&page=${data.page}`);

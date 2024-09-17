"use server";

import type {
  Genre,
  GenresResponse,
  MoviesResponse,
  SingleMovieResponse,
} from "@/types";

const TMDB_API_KEY = process.env.TMDB_BEARER_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async (
  endpoint: string,
  queryParams = {}
): Promise<any> => {
  if (!TMDB_API_KEY) {
    throw new Error("API key is missing");
  }

  const url = `${TMDB_BASE_URL}${endpoint}`;
  const queryString = new URLSearchParams(queryParams).toString();

  const urlWithQuery = queryString ? `${url}?${queryString}` : url;
  const somethingWentWrong =
    "Something went wrong fetching movie(s). Please try again later.";

  try {
    const response = await fetch(urlWithQuery, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    if (!response.ok) {
      return {
        error: somethingWentWrong,
        data: null,
      };
    }

    return {
      data: await response.json(),
    };
  } catch (e: any) {
    return {
      error: somethingWentWrong,
      data: null,
    };
  }
};

export const fetchPopularMovies = async (): Promise<MoviesResponse> => {
  return fetchMovies("/movie/popular");
};

export const searchMovies = async (query: string): Promise<MoviesResponse> => {
  return fetchMovies(`/search/movie`, { query });
};

export const getSingleMovie = async (
  movieId: string
): Promise<SingleMovieResponse> => {
  return fetchMovies(`/movie/${movieId}`);
};

export const fetchGenres = async (): Promise<GenresResponse> => {
  return fetchMovies("/genre/movie/list");
};

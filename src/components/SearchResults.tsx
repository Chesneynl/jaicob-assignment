"use client";

import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { searchMovies } from "@/utils/fetchMovies";
import { GenresResponse, MoviesResponse } from "@/types";
import MoviesList from "./MoviesList";

type SearchFormProps = {
  genresResponse: GenresResponse;
};

const SearchForm = ({ genresResponse }: SearchFormProps) => {
  const [moviesResponse, setMoviesResponse] = useState<MoviesResponse | null>(
    null
  );
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedFetchResults = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setMoviesResponse(null);
        return;
      }

      setLoading(true);

      const response = await searchMovies(searchQuery);
      setMoviesResponse(response);

      setLoading(false);
    }, 500),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedFetchResults(value);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <label htmlFor="search" className="text-lg font-medium mb-2">
          Lookinng for a movie?
        </label>
        <input
          type="text"
          id="search"
          value={query}
          onChange={handleChange}
          placeholder="Interstellar, Inception, etc."
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {loading && <div>Loading...</div>}
      {!loading && moviesResponse && (
        <MoviesList
          moviesResponse={moviesResponse}
          genresResponse={genresResponse}
          type="search-results"
        />
      )}
    </>
  );
};

export default SearchForm;

import React from "react";
import { GenresResponse, MoviesResponse } from "@/types";
import Image from "next/image";
import Link from "next/link";

type MoviesListProps = {
  moviesResponse: MoviesResponse;
  genresResponse: GenresResponse;
  type: "search-results" | "popular";
};

function getTitle(type: string) {
  switch (type) {
    case "search-results":
      return "Search Results";
    case "popular":
      return "Popular Movies";
    default:
      return "Movies";
  }
}

const MoviesList = ({
  moviesResponse,
  genresResponse,
  type,
}: MoviesListProps) => {
  const { data, error } = moviesResponse ?? {};

  if (error || !data) {
    return <div>Error: {error}</div>;
  }

  if (data.results.length === 0) {
    return (
      <div>
        No movies found.
        {type === "search-results" &&
          " Please try searching for something else."}
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold">{getTitle(type)}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:lg:grid-cols-5 2xl:lg:grid-cols-6 gap-4">
        {data.results.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="flex flex-col gap-4 max-w-full"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="rounded-lg w-full max-w-full"
            />
            <h2 className="text-lg font-medium">{movie.title}</h2>
            <p>
              Genres:{" "}
              {movie.genre_ids
                .map(
                  (movieId) =>
                    genresResponse?.data?.genres?.find(
                      (genre) => genre.id === movieId
                    )?.name ?? ""
                )
                .join(", ")}
            </p>
            <p>Rating: {movie.vote_average}</p>
            <p>Release date: {movie.release_date}</p>
            <p>{movie.overview}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MoviesList;

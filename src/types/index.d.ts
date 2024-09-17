export type Movie = {
  id: number;
  title: string;
  overview: string;
  genre_ids: number[];
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: Genre[];
};

export type Genre = {
  id: number;
  name: string;
};

export type MoviesResponse = {
  error?: string;
  data: {
    page: number;
    total_results: number;
    total_pages: number;
    results: Movie[];
  } | null;
};

export type GenresResponse = {
  error?: string;
  data: { genres: Genre[] } | null;
};

export type SingleMovieResponse = {
  error?: string;
  data: Movie | null;
};

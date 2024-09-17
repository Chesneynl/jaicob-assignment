import { fetchPopularMovies, fetchGenres } from "@/utils/fetchMovies";
import SearchResults from "@/components/SearchResults";
import MoviesList from "@/components/MoviesList";

export default async function Home() {
  const popularMoviesData = await fetchPopularMovies();
  const genresResponnse = await fetchGenres();

  return (
    <main className="flex flex-col gap-8 row-start-2 p-8 items-center sm:items-start">
      <SearchResults genresResponse={genresResponnse} />
      <MoviesList
        moviesResponse={popularMoviesData}
        genresResponse={genresResponnse}
        type="popular"
      />
    </main>
  );
}

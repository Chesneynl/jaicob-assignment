import { getSingleMovie } from "@/utils/fetchMovies";
import Link from "next/link";
import Image from "next/image";

type MoviePageProps = {
  params: {
    id: string;
  };
};

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = params;
  const movie = await getSingleMovie(id);

  if (!movie?.data) {
    return <div>No movie found with id: {id}</div>;
  }

  const { data } = movie;

  return (
    <main className="flex flex-col gap-8 p-8 row-start-2 items-center sm:items-start">
      <Link href="/">-- Back to home</Link>
      <div>
        <h1 className="text-2xl font-bold mb-5">{data.title}</h1>
        <div className="flex gap-10">
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            width={500}
            height={750}
            className="rounded-lg"
          />
          <div>
            <p className="mb-10">{data.overview}</p>
            <p>Genres: {data.genres.map((genre) => genre.name).join(", ")}</p>
            <p>Release date: {data.release_date}</p>
            <p>Rating: {data.vote_average}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

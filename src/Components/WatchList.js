import React, { useState, useEffect } from "react";

function WatchList() {
  const [favourites, setFavourites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [rating, setRating] = useState(0);
  const [searchStr, setSearchStr] = useState("");

  let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("imdb");
    moviesFromLocalStorage = JSON.parse(moviesFromLocalStorage) || [];
    setFavourites(moviesFromLocalStorage);
  }, []);

  useEffect(() => {
    let temp = favourites.map((movie) => genreids[movie.genre_ids[0]]);
    temp = new Set(temp);
    setGenres(["All Genres", ...temp]);
  }, [favourites]);

  let filteredArray =
    currGenre === "All Genres"
      ? favourites
      : favourites.filter(
          (movie) => genreids[movie.genre_ids[0]] === currGenre
        );

  if (rating === -1) {
    filteredArray.sort((objA, objB) => objB.vote_average - objA.vote_average);
  } else if (rating === 1) {
    filteredArray.sort((objA, objB) => objA.vote_average - objB.vote_average);
  }

  filteredArray = filteredArray.filter((movie) =>
    movie.title.toLowerCase().includes(searchStr.toLowerCase())
  );

  const del = (movie) => {
    const newArray = favourites.filter((m) => m.id !== movie.id);
    setFavourites([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap space-x-2 justify-center">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`m-2 text-lg p-2 rounded-xl font-bold transition-all duration-300 ${
              currGenre === genre
                ? "bg-blue-400 text-white"
                : "bg-gray-400 hover:bg-blue-400 text-white"
            }`}
            onClick={() => setCurrGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="text-center">
        <input
          type="text"
          className="border-2 border-gray-300 bg-gray-200 p-2 m-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Search for Movies"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <div className="hidden md:block">
          {/* Desktop Table View */}
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Name</th>
                <th className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                      className="mr-1 cursor-pointer"
                      onClick={() => setRating(1)}
                      alt="Sort Ascending"
                    />
                    <div>Ratings</div>
                    <img
                      src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                      className="ml-1 cursor-pointer"
                      onClick={() => setRating(-1)}
                      alt="Sort Descending"
                    />
                  </div>
                </th>
                <th className="px-6 py-4">Popularity</th>
                <th className="px-6 py-4">Genre</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {filteredArray.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-50">
                  <td className="flex items-center px-6 py-4 font-normal text-gray-900 space-x-2">
                    <img
                      className="h-[6rem] w-[10rem] object-cover"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="font-medium text-gray-700 text-sm">
                      {movie.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">{movie.vote_average}</td>
                  <td className="px-6 py-4">{movie.popularity}</td>
                  <td className="px-6 py-4">{genreids[movie.genre_ids[0]]}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-red-600 hover:text-red-800 transition duration-200"
                      onClick={() => del(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col space-y-4">
          {filteredArray.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center p-4 bg-white rounded-lg shadow-md space-x-4"
            >
              <img
                className="h-[6rem] w-[4rem] object-cover"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="flex-grow">
                <div className="font-medium text-gray-700">{movie.title}</div>
                <div className="text-sm text-gray-500">
                  Ratings: {movie.vote_average}
                </div>
                <div className="text-sm text-gray-500">
                  Popularity: {movie.popularity}
                </div>
                <div className="text-sm text-gray-500">
                  Genre: {genreids[movie.genre_ids[0]]}
                </div>
              </div>
              <button
                className="text-red-600 hover:text-red-800 transition duration-200"
                onClick={() => del(movie)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WatchList;
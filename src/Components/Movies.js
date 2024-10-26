import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [watchList, setWatchList] = useState([]);
  const [hovered, setHovered] = useState("");

  // WatchList handler
  const addToWatchList = (movie) => {
    const newWatchList = [...watchList, movie];
    setWatchList(newWatchList);
    localStorage.setItem("imdb", JSON.stringify(newWatchList));
  };

  const removeFromWatchList = (movie) => {
    const filteredWatchList = watchList.filter((m) => m.id !== movie.id);
    setWatchList(filteredWatchList);
    localStorage.setItem("imdb", JSON.stringify(filteredWatchList));
  };

  // Hovering on movies
  const showButton = (id) => {
    setHovered(id);
  };

  const hideButton = () => {
    setHovered("");
  };

  // Pagination handler
  const onNext = () => {
    setPageNum(pageNum + 1);
  };

  const onPrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  useEffect(() => {
    (function () {
      let moviesFromLS = localStorage.getItem("imdb");
      moviesFromLS = JSON.parse(moviesFromLS) || [];
      setWatchList(moviesFromLS);

      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=e3a2b5d7ece779b6ec37513408bf162c&page=${pageNum}`
        )
        .then((res) => {
          setMovies(res.data.results);
        });
    })();
  }, [pageNum]);

  return (
    <div className="bg-gray-800 p-4 md:p-8">
      <div className="text-2xl mb-8 pt-10 font-bold text-center text-yellow-600">
        Trending Movies
      </div>

      {/* Updated Grid with Improved Gap */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="relative w-full h-[200px] md:h-[300px] bg-center bg-cover rounded-xl transition-transform duration-300 transform hover:scale-105 mb-4" // Added margin bottom
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
              }}
              onMouseEnter={() => showButton(movie.id)}
              onMouseLeave={() => hideButton()}
            >
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-900 bg-opacity-60 text-white font-bold text-center">
                {movie.title}
              </div>

              <div
                className={`absolute top-2 right-2 flex flex-col space-y-1 transition-opacity duration-300 ${
                  hovered === movie.id ? "opacity-100" : "opacity-0"
                }`}
              >
                {watchList.some((m) => m.id === movie.id) === false ? (
                  <button
                    className="bg-green-500 text-white font-semibold py-1 px-2 rounded hover:bg-green-600 transition duration-200"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering mouseLeave
                      addToWatchList(movie);
                    }}
                    title="Add to Watchlist"
                  >
                    Add
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-red-600 transition duration-200"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering mouseLeave
                      removeFromWatchList(movie);
                    }}
                    title="Remove from Watchlist"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        onPrevProp={onPrev}
        pageNumProp={pageNum}
        onNextProp={onNext}
      />
    </div>
  );
}

export default Movies;
import React, { useState, useCallback, useEffect } from "react";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if(!response.ok) {
        throw new Error('Something went wrong...Retrying');
    }

      const data = await response.json();
      const fetchedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      
      setMovies(fetchedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  
  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />;
  }

  if(error){
    content = <p>{error}</p>;
  }

  if(isLoading){
    content = <Loader />;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;

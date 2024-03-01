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
      const response = await fetch(
        "https://react-movie-project-e3b08-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong...Retrying");
      }

      const data = await response.json();
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
      console.log(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    try {
      const response = await fetch(
        "https://react-movie-project-e3b08-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong while adding movie");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteMovieHandler(id) {
    try {
      const response = await fetch(
        `https://react-movie-project-e3b08-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while deleting movie");
      }
      console.log("Movie successfully deleted!");
    } catch (error) {
      console.log(error.message);
    }
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
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
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

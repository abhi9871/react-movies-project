import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    const fetchedMovies = data.results.map((movie) => {
            return {
                id: movie.episode_id,
                title: movie.title,
                releaseDate: movie.release_date,
                openingText: movie.opening_crawl
            };
          }); 
          setMovies(fetchedMovies); 
          setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {(isLoading) ? <Loader /> : <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;

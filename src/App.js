import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const fetchMoviesHandler = async () => {
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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;

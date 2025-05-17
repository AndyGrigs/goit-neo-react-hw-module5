import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../api/tmdb';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieList from '../MovieList/MovieList';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const data = await getTrendingMovies();
                setMovies(data.results);
                console.log(data.results);
                setError(null);
            } catch (error) {
                setError('Fsiled to load trending movies!');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);
    return (
        <div>
            <h1>Trending Today</h1>
            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {movies.length > 0 && !loading && !error && <MovieList movies={movies}/>}
            {movies.length === 0 && !loading && !error && <p>There is no movies...</p>}
        </div>
    );
};

export default HomePage;

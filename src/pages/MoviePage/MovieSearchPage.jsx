import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './MovieSearchPage.module.css';
import { searchMovies } from '../../api/tmdb';
import Loader from '../../components/Loader/Loader';
import { Search } from 'lucide-react';

import MovieList from '../../components/MovieList/MovieList';

const MovieSearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);

    useEffect(() => {
        if (!query) {
            setMovies([]);
            return;
        }

        const fetchMovies = async () => {
            try {
                setLoading(true);
                const data = await searchMovies(query);
                setMovies(data.results);
                setSearchPerformed(true);
                setError(null);
            } catch (err) {
                setError('Failed to search movies');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const searchQuery = formData.get('searchQuery')?.toString().trim();
        if (searchQuery) {
            setSearchParams({ query: searchQuery });
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Here you can find movies!</h1>
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <div className={styles.searchInputContainer}>
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Enter movie title..."
                        defaultValue={query}
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        <Search size={20} />
                        <span>Search</span>
                    </button>
                </div>
            </form>
            {loading && <Loader />}
            {!loading && !error && searchPerformed && movies.length === 0 && (
                <p className={styles.noResults}>No movies found for "{query}"</p>
            )}
            {!loading && !error && movies.length > 0 && (
                <>
                    <h2 className={styles.resultsTitle}>
                        Search results for: <span className={styles.queryHighlight}>{query}</span>
                    </h2>
                    <MovieList movies={movies} />
                </>
            )}
        </div>
    );
};

export default MovieSearchPage;

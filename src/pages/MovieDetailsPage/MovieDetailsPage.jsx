import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import { getMovieDeatils } from '../../api/tmdb';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkRef = useRef(location.state?.from || '/movie');

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!movieId) return;
            try {
                setLoading(true);
                const data = getMovieDeatils(movieId);
                setMovie(data);
                setError(null);
            } catch (error) {
                setError('Failed to load details!');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
        return () => (document.title = 'Here you can find your movie!');
    }, [movieId]);

    return (
        <>
            <div
                className={styles.backdrop}
                style={{ backgroundImage: `${(movie.backdrop_path, 'original')}` }}
            />
            <Link to={backLinkRef.current} className={styles.backlink}>
                Go back
            </Link>
        </>
    );
};

export default MovieDetailsPage;

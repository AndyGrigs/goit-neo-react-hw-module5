import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams, Link, NavLink, Outlet } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import { getImageUrl, getMovieDeatils } from '../../api/tmdb';
import Loader from '../../components/Loader/Loader';
import { ArrowLeft, BarChart4, Calendar, Star, Clock } from 'lucide-react';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    console.log(movieId);
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
                const data = await getMovieDeatils(movieId);
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

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (!movie) return <ErrorMessage message="Movie not found" />;

    return (
        <>
            <div
                className={styles.backdrop}
                style={{
                    backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'original')})`,
                }}
            />

            <div className={styles.container}>
                <Link to={backLinkRef.current} className={styles.backlink}>
                    <ArrowLeft size={20} />
                    <span>Go back</span>
                </Link>

                {/* <div className={styles.movieContainer}>
                    <div className={styles.posterContainer}>
                        <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                    </div>
                    <div className={styles.detailsContainer}>
                        <h2 className={styles.title}>{movie.title}</h2>
                        {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}
                    </div>

                    <div className={styles.metaInfo}>
                        <div className={styles.metaItem}>
                            <Calendar size={18} />
                            <span>{movie.runtime}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <Star size={18} className={styles.starIcon} />
                            <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <BarChart2 size={18} />
                            <span>{movie.vote_count}</span>
                        </div>
                    </div>

                    <div className={styles.genreContainer}>
                        {movie.genres.map((genre) => (
                            <span key={genre.id} className={styles.genre}>
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className={styles.overview}>
                        <h2 className={styles.sectionTitle}>Overview</h2>
                        <p>{movie.overview}</p>
                    </div>

                    <div className={styles.additionalInfoContainer}>
                        <h2 className={styles.sectionTitle}>Additional information</h2>
                        <div className={styles.infoLinks}>
                            <NavLink
                                to="cast"
                                className={({ isActive }) =>
                                    isActive ? styles.activeInfoLink : styles.infoLink
                                }
                            >
                                Cast
                            </NavLink>
                            <NavLink
                                to="reviews"
                                className={({ isActive }) =>
                                    isActive ? styles.activeInfoLink : styles.infoLink
                                }
                            >
                                Reviews
                            </NavLink>
                        </div>
                    </div>
                </div> */}

                <div className={styles.movieContainer}>
                    <div className={styles.posterContainer}>
                        <img
                            src={getImageUrl(movie.poster_path)}
                            alt={`${movie.title} poster`}
                            className={styles.poster}
                        />
                    </div>

                    <div className={styles.detailsContainer}>
                        <h1 className={styles.title}>{movie.title}</h1>

                        {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}

                        <div className={styles.metaInfo}>
                            <div className={styles.metaItem}>
                                <Calendar size={18} />
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                            </div>

                            <div className={styles.metaItem}>
                                <Clock size={18} />
                                <span>{movie.runtime} min</span>
                            </div>

                            <div className={styles.metaItem}>
                                <Star size={18} className={styles.starIcon} />
                                <span>{movie.vote_average.toFixed(1)}</span>
                            </div>

                            <div className={styles.metaItem}>
                                <BarChart4 size={18} />
                                <span>{movie.vote_count} votes</span>
                            </div>
                        </div>

                        <div className={styles.genreContainer}>
                            {movie.genres.map((genre) => (
                                <span key={genre.id} className={styles.genre}>
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className={styles.overview}>
                            <h2 className={styles.sectionTitle}>Overview</h2>
                            <p>{movie.overview}</p>
                        </div>

                        <div className={styles.additionalInfoContainer}>
                            <h2 className={styles.sectionTitle}>Additional information</h2>
                            <div className={styles.infoLinks}>
                                <NavLink
                                    to="cast"
                                    className={({ isActive }) =>
                                        isActive ? styles.activeInfoLink : styles.infoLink
                                    }
                                >
                                    Cast
                                </NavLink>
                                <NavLink
                                    to="reviews"
                                    className={({ isActive }) =>
                                        isActive ? styles.activeInfoLink : styles.infoLink
                                    }
                                >
                                    Reviews
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.outletContainer}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default MovieDetailsPage;

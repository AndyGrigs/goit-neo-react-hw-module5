import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../api/tmdb';
import { Star } from 'lucide-react';
import styles from './MovieList.module.css'

const MovieList = ({ movies }) => {
     const location = useLocation();
    return (
        <div className={styles.movieGrid}>
            {movies.map((movie) => (
                <Link
                    to={`/movies/${movie.id}`}
                    key={movie.id}
                    className={styles.card}
                    state={{ from: location }}
                >
                    <div className={styles.posterContainer }>
                        <img
                            src={getImageUrl(movie.poster_path)}
                            alt={`${movie.title} poster`}
                            className={styles.poster}
                        />
                        <div className={styles.rating}>
                            <Star className={styles.star} size={16}/>
                            <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <h3 className={styles.title}>{movie.title}</h3>
                        <p className={styles.year}>{movie.release_date ? new Date(movie.release_date).getFullYear():'Unknown'}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default MovieList;

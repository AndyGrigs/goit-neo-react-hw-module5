import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../api/tmdb';
import { Star } from 'lucide-react';

const MovieList = ({ movies }) => {
    // const location = useLocation();
    return (
        <div>
            {movies.map((movie) => (
                <article
                    to={`/movies/${movie.id}`}
                    key={movie.id}
                    className="card"
                    state={{ from: location }}
                >
                    <div>
                        <img
                            src={getImageUrl(movie.poster_path)}
                            alt={`${movie.title} poster`}
                            className=""
                        />
                        <div className='rating'>
                            <Star size={16}/>
                            <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                    </div>
                    <div>
                        <p>{movie.release_date ? new Date(movie.release_date).getFullYear():'Unknown'}</p>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default MovieList;

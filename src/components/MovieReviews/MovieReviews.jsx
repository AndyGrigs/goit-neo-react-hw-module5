import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../api/tmdb';
import styles from './MovieReviews.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!movieId) return;
            try {
                setLoading(true);
                const data = await getMovieReviews(movieId);
                setReviews(data);
                setError(null);
            } catch (error) {
                setError('Failed to load reviews!');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [movieId]);
    console.log(reviews);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (reviews.length === 0) return <p>Sorry! No reviews!..</p>;

    return (
        <div className={styles.reviewsContainer}>
            <h2 className={styles.title}>Reviews</h2>
            
        </div>
    );
};

export default MovieReviews;

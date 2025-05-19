import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';
import { getMovieCredits, getImageUrl } from '../../api/tmdb';
import Loader from '../Loader/Loader';

const MovieCast = () => {
    const { movieId } = useParams();
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActors = async () => {
            if (!movieId) return;
            try {
                setLoading(true);
                const data = await getMovieCredits(movieId);
                setActors(data.cast);
                setError(null);
            } catch (error) {
                setError('Failed to load actors!');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchActors();
    }, [movieId]);


    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (actors.length === 0)
        return <p className={styles.noInfo}>No cast information available for this movie.</p>;

    return (
      <div className={styles.castContainer}>
      <h2 className={styles.sectionTitle}>Cast</h2>
      <div className={styles.castGrid}>
        {actors.slice(0, 12).map((actor) => (
          <div key={actor.id} className={styles.actorCard}>
            <div className={styles.actorImage}>
              <img 
                src={getImageUrl(actor.profile_path, 'w185')} 
                alt={`${actor.name}`} 
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/185x278?text=No+Image';
                }}
              />
            </div>
            <div className={styles.actorInfo}>
              <h3 className={styles.actorName}>{actor.name}</h3>
              <p className={styles.character}>{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default MovieCast;

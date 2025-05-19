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
                setReviews(data.results);
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
            {reviews.map((review) => (
                <div className={styles.reviewCard}>
                    <div key={review.id} className={styles.reviewHeader}>
                        <span className={styles.author}>{review.author}</span>
                        <span className={styles.date}>
                            {new Date(review.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <div className={styles.reviewContent}>
                        {review.content.length > 500
                            ? `${review.content.substring(0, 500)}...`
                            : review.content}
                    </div>
                    <a
                        href={review.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.readMore}
                    >
                        Read full review
                    </a>
                </div>
            ))}
        </div>
    );
};

export default MovieReviews;

/**
 * (4) [{…}, {…}, {…}, {…}]
0
: 
author
: 
"Chris Sawin"
author_details
: 
{name: 'Chris Sawin', username: 'ChrisSawin', avatar_path: null, rating: 4}
content
: 
"From director Christopher Landon (the Happy Death Day films, Freaky) and screenwriters Jillian Jacobs (Fantasy Island) and Chris Roach (Non-Stop), Drop is a mystery thriller that gets more wrapped up in a forced mystery than providing anything resembling actual thrills.\r\n\r\nViolet (Meghann Fahy) is a widow and a domestic abuse survivor. She has prioritized her son for so long that she’s forgotten what it’s like to try to meet someone. After using a dating app and finding someone she felt like there was a connection with, Violet agrees to meet up with Henry (Brandon Sklenar) the guy she’s been talking to for a first date.\r\n\r\nThe date starts decent enough, but Violent begins getting strange memes AirDropped to her iPhone. She ignores them at first, but the sender (we’re going to refer to them as The Dropper) soon reveals that they know her name and that a masked intruder is inside her house threatening to harm her younger sister Jen (Violett Beane) and kill her son if she tells anyone about her situation.\r\n\r\nFor a cast of mostly recognizable actors, Drop features some fairly solid performances. Meghann Fahy is understandably on the verge of tears throughout the film, but she hides it well. She is bombarded with texts that force her to do despicable things, but she has to pretend she’s having a good time.\r\n\r\nBrandon Sklenar comes off as a good guy with a questionable career choice. He’s a photographer working for the mayor and his kind demeanor could be misleading. Like Meghann Fahy, Sklenar’s performance resides in his eyes, which are always seemingly full of genuine concern.\r\n\r\nThe film has a crazy final ten minutes. Drop mostly takes place in this fancy and wildly expensive restaurant called Palate located several stories up for some ungodly reason. Violet is forced to stay at the restaurant, so most of the film takes place at the bar, at their table, or in the bathroom.\r\n\r\nThe finale allows everything to hit the fan as people get shot and thrown out windows, the intruder finally goes after Violet’s sister and son, and everything comes full circle from the beginning of the film which touches on the abuse Violet went through both physically and metaphorically.\r\n\r\nThe rest of Drop is a repetitious drag. The film attempts to submerge the audience in a sea of intrigue throwing various other people at the restaurant into the mix who could be The Dropper. The film mentions that someone has to be within 50 feet to send an AirDrop and there are at least half a dozen people Violet encounters that evening that could be the culprit including a somewhat flirty female bartender, a guy Violet bumps into several times because neither of them can stop looking at their phones, a middle-aged guy who is on the first date he’s had in years and is total cringe, and their flamboyant waiter who is just trying to survive his first day on the job.\r\n\r\nViolet breaks a lot of boundaries and raises a ton of red flags for a first date. The fact that Henry sticks it out throughout the whole film is a miracle. The Dropper forces Violet to do a lot of things she doesn’t want to do like go after the memory card in Henry’s camera and attempt to kill Henry. But she also acts like a crazy person by lying constantly and getting caught later, switching tables and then switching back, and is always on her phone.\r\n\r\nThe problem with Drop is you’re never invested in who The Dropper is. It’s a whodunit film where you don’t care who did it and you care even less after you know who it is. The trailer made it seem like there would be more of the intruder doing unspeakable things at Violet’s home, but the film is largely driven by Violet texting on her phone and aimlessly wandering around Palate because The Dropper is a dick.\r\n\r\nDrop overreaches and stretches out an enigmatic game of duck duck goose far beyond its limitations. The performances are surprisingly strong and the ending is downright bananas. But a film driven by distressing text messages and wealthy buffoons acting strangely at a fancy restaurant will only get a film so far."
created_at
: 
"2025-04-11T13:45:49.893Z"
id
: 
"67f91d0dd4c444a1cc99c47f"
updated_at
: 
"2025-04-11T13:45:49.964Z"
url
: 
"https://www.themoviedb.org/review/67f91d0dd4c444a1cc99c47f"
 */

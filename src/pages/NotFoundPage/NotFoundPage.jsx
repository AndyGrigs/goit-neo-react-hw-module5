import styles from './NotFoundPage.module.css'
import { Film as FilmOff, Home } from 'lucide-react';
import { Link } from 'react-router-dom';


const NotFoundPage = () => {
  
  return (
    <div className={styles.container}>
          <div className={styles.content}>
            <FilmOff size={80} className={styles.icon} />
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>Page Not Found</h2>
            <p className={styles.message}>
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className={styles.homeLink}>
              <Home size={20} />
              <span>Go to Home Page</span>
            </Link>
          </div>
        </div>
  )
}

export default NotFoundPage
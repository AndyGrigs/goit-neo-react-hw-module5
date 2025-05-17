import { FilmIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navigation}>
            <div className={styles.box}>
                <div className="logo">
                    <FilmIcon size={24} />
                </div>
                <ul className="navlinks">
                    <NavLink
                        className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                        to="/"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                        to="/movies"
                    >
                        Movies
                    </NavLink>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

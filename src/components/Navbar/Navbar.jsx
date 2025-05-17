import { FilmIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import st from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav>
            <div>
                <div className="logo">
                    <FilmIcon size={24} />
                </div>
                <ul className="navlinks">
                    <NavLink
                        className={({ isActive }) => (isActive ? st.activeLink : st.link)}
                        to="/"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => (isActive ? st.activeLink : st.link)}
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

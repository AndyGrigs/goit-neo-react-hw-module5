import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

function App() {
    return (
        <div>
            <Navbar/>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path='movies/:movieId' element={<MovieDetailsPage/>}>
                        <Route path='cast'/>
                        <Route path='reviews'/>
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

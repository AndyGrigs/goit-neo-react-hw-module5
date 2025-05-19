import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MovieDetailsPage = lazy(()=> import('./pages/MovieDetailsPage/MovieDetailsPage'))
const MovieReviews = lazy(()=> import('./components/MovieReviews/MovieReviews'))
const MovieCast = lazy(()=> import('./components/MovieCast/MovieCast'))
const MovieSearchPage = lazy(()=> import('./pages/MoviePage/MovieSearchPage'))
const NotFoundPage = lazy(()=> import('./pages/NotFoundPage/NotFoundPage'))

function App() {
    return (
        <div>
            <Navbar/>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MovieSearchPage />} />
                    <Route path='movies/:movieId' element={<MovieDetailsPage/>}>
                        <Route path='cast' element={<MovieCast/>} />
                        <Route path='reviews'element={<MovieReviews/>}/>
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

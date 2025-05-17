import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader';
import './App.css';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

function App() {
    return (
        <div>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

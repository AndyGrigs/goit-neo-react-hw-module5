import axios from 'axios';


 const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
});

export const getImageUrl= (path, size='w500') => {
  if(!path) return;
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export const getTrendingMovies = async ()=>{
  try {
    const response = await tmdb.get('/trending/movie/day');
    return response.data
  } catch (error) {
    console.error('Error with trending films', error)
    throw error
  }
}
export const getMovieDeatils = async (movieId)=>{
  try {
    const response = await tmdb.get(`/movie/${movieId}`);
    return response.data
  } catch (error) {
    console.error('Error with trending movie details', error)
    throw error
  }
}
export const getMovieCredits = async (movieId)=>{
  try {
    const response = await tmdb.get(`/movie/${movieId}/credits`);
    return response.data
  } catch (error) {
    console.error('Error with movie credits', error)
    throw error
  }
}
export const getMovieReviews = async (movieId)=>{
  try {
    const response = await tmdb.get(`/movie/${movieId}/reviews`);
    return response.data
  } catch (error) {
    console.error('Error with movie reviws', error)
    throw error
  }
}

export const searchMovies = async (query)=>{
  try {
    const response = await tmdb.get('/search/movie', {
      params: {
        query, 
        include_adult: true,
        language: 'en-Us',
        page: 1
      }
    });
    return response.data
  } catch (error) {
    console.error('Error with searching films', error)
    throw error
  }
}


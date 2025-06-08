// utils/api.js
const API_KEY = '30416e526f06db657e9481eb6fce9409'
const BASE_URL = 'https://api.themoviedb.org/3'

export const getPopularMovies = page =>
  `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`

export const getTopRatedMovies = page =>
  `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`

export const getUpcomingMovies = page =>
  `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`

export const getMovieDetails = id =>
  `${BASE_URL}/movie/${id}?api_key=${API_KEY}`

export const getMovieCast = id =>
  `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`

export const searchMovies = (query, page) =>
  `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`

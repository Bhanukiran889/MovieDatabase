// src/components/SearchResults/index.js
import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import {searchMovies} from '../../utils/api'
import './index.css'

const useQuery = () => new URLSearchParams(useLocation().search)

const SearchResults = () => {
  const query = useQuery().get('query')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (query) {
      fetch(searchMovies(query, page))
        .then(res => res.json())
        .then(data => setMovies(data.results))
    }
  }, [query, page])

  return (
    <div className="movie-grid-container">
      <h2>Search Results for &quot;{query}&quot;</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {movies.length > 0 && <Pagination currentPage={page} setPage={setPage} />}
    </div>
  )
}

export default SearchResults

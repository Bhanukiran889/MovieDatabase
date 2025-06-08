import {useEffect, useState} from 'react'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import {getTopRatedMovies} from '../../utils/api'
import './index.css'

const TopRated = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(getTopRatedMovies(page))
      .then(res => res.json())
      .then(data => setMovies(data.results))
  }, [page])

  return (
    <div className="movie-grid-container">
      <h2>Top Rated Movies</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination currentPage={page} setPage={setPage} />
    </div>
  )
}

export default TopRated

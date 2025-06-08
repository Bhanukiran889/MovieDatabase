import {useEffect, useState} from 'react'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import {getPopularMovies} from '../../utils/api'
import './index.css'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(getPopularMovies(page))
      .then(res => res.json())
      .then(data => setMovies(data.results))
  }, [page])

  return (
    <div className="movie-grid-container">
      <h2>Popular Movies</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination currentPage={page} setPage={setPage} />
    </div>
  )
}

export default Home

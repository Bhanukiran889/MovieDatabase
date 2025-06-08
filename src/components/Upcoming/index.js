import {useEffect, useState} from 'react'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import {getUpcomingMovies} from '../../utils/api'
import './index.css'

const Upcoming = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(getUpcomingMovies(page))
      .then(res => res.json())
      .then(data => {
        console.log('UpcommigMovies:', data)
        setMovies(data.results)
      })
  }, [page])

  return (
    <div className="movie-grid-container">
      <h2>Upcoming Movies</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination currentPage={page} setPage={setPage} />
    </div>
  )
}

export default Upcoming

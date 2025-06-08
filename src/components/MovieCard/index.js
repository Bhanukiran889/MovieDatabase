// components/MovieCard/index.js
import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = ({movie}) => {
  const {id, title, vote_average, poster_path} = movie

  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} />
      <h3>{title}</h3>
      <p>⭐ {vote_average}</p>
      <Link to={`/movie/${id}`}>
        <button type="button" className="details-btn">
          View Details
        </button>
      </Link>
    </div>
  )
}

export default MovieCard

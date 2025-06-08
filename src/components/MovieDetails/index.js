import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Loader from '../Loader'
import {getMovieDetails, getMovieCast} from '../../utils/api'
import './index.css'

const MovieDetails = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])

  useEffect(() => {
    fetch(getMovieDetails(id))
      .then(res => res.json())
      .then(data => {
        console.log('🎬 Movie Details:', data)
        setMovie(data)
      })

    fetch(getMovieCast(id))
      .then(res => res.json())
      .then(data => {
        console.log('🧑‍🎤 Cast Details:', data)
        setCast(data.cast)
      })
  }, [id])

  if (!movie) return <Loader />

  return (
    <div className="details-container">
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>⭐ {movie.vote_average}</p>
      <p>
        <strong>Runtime:</strong> {movie.runtime} min
      </p>
      <p>
        <strong>Genre:</strong> {movie.genres.map(g => g.name).join(', ')}
      </p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>{movie.overview}</p>

      <h3>Cast</h3>
      <div className="cast-grid">
        {cast.map(member => (
          <div key={member.cast_id} className="cast-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
              alt={member.name}
            />
            <p>
              <strong>{member.name}</strong>
            </p>
            <p>{member.character}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieDetails

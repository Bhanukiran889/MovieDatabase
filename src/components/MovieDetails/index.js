import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from '../Loader'
import {getMovieDetails, getMovieCast} from '../../utils/api'
import './index.css'

class MovieDetails extends Component {
  state = {
    movie: null,
    cast: [],
    isLoading: true,
  }

  componentDidMount() {
    this.fetchMovieData()
  }

  fetchMovieData = async () => {
    const {match} = this.props
    const {id} = match.params

    const movieResponse = await fetch(getMovieDetails(id))
    const movieData = await movieResponse.json()

    const castResponse = await fetch(getMovieCast(id))
    const castData = await castResponse.json()

    this.setState({
      movie: movieData,
      cast: castData.cast,
      isLoading: false,
    })
  }

  render() {
    const {movie, cast, isLoading} = this.state

    if (isLoading || !movie) {
      return (
        <div data-testid="loader">
          <Loader />
        </div>
      )
    }

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
}

export default withRouter(MovieDetails)

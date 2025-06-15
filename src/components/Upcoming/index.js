import {Component} from 'react'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import {getUpcomingMovies} from '../../utils/api'
import './index.css'

class Upcoming extends Component {
  state = {
    movies: [],
    page: 1,
  }

  componentDidMount() {
    this.fetchMovies()
  }

  componentDidUpdate(_, prevState) {
    const {page} = this.state
    if (prevState.page !== page) {
      this.fetchMovies()
    }
  }

  fetchMovies = async () => {
    const {page} = this.state
    const response = await fetch(getUpcomingMovies(page))
    const data = await response.json()
    this.setState({movies: data.results})
  }

  setPage = page => {
    this.setState({page})
  }

  render() {
    const {movies, page} = this.state
    return (
      <div className="movie-grid-container">
        <h2>Upcoming Movies</h2>
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Pagination currentPage={page} setPage={this.setPage} />
      </div>
    )
  }
}

export default Upcoming

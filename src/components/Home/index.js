// src/components/Home/index.js
import {Component} from 'react'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import {getPopularMovies} from '../../utils/api'
import './index.css'

class Home extends Component {
  state = {
    movies: [],
    page: 1,
  }

  componentDidMount() {
    this.fetchMovies()
  }

  componentDidUpdate(prevProps, prevState) {
    const {page} = this.state
    if (prevState.page !== page) {
      this.fetchMovies()
    }
  }

  fetchMovies = async () => {
    const {page} = this.state
    const response = await fetch(getPopularMovies(page))
    const data = await response.json()
    this.setState({movies: data.results})
  }

  setPage = newPage => {
    this.setState({page: newPage})
  }

  render() {
    const {movies, page} = this.state

    return (
      <div className="movie-grid-container">
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

export default Home

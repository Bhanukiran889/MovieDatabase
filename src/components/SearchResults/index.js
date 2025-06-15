import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from '../Loader'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import {searchMovies} from '../../utils/api'
import './index.css'

class SearchResults extends Component {
  state = {
    movies: [],
    page: 1,
    query: '',
    isLoading: true,
  }

  componentDidMount() {
    const {location} = this.props
    const queryParam = new URLSearchParams(location.search).get('query')
    this.setState({query: queryParam}, this.fetchMovies)
  }

  componentDidUpdate(_, prevState) {
    const {page} = this.state
    if (prevState.page !== page) {
      this.fetchMovies()
    }
  }

  fetchMovies = async () => {
    const {query, page} = this.state
    if (!query) return
    this.setState({isLoading: true})
    const response = await fetch(searchMovies(query, page))
    const data = await response.json()
    this.setState({movies: data.results, isLoading: false})
  }

  setPage = newPage => {
    this.setState({page: newPage})
  }

  render() {
    const {movies, page, query, isLoading} = this.state
    return (
      <div className="movie-grid-container">
        <h2>Search Results for "{query}"</h2>
        {isLoading ? (
          <div data-testid="loader">
            <Loader />
          </div>
        ) : (
          <>
            <div className="movie-grid">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {movies.length > 0 && (
              <Pagination currentPage={page} setPage={this.setPage} />
            )}
          </>
        )}
      </div>
    )
  }
}

export default withRouter(SearchResults)

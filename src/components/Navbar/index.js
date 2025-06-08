// components/Navbar/index.js
import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import './index.css'

const Navbar = () => {
  const [query, setQuery] = useState('')
  const history = useHistory()

  const handleSearch = e => {
    e.preventDefault()
    if (query.trim()) history.push(`/search?query=${query}`)
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="logo">MovieDB</h1>
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/">Popular</Link>
        </li>
        <li>
          <Link to="/top-rated">Top Rated</Link>
        </li>
        <li>
          <Link to="/upcoming">Upcoming</Link>
        </li>
      </ul>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search Movies"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  )
}

export default Navbar

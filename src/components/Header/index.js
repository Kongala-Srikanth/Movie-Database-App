import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

const options = [
  {
    id: 'POPULAR',
    display: 'Popular',
    link: '/',
  },
  {
    id: 'RATED',
    display: 'Top Rated',
    link: '/top-rated',
  },
  {
    id: 'UPCOMING',
    display: 'Upcoming',
    link: '/upcoming',
  },
]

class Header extends Component {
  state = {searchMovieTitle: '', activeId: ''}

  componentDidMount() {
    this.setActiveOptionBasedOnPath()
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props
    if (location.pathname !== prevProps.location.pathname) {
      this.setActiveOptionBasedOnPath()
    }
  }

  setActiveOptionBasedOnPath = () => {
    const {location} = this.props
    const activeOption = options.find(
      option => option.link === location.pathname,
    )
    if (activeOption) {
      this.setState({activeId: activeOption.id})
    }
  }

  onSearchMovie = event => this.setState({searchMovieTitle: event.target.value})

  onClickSearch = () => {
    const {getSearchVal} = this.props
    const {searchMovieTitle} = this.state

    if (searchMovieTitle !== '') {
      getSearchVal(searchMovieTitle)
    }
  }

  onClickEnterKey = event => {
    const {getSearchVal} = this.props
    const {searchMovieTitle} = this.state

    if (event.key === 'Enter') {
      getSearchVal(searchMovieTitle)
    }
  }

  renderSearchLogic = () => {
    const {history} = this.props
    const path = history.location.pathname

    if (path === '/search') {
      return (
        <div className="search-box-container">
          <input
            type="search"
            placeholder="Search"
            className="search-box"
            onChange={this.onSearchMovie}
            onKeyDown={this.onClickEnterKey}
          />
          <button
            type="button"
            className="btn-hide"
            onClick={this.onClickSearch}
          >
            Search
          </button>
        </div>
      )
    }
    return (
      <div>
        <Link to="/search" className="link">
          <button type="button">Search</button>
        </Link>
      </div>
    )
  }

  onActiveId = id => this.setState({activeId: id})

  render() {
    const {activeId} = this.state
    return (
      <nav className="nav-bg-container">
        <Link to="/" className="link">
          <h1 className="logo">MovieDB</h1>
        </Link>
        <div className="nav-options-container">
          {options.map(each => (
            <Link to={each.link} className="link" key={each.id}>
              <button
                type="button"
                className={`nav-option ${activeId === each.id ? 'active' : ''}`}
                onClick={() => this.onActiveId(each.id)}
              >
                {each.display}
              </button>
            </Link>
          ))}
        </div>
        {this.renderSearchLogic()}
      </nav>
    )
  }
}

export default withRouter(Header)

import {Component} from 'react'
// import {Link} from 'react-router-dom'

import EachMovieItem from '../EachMovieItem'
import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {
    popularMovies: [],
    pageNumber: 1,
    searchData: '',
    searchedMovies: [],
  }

  componentDidMount() {
    this.getMoviesData()
  }

  getMoviesData = async () => {
    const {pageNumber} = this.state
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=1438bbcac182d5a4fe7464e5dab1b158&language=en-US&page=${pageNumber}`,
    )
    const data = await response.json()

    const popularMovies = data.results.map(each => ({
      adult: each.adult,
      backdropPath: each.backdrop_path,
      genreIds: each.genre_ids,
      id: each.id,
      originalLanguage: each.original_language,
      originalTitle: each.original_title,
      overview: each.overview,
      popularity: each.popularity,
      posterPath: each.poster_path,
      releaseDate: each.release_date,
      title: each.title,
      video: each.video,
      voteAverage: each.vote_average,
      voteCount: each.vote_count,
    }))

    const pagesDetails = {
      totalPages: data.total_pages,
      totalResults: data.total_results,
    }

    this.setState({popularMovies, pagesDetails})
  }

  getSearchData = async () => {
    const {pageNumber, searchData} = this.state
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${'1438bbcac182d5a4fe7464e5dab1b158'}&language=en-US&query=${searchData}&page=${pageNumber}`,
    )
    const data = await response.json()
    const searchedMovies = data.results.map(each => ({
      adult: each.adult,
      backdropPath: each.backdrop_path,
      genreIds: each.genre_ids,
      id: each.id,
      originalLanguage: each.original_language,
      originalTitle: each.original_title,
      overview: each.overview,
      popularity: each.popularity,
      posterPath: each.poster_path,
      releaseDate: each.release_date,
      title: each.title,
      video: each.video,
      voteAverage: each.vote_average,
      voteCount: each.vote_count,
    }))

    this.setState({searchedMovies})
  }

  onNextPage = () =>
    this.setState(
      prevState => ({pageNumber: prevState.pageNumber + 1}),
      this.getMoviesData,
    )

  onPreviousPage = () =>
    this.setState(
      prevState => ({
        pageNumber: prevState.pageNumber <= 1 ? 1 : prevState.pageNumber - 1,
      }),
      this.getMoviesData,
    )

  render() {
    const {popularMovies, pageNumber, pagesDetails} = this.state
    return (
      <>
        <Header />
        <div className="movie-card-position">
          <div className="main-heading-container">
            <h1 className="main-heading">Popular Movies</h1>
            {popularMovies.length !== 0 && (
              <ul className="movie-showcase-container">
                {popularMovies.map(each => (
                  <EachMovieItem key={each.id} movies={each} />
                ))}
              </ul>
            )}
            <div className="page-number-container">
              <button
                type="button"
                className="page-number"
                onClick={this.onPreviousPage}
              >
                Previous
              </button>
              <p className="page-number-text">{pageNumber}</p>
              <button
                type="button"
                className="page-number"
                onClick={this.onNextPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home

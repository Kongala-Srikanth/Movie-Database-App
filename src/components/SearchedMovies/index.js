import {useState, useEffect} from 'react'
import Header from '../Header'
import EachMovieItem from '../EachMovieItem'
import './index.css'

const SearchMovies = () => {
  const [searchVal, setSearchVal] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [popularMoviesData, setPopularMoviesData] = useState([])
  const [pageNumbers, setPageNumber] = useState({})
  // console.log(searchVal)

  const getSearchMovies = async () => {
    const API_KEY = '1438bbcac182d5a4fe7464e5dab1b158'
    const MOVIE_NAME = searchVal
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=${currentPage}`

    const response = await fetch(url)
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
    setPageNumber(pagesDetails)
    console.log(data)
    setPopularMoviesData(popularMovies)
  }

  useEffect(() => {
    getSearchMovies(searchVal)
  }, [searchVal])

  const renderSearchVal = val => {
    setSearchVal(val)
  }

  let newPage = currentPage
  const onPreviousPage = () => {
    if (currentPage > 1) {
      newPage -= 1
      setCurrentPage(newPage)
    }
  }

  const onNextPage = () => {
    newPage += 1
    setCurrentPage(newPage)
  }

  return (
    <>
      <Header getSearchVal={renderSearchVal} />
      {pageNumbers.totalResults > 1 ? (
        <div className="movie-card-position">
          <div className="main-heading-container">
            {popularMoviesData.length !== 0 && (
              <ul className="movie-showcase-container">
                {popularMoviesData.map(each => (
                  <EachMovieItem key={each.id} movies={each} />
                ))}
              </ul>
            )}
            {pageNumbers.totalPages > 1 && (
              <div className="page-number-container">
                <button
                  type="button"
                  className="page-number"
                  onClick={onPreviousPage}
                >
                  Previous
                </button>
                <p className="page-number-text">{currentPage}</p>
                <button
                  type="button"
                  className="page-number"
                  onClick={onNextPage}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="not-found-container">
          <h1 className="not-found-heading">Data Not Found</h1>
        </div>
      )}
    </>
  )
}

export default SearchMovies

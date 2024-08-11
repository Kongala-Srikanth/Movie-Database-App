import {Link} from 'react-router-dom'
import './index.css'

const EachMovieItem = props => {
  const {movies} = props
  const {id, title, posterPath, voteAverage} = movies

  return (
    <li className="each-movie">
      <img
        src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
        alt={title}
        className="poster-view"
      />
      <p className="movie-title">{title}</p>
      <p className="rating">Vote Average : {voteAverage}</p>

      <div className="center-btn-position">
        <Link to={`/${id}`} className="link">
          <button type="button" className="view-details-btn">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default EachMovieItem

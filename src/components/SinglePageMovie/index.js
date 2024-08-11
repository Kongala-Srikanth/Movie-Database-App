import {Component} from 'react'
import CastDetails from '../CastDetails'
import Header from '../Header'

import './index.css'

class SinglePageMovie extends Component {
  state = {movieDetails: [], movieCastData: []}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${'1438bbcac182d5a4fe7464e5dab1b158'}&language=en-US`,
    )
    const data = await response.json()
    const movieDetails = {
      adult: data.adult,
      budget: data.budget,
      posterPath: data.poster_path,
      originalTitle: data.original_title,
      originCountry: data.origin_country,
      overview: data.overview,
      popularity: data.popularity,
      releaseDate: data.release_date,
      runtime: data.runtime,
      revenue: data.revenue,
      status: data.status,
      tagline: data.tagline,
      title: data.title,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
    }
    const responseCastData = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${'1438bbcac182d5a4fe7464e5dab1b158'}&language=en-US`,
    )
    const castData = await responseCastData.json()
    const movieCastData = castData.cast.map(each => ({
      id: each.id,
      character: each.character,
      gender: each.gender,
      department: each.known_for_department,
      name: each.name,
      originalName: each.original_name,
      popularity: each.popularity,
      profilePath: each.profile_path,
    }))

    this.setState({movieDetails, movieCastData})
  }

  render() {
    const {movieDetails, movieCastData} = this.state
    const {
      adult,
      budget,
      posterPath,
      originCountry,
      originalTitle,
      overview,
      popularity,
      releaseDate,
      runtime,
      revenue,
      status,
      tagline,
      title,
      voteAverage,
      voteCount,
    } = movieDetails
    return (
      <>
        <Header />
        <div className="movie-card-position">
          <div className="main-heading-container single-page-position">
            <h1 className="movie-title-heading">{title}</h1>
            {movieDetails.length !== 0 && (
              <div className="single-page-movie-details">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
                  alt={title}
                  className="single-page-poster"
                />
                <div>
                  <p className="details">
                    <span className="heading-bold">Adult: </span>
                    {adult ? 'A+' : 'U/A'}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Title: </span>
                    {originalTitle}
                  </p>
                  <p className="details">
                    <span className="heading-bold"> Tagline: </span>
                    {tagline}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Directed by: </span>
                    {}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Genres: </span>
                    {}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Categories: </span>
                    {}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Country: </span>
                    {originCountry}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Language: </span>
                    {}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Duration: </span>
                    {runtime}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Budget: </span>
                    {budget}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Release Date: </span>
                    {releaseDate}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Revenue: </span>
                    {revenue}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Vote Average: </span>
                    {voteAverage}
                  </p>
                  <p className="details">
                    <span className="heading-bold">Overview: </span>
                    {overview}
                  </p>
                </div>
              </div>
            )}
            <h1 className="cast-heading">Cast</h1>
            {movieCastData.length !== 0 && (
              <ul className="cast-container">
                {movieCastData.map(each => (
                  <CastDetails key={each.id} movieCast={each} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default SinglePageMovie

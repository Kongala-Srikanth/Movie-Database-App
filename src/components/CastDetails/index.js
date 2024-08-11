import './index.css'

const CastDetails = props => {
  const {movieCast} = props
  const {
    id,
    character,
    gender,
    department,
    name,
    originalName,
    popularity,
    profilePath,
  } = movieCast

  console.log(movieCast)

  return (
    <li className="each-cast">
      <img
        src={`https://image.tmdb.org/t/p/original${profilePath}`}
        alt={originalName}
        className="profile-image"
      />
      <p className="cast-details">
        <span className="cast-bold">Name: </span>
        {originalName}
      </p>
      <p className="cast-details">
        <span className="cast-bold">Character: </span>
        {character.split('(voice)')}
      </p>
      <p className="cast-details">
        <span className="cast-bold">Department: </span>
        {department}
      </p>
      <p className="cast-details">
        <span className="cast-bold">Gender: </span>
        {gender === 1 ? 'Female' : 'Male'}
      </p>
    </li>
  )
}

export default CastDetails

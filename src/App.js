import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import TopRated from './components/TopRated'
import UpcomingMovies from './components/UpcomingMovies'
import SinglePageMovie from './components/SinglePageMovie'
import SearchedMovies from './components/SearchedMovies'
// import Header from './components/Header'
import './App.css'

// write your code here
const App = () => (
  <div className="bg-container">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={UpcomingMovies} />
      <Route exact path="/search" component={SearchedMovies} />
      <Route exact path="/:id" component={SinglePageMovie} />
    </Switch>
  </div>
)

export default App

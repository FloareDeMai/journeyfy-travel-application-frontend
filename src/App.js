import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom'
import CitiesList from "./components/CitiesList"
import CountryList from './components/CountryList';
import ActivityList from './components/ActivityList';


function App() {
  return (

    <div >
      <Navbar />
      <Switch>
        <Route path="/countries" exact><CountryList/></Route>
        <Route exact path="/cities/:countryCode" component={CitiesList} />
        <Route path="/favorites" exact></Route>
        <Route exact path="/activities/:latitude/:longitude" component={ActivityList}></Route>
      </Switch>
    </div>

  );
}

export default App;

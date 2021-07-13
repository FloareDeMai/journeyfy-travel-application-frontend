import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom'
import CitiesList from "./components/CitiesList"
import CountryList from './components/CountryList';


function App() {
  return (

    <div >
      <Navbar />
      <Switch>
        <Route path="/countries" exact><CountryList/></Route>
        <Route exact path="/cities/:countryCode" component={CitiesList}/>
        <Route path="/favorites" exact></Route>
      </Switch>
    </div>

  );
}

export default App;

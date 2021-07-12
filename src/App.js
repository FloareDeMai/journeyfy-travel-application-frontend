import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom'
import CitiesList from "./components/CitiesList"
import CountryList from './components/CountryList';


function App() {
  return (

    <div >
      <Navbar />
      <CountryList/>
      <Switch>
        <Route path="/cities:{countryCode}" exact><CitiesList /></Route>
        <Route path="/favorites" exact></Route>
      </Switch>
    </div>

  );
}

export default App;

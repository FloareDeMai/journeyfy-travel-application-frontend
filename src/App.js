import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom'
import CitiesList from "./components/CitiesList"


function App() {
  return (

    <div >
      <Navbar />
      <Switch>
        <Route path="/cities" exact><CitiesList /></Route>
        <Route path="/favorites" exact></Route>
      </Switch>
    </div>

  );
}

export default App;

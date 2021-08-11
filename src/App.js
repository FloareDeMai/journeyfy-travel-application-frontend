import {Route, Switch} from 'react-router-dom'
import CitiesList from "./components/CitiesList"
import CountryList from './components/CountryList';
import Layout from './components/Layout';
import ActivityList from './components/ActivityList';
import IntroductionPage from './components/IntroductionPage';
import About from './components/About';
import Favorites from './components/Favorites';
import Hotels from "./components/Hotels";
import TopHotels from "./components/TopHotels";
import HotelDetails from "./components/HotelDetails";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact><IntroductionPage></IntroductionPage></Route>
                <Route path="/countries" exact><CountryList/></Route>
                <Route exact path="/cities/:countryCode" component={CitiesList}/>
                <Route path="/favorites" exact><Favorites></Favorites></Route>
                <Route path="/about" exact><About></About></Route>
                <Route exact path="/activities/:latitude/:longitude" component={ActivityList}/>
                <Route exact path="/hotels/:cityName" component={Hotels}/>
                <Route exact path="/top-hotels" component={TopHotels}/>
                <Route exact path="/hotel-details" component={HotelDetails}/>
            </Switch>
        </Layout>
    );
}

export default App;

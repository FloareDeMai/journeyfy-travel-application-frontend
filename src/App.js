import { Route, Switch } from "react-router-dom";
import CitiesList from "./components/CitiesList";
import CountryList from "./components/CountryList";
import Layout from "./components/Layout";
import ActivityList from "./components/ActivityList";
import IntroductionPage from "./components/IntroductionPage";
import About from "./components/About";
import Favorites from "./components/Favorites";
import Hotels from "./components/Hotels";
import TopHotels from "./components/TopHotels";
import HotelDetails from "./components/HotelDetails";
import ClubsList from "./components/ClubsList";
import Club from "./components/Club";
import MuseumsList from "./components/MuseumsList";
import Museum from "./components/Museum";
import ThingsToDo from "./components/ThingsToDo";
import Activity from "./components/Activity";


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <IntroductionPage></IntroductionPage>
        </Route>
        <Route path="/countries" exact>
          <CountryList />
        </Route>
        <Route exact path="/cities/:countryCode" component={CitiesList} />
        <Route path="/favorites" exact>
          <Favorites></Favorites>
        </Route>
        <Route path="/about" exact>
          <About></About>
        </Route>
        <Route
          exact
          path="/activities/:latitude/:longitude"
          component={ActivityList}
        />
        <Route exact path="/hotels/:cityName" component={Hotels} />
        <Route exact path="/top-hotels" component={TopHotels} />
        <Route exact path="/hotel-details" component={HotelDetails} />
        <Route exact path="/clubs/:cityName" component={ClubsList} />
        <Route export path="/club/:clubName" component={Club}></Route>
        <Route exact path="/museums/:cityName" component={MuseumsList}></Route>
        <Route exact path="/museum/:museumName" component={Museum}></Route>
        <Route exact path="/things-to-do" component={ThingsToDo}></Route>
        <Route exact path="/activity/:activityName" component={Activity}></Route>
      </Switch>
    </Layout>
  );
}
export default App;

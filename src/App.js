import { Route, Switch } from "react-router-dom";
import IntroductionPage from "./pages/IntroductionPage";
import LayoutDesign from "./components/layout/LayoutDesign";
import Explore from "./pages/Explore";
import Cities from "./pages/Cities";
import Activities from "./pages/Activities";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Register from "./pages/Register"
import PlacesToStay from "./pages/PlacesToStay";
import HotelDetails from "./pages/HotelDetails";
import UserPage from "./pages/UserPage";
import Wishlist from "./pages/Wishlist";
import ThingsToDo from "./pages/ThingsToDo";
import ClubDetails from "./pages/ClubDetails";
import ActivityDetails from "./pages/ActivtyDetails";
import MuseumDetails from "./pages/MuseumDetails";



function App() {
  return (<div>
    <LayoutDesign>
      <Switch>
        <Route path="/" exact><IntroductionPage></IntroductionPage></Route>
        <Route path="/explore" exact><Explore></Explore></Route>
        <Route path="/places-to-stay" exact><PlacesToStay></PlacesToStay></Route>
        <Route exact path="/cities/:countryCode" component={Cities}></Route>
        <Route exact path="/activities/:latitude/:longitude" component={Activities}></Route>
        <Route exact path="/about"><About></About></Route>
        <Route exact path="/activity/:activityName" component={ActivityDetails}></Route>
        <Route exact path="/places-to-stay/:hotelName" component={HotelDetails}></Route>
        <Route exact path="/club/:clubName" component={ClubDetails}></Route>
        <Route exact path="/museums/:museumName" component={MuseumDetails}></Route>
        <Route path="/signin" exact><Signin></Signin></Route>
        <Route path="/register" exact><Register></Register></Route>
        <Route exact path="/user-page" component={UserPage}></Route>
        <Route exact path="/wishlist" component={Wishlist}/>
        <Route exact path="/things-to-do" component={ThingsToDo}></Route>
      </Switch>

    </LayoutDesign>

    </div>
  );
}

export default App;

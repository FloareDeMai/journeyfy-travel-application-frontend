import { Route, Switch } from "react-router-dom";
import IntroductionPage from "./pages/IntroductionPage";
import LayoutDesign from "./components/layout/LayoutDesign";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import PlacesToStay from "./pages/PlacesToStay";
import HotelDetails from "./pages/HotelDetails";
import UserPage from "./pages/UserPage";
import Wishlist from "./pages/Wishlist";
import ThingsToDo from "./pages/ThingsToDo";
import ActivityDetails from "./pages/ActivityDetails";
import Plan from "./pages/Plan";
import { atom } from 'jotai';

export const userAtom = atom(true)
export const tokenAtom = atom(false)

function App() {
  return (
    <div>
      <LayoutDesign>
        <Switch>
          <Route path="/" exact><IntroductionPage></IntroductionPage></Route>
          <Route path="/explore" exact><Explore></Explore></Route>
          <Route path="/signin" exact><Signin></Signin></Route>
          <Route path="/register" exact><Register></Register></Route>
          <Route path="/places-to-stay" exact><PlacesToStay></PlacesToStay></Route>
          <Route path="/about" exact><About></About></Route>
          <Route path="/plan" exact><Plan></Plan></Route>
          <Route exact path="/activity-details/:activityName" component={ActivityDetails}></Route>
          <Route exact path="/places-to-stay/:hotelName" component={HotelDetails}></Route>
          <Route exact path="/user-page" component={UserPage}></Route>
          <Route exact path="/wishlist/:userId" component={Wishlist} />
          <Route exact path="/things-to-do" component={ThingsToDo}></Route>
        </Switch>
      </LayoutDesign>
    </div>
  );
}

export default App;

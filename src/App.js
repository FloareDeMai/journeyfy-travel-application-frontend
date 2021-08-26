import { Route, Switch } from "react-router-dom";
import IntroductionPage from "./pages/IntroductionPage";
import LayoutDesign from "./components/layout/LayoutDesign";
import Explore from "./pages/Explore";
import Cities from "./pages/Cities";
import Activities from "./pages/Activities";
import About from "./pages/About";
import Activity from "./pages/Activity";
import Signin from "./pages/Signin";
import Register from "./pages/Register"
import PlacesToStay from "./pages/PlacesToStay";
import Maps from "./pages/Maps";

function App() {
  return (
    <LayoutDesign>
      <Switch>
        <Route path="/" exact><IntroductionPage></IntroductionPage></Route>
        <Route path="/maps" exact><Maps></Maps></Route>
        <Route path="/explore" exact><Explore></Explore></Route>
        <Route path="/places-to-stay" exact><PlacesToStay></PlacesToStay></Route>
        <Route exact path="/cities/:countryCode" component={Cities}></Route>
        <Route exact path="/activities/:latitude/:longitude" component={Activities}></Route>
        <Route exact path="/about"><About></About></Route>
        <Route exact path="/activity/:activityName" component={Activity}></Route>
        <Route path="/signin" exact><Signin></Signin></Route>
        <Route path="/register" exact><Register></Register></Route>>
      </Switch>
    </LayoutDesign>
  );
}

export default App;

import Home from "./pages/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./pages/profile/Profile";
import PetProfile from "./pages/petProfile/PetProfile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Adopt from "./pages/adopt/Adopt";
import Missing from "./pages/missing/Missing";
import Hotelpage from "./pages/hotelpage/Hotelpage";


function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch >
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
        {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/profile/:username">
          <Profile />
        </Route>
        <Route exact path="/pet/:username">
          <PetProfile />
        </Route>
        <Route exact path="/adopt">
          <Adopt />
        </Route>
        <Route exact path="/missing">
          <Missing />
        </Route>
        <Route exact path="/hotel">
          <Hotelpage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

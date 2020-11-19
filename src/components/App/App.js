import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";
import ArtistRoute from "../ArtistRoute/ArtistRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import GlobalStyles from "../GlobalStyles";

const DEFAULT_ARTIST_ID = "18ca9d5EU5R1AhVKPR1cm0";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/artists/:artistId">
          <ArtistRoute />
        </Route>
        <Route exact path="/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

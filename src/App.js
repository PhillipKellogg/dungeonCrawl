import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import World from "./components/world";
import Dialogue from "./components/dialogue";
import store from "./config/store";
import { func } from "prop-types";
import About from "./website/about";
import AboutMe from "./website/aboutMe";
import ScrollToTopRoute from "./website/scrollToTop/ScrollToTopRoute";
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <ScrollToTopRoute exact path="/" component={World} />
            <ScrollToTopRoute path="/about" component={About} />
            <ScrollToTopRoute path="/phillipkellogg" component={AboutMe} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;

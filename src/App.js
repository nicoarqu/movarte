import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { Home } from "./views/home";
import { About } from "./views/about";
import { Gallery } from "./views/gallery";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <ul>
            <li>
              <NavLink exact to="/">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/about">Acerca de</NavLink>
            </li>
            <li>
              <NavLink to="/gallery">Galería</NavLink>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

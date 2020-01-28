import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
 
import HeaderImg from './HeaderImg';
import About from './About';
import Selfies from './Selfies';
import Fans from './Fans';
import Kitbull from './Kitbull';

import './style.css';
import './spinner.css';
 
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentMenuEntry : '/about',
    }
  }

  menuClickEventHandler = (event) => {
    this.setState({currentMenuEntry: event.target.id});
  }

  // =============================================================================
  // - I need to determine the URL's context path so the app can run locally as well on mia-react.
  //   1. remove trailing '/'
  //   2. if path starts with '/mia-react' it's the context, otherwise it's ''.
  //   3. if the context === path (meaning no menu entry was selected) set menuEntry to '/about'.
  // - style the meny entry that is equals to menuEntry differently. 
  // =============================================================================
  render() {
    let pathName = window.location.pathname;
    let lastPathNameChar = pathName.charAt(pathName.length-1);
    pathName = (lastPathNameChar === '/') ? pathName.slice(0, -1) : pathName;
    let contextPath = (pathName.startsWith("/mia-react")) ? "/mia-react" : "";
    let menuEntry = pathName === contextPath ? contextPath + '/about' : pathName;
    let currentMenuEntryStyle = {textShadow: 'gray 1px 1px 4px'};

    return (      
       <Router>
        <header>
          <HeaderImg />
          
          <nav id="navbar">
            <Link to={`${contextPath}/about`} onClick={this.menuClickEventHandler} 
                              style={menuEntry.match('about') ? currentMenuEntryStyle : {}}>
                              <span id="index">About</span>
            </Link>
            <Link to={`${contextPath}/selfies`} onClick={this.menuClickEventHandler}
                                style={menuEntry.match('selfies') ? currentMenuEntryStyle : {}}>
                                <span id="selfies">Selfies</span>
            </Link>
            <Link to={`${contextPath}/fans`} onClick={this.menuClickEventHandler}
                             style={menuEntry.match('fans') ? currentMenuEntryStyle : {}}>
                             <span id="fans">Fan Club</span>
            </Link>
            <Link to={`${contextPath}/kitbull`} onClick={this.menuClickEventHandler}
                                style={menuEntry.match('kitbull') ? currentMenuEntryStyle : {}}>
                                <span id="kitbull">Kitbull</span>
            </Link>            
          </nav>
        </header>

        <Switch>
          <Route path={`${contextPath}/`} exact>
            <About />
          </Route> 
          <Route path={`${contextPath}/about`}>
            <About />
          </Route> 
          <Route path={`${contextPath}/selfies`}>
            <Selfies />
          </Route>  
          <Route path={`${contextPath}/fans`}>
            <Fans />
          </Route> 
          <Route path={`${contextPath}/kitbull`}>
            <Kitbull />
          </Route>         
        </Switch>
      </Router>
    );
  }
}
 
export default App;
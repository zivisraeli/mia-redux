import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { About } from './components/About'; 
import HeaderImgWrapper from './containers/HeaderImgWrapper';
import SelfiesWrapper from './containers/SelfiesWrapper';
import { FansWrapper } from './containers/FansWrapper';
import { KitbullWrapper } from './containers/KitbullWrapper';

import './css/app.css';
import './css/mediaQueries.css'
import './css/spinner.css';
 
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
  // - I need to determine the URL's context path so the app can run locally as well on mia-redux.
  //   1. remove trailing '/'
  //   2. if path starts with '/mia-redux' it's the context, otherwise it's ''.
  //   3. if the context === path (meaning no menu entry was selected) set menuEntry to '/about'.
  // - style the meny entry that is equals to menuEntry differently. 
  // =============================================================================
  render() {
    let pathName = window.location.pathname;
    let lastPathNameChar = pathName.charAt(pathName.length-1);
    pathName = (lastPathNameChar === '/') ? pathName.slice(0, -1) : pathName;
    let contextPath = (pathName.startsWith("/mia-redux")) ? "/mia-redux" : "";
    let menuEntry = pathName === contextPath ? contextPath + '/about' : pathName;
    let currentMenuEntryStyle = {textShadow: 'gray 1px 1px 4px'};

    return (      
       <Router>
        <header>
          <HeaderImgWrapper />
          
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
            <SelfiesWrapper />
          </Route>  
          <Route path={`${contextPath}/fans`}>
            <FansWrapper />
          </Route> 
          <Route path={`${contextPath}/kitbull`}>
            <KitbullWrapper />
          </Route>         
        </Switch>
      </Router>
    );
  }
}
 
export default App; 
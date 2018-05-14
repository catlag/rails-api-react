
import ReactDOM from 'react-dom'
import createReactClass from'create-react-class'
import PropTypes from 'prop-types';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import React, { Component } from 'react';

import Client from './Client';


import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const ListItemLink = ({to, children}) => (
  <Route path={to} children={({match}) => (
    <li role="presentation" className={match ? 'active nav-item' : 'nav-item'}>
      <Link className='nav-link' to={to}>{children}</Link>
    </li>
  )} />
);

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}


  class NavComponent extends Component {
  

    constructor(props) {
      super(props);
      this.state = { 
        width: 0,
        height: 0,
        mobile: false,
        navLinks: true
      };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
      if (window.innerWidth < 700 ){
        this.setState({ width: window.innerWidth, height: window.innerHeight, mobile: true, navLinks: false});

      }else{
        this.setState({ width: window.innerWidth, height: window.innerHeight, mobile: false, navLinks: true });

      }
    }

    toggleNavLinks = () => {
      this.setState((prevState) => ({
        navLinks: !prevState.navLinks
      }))
      console.log(this.state.navLink)
    }

    render() {
      const { isAuthenticated } = auth;
      var mobile = this.state.mobile === true ? 'mobile' : ''
      var navLink = this.state.navLinks === true ? 'show' : 'hidden'
      return (
        <nav className={"nav " + mobile}>
          <div className={"nav-container " + mobile}>
            <div className={"nav-title " + mobile}>  
              <Link to="/" className='title-link'>
                <p className='header-title'>
                  Casey Fallon
                </p>
              </Link>
              <div className={'nav-icon '+ mobile} onClick={this.toggleNavLinks}>
               <span className="glyphicon glyphicon-menu-hamburger"></span>
              </div>
            </div>
            <div className={"nav-links-container " +navLink }>
              <ul className="nav-item-wrapper">
                <ListItemLink to="/illustration">Illustration</ListItemLink>
                <ListItemLink to="/game_design">Game Design</ListItemLink>
                <ListItemLink to="/graphic_design">Graphic Design</ListItemLink>
                <ListItemLink to="/about">About</ListItemLink>
                <ListItemLink to="/login">Login</ListItemLink>
                <ListItemLink to="/signup">Register</ListItemLink>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  };

 NavComponent.contextTypes = {
    router: PropTypes.object
};

 export default NavComponent;




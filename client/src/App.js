import React, { Component } from 'react';
import logo from './logo.svg';
import './stylesheets/App.css';
import './stylesheets/nav_bar.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Illustration from './illustration';
import About from './about';
import GameDesign from './game_design';
import GraphicDesign from './graphic_design';
import ProjectList from './project_list';
import Nav from './nav_bar';
import BaseComponent from './BaseComponent';
import LoginForm from './login_form';
import Auth from './actions/Auth';
import UserStore from './stores/UserStore';
import RegistrationForm from './register_form';



class App extends Component {
    constructor() {
    super()
    this.state = {}
    }
  
    componentDidMount() {
    UserStore.addChangeListener(this.onAuthChange.bind(this))
      Auth.checkUserLoggedIn().then(function(data){
        this.setState({
          'signedIn': data['signed_in'],
          'currentUser': data['user']
        })
      }.bind(this)).catch(err => {
        console.log(err)
        this.setState({

        })
      })

    }

  onAuthChange(data) {
    this.setState({
      'signedIn': UserStore.isAuthenticated()
    })
  }


  render() {
     
    return (
      <div className="App">
        <Router>
          <div signedIn={ this.state.signedIn }>
            <Nav />
            <Switch>

              <Route exact component={ProjectList} to="/" path="/" selected="selected"/>
              <Route exact component={Illustration} to="/illustration" path="/illustration" />
              <Route exact component={GameDesign} path="/game_design" />
              <Route exact component={GraphicDesign} path="/graphic_design" />
              <Route exact component={About} path="/about" />
              <Route exact component={LoginForm} path="/login" />
              <Route exact component={RegistrationForm} path="/signup" />
            </Switch>
          </div>
        </Router>
        
      </div>


    );
  }
}

export default App;

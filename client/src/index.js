import React from 'react';
import ReactDOM from 'react-dom'
import createReactClass from'create-react-class'


import './stylesheets/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


    const TitleComponent = createReactClass({
    render: function() {
      return 
    }
  });

  // ReactDOM.render(<TitleComponent />, document.getElementById('title'));



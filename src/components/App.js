import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../styles/index.less'

import Home from '../pages/home/index';
import News from '../pages/news/index'

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* <Route path="/" component={App}> */}
          <Route path="/" component={Home} />
          <Route path="/news" component={News} />
        {/* </Route> */}
      </Router>
      
    );
  }
}

// ReactDOM.render(<App/> , document.getElementById('root'));

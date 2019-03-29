import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { renderRoutes } from 'react-router-config'
import Routes from './routes/app'

import "assets/css/styles.css";

class Client extends Component {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render(){
    return (
      <BrowserRouter>
        <div>{renderRoutes(Routes)}</div>
      </BrowserRouter>
    )
  }
}

export default hot(module)(Client);

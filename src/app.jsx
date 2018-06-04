/*
 * @Author: X.Heart
 * @Date: 2018-06-01 16:52:58
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 14:02:54
 * @description: App
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

import Layout from 'component/layout/index.jsx'
// 页面
import Home from 'page/home/index.jsx'

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/pruduct" component={Home} />
            <Route exact path="/pruduct-category" component={Home} />
            <Route exact path="/order" component={Home} />
            <Route exact path="/user" component={Home} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
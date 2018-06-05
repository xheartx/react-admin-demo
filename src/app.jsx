/*
 * @Author: X.Heart
 * @Date: 2018-06-01 16:52:58
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-05 11:10:56
 * @description: App
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

import Layout from 'component/layout/index.jsx'
// 页面
import Login from 'page/login/index.jsx'
import Home from 'page/home/index.jsx'
import ProductRouter from 'page/product/route.jsx'
import UserList from 'page/user/index.jsx'
import ErrorPage from 'page/error/index.jsx'


class App extends Component {
  render() {
    let LayoutRouter = (
      <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product" component={ProductRouter} />
            <Route path="/product-category" component={Home} />
            <Route path="/user/index" component={UserList} />
            <Redirect exact from="/user" to="/user/index" />
            <Route path="/order" component={Home} />
            <Route component={ErrorPage} />
          </Switch>
        </Layout>
    );
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={(props) => LayoutRouter} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
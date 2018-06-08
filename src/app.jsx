/*
 * @Author: X.Heart
 * @Date: 2018-06-01 16:52:58
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 15:17:28
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
import OrderList from 'page/order/index.jsx'
import OrderDetail from 'page/order/detail.jsx'
import UserList from 'page/user/index.jsx'
import ErrorPage from 'page/error/index.jsx'

class App extends Component {
  render() {
    let LayoutRouter = (
      <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product" component={ProductRouter} />
            <Route path="/product-category" component={ProductRouter} />
            <Route path="/order/index" component={OrderList} />
            <Route path="/order/detail/:orderNumber" component={OrderDetail} />
            <Redirect exact from="/order" to="/order/index" />
            <Route path="/user/index" component={UserList} />
            <Redirect exact from="/user" to="/user/index" />
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
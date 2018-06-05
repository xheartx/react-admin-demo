/*
 * @Author: X.Heart
 * @Date: 2018-06-05 11:02:46
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-05 14:35:46
 * @description: product 路由
 */
/*
 * @Author: X.Heart
 * @Date: 2018-06-01 16:52:58
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 17:50:01
 * @description: App
 */

import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

// 页面
import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'


class ProducrRouter extends Component {
  render() {
    return (
        <Switch>
          <Redirect exact from="/product" to="/product/index" />
          <Route path="/product/index" component={ProductList} />
          <Route path="/product/save" component={ProductSave} />
        </Switch>
    )
  }
}

export default ProducrRouter
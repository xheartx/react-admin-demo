/*
 * @Author: X.Heart
 * @Date: 2018-06-05 11:02:46
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 14:35:11
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
import ProductDetail from 'page/product/index/detail.jsx'
import CategoryList from 'page/product/category/index.jsx';
import CategoryAdd from 'page/product/category/add.jsx';

class ProducrRouter extends Component {
  render() {
    return (
        <Switch>
          <Route path="/product/index" component={ProductList} />
          <Route path="/product/save/:pid?" component={ProductSave} />
          <Route path="/product/detail/:pid" component={ProductDetail} />
          <Route path="/product-category/index/:categoryId?" component={CategoryList} />
          <Route path="/product-category/add" component={CategoryAdd} />
          
          <Redirect exact from="/product" to="/product/index" />
          <Redirect exact from="/product-category" to="/product-category/index" />
        </Switch>
    )
  }
}

export default ProducrRouter
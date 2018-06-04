/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 11:08:05
 * @description: 布局组件
 */
import React, { Component }from 'react';

import NavTop from 'component/nav-top/index.jsx';
import NavSide from 'component/nav-side/index.jsx';
import './theme.css';

class Layout extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div id="wrapper">
        <NavTop/>
        <NavSide/>
        {this.props.children}
      </div>
    )
  }
}

export default Layout
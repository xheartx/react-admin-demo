/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 17:40:35
 * @description: Home
 */
import React, { Component }from 'react'
import { Link } from 'react-router-dom'

import PageTitle from 'component/page-title/index.jsx'

class ErrorPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="page-wrapper">
        <PageTitle title="出错啦！" />
        <div className="row">
          <div className="col-md-12">
            <span>找不到该路径，</span>
            <Link to="/">点我返回首页</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorPage
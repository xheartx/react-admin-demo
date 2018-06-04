/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 14:15:58
 * @description: Home
 */
import React, { Component }from 'react'

import PageTitle from 'component/page-title/index.jsx'

class Home extends Component {
  render() {
    return(
      <div id="page-wrapper">
        <PageTitle title="首页" />
        <div className="row">
          <div className="col-md-12">
            body
          </div>
        </div>
      </div>
    )
  }
}

export default Home
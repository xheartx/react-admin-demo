/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 14:21:41
 * @description: page-title
 */
import React, { Component }from 'react';

class PageTitle extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    document.title = `${this.props.title} - HAPPY XHEART` 
  }
  render() {
    return(
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header">{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default PageTitle;
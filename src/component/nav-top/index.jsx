/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 13:52:12
 * @description: 顶部导航
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavTop extends Component {
  constructor(props) {
    super(props)
  }
  // 退出登录
  onLogout() {

  }
  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;" aria-expanded="false">
              <i className="fa fa-user fa-fw"></i>
              <span>欢迎，adminxxx</span>
              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={this.onLogout.bind(this)} href="javascript:;">
                  <i className="fa fa-sign-out fa-fw"></i> 
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default NavTop
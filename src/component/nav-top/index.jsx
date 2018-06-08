/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 16:51:21
 * @description: 顶部导航
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import XUtil from 'util/xutil.jsx'
import User from 'service/user-service.jsx'

const _util = new XUtil();
const _user = new User();

class NavTop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: _util.getStorage('userInfo').username || ''
    }
  }
  // 退出登录
  onLogout() {
    _user.logout().then(res => {
      _util.removeStorage('userInfo');
      window.location.href = '/login'
    }, errMsg => {
      _util.errorTips(errMsg)
    })
  }
  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>HAPPY</b>XHEART</Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;" aria-expanded="false">
              <i className="fa fa-user fa-fw"></i>
              {
                this.state.username
                ? <span>欢迎，{this.state.username}</span>
                : <span>欢迎您</span>
              }
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
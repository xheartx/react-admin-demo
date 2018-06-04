/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 17:00:45
 * @description: 登录页面
 */
import React, { Component }from 'react';
import XUtil from 'util/xutil.jsx'
import User from 'service/user-service.jsx'

const _util = new XUtil();
const _user = new User();

import './index.scss'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: _util.getUrlParam('redirect') || '/'
    }
  }
  componentWillMount() {
    document.title = '登录 - HAPPY XHEART'
  }
  // 改变用户名
  onInputChange(e) {
    let inputValue = e.target.value,
        inputName = e.target.name;
    this.setState({
      [inputName]: inputValue
    })
  }
  onInputKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSubmit()
    }
  }
  // 提交表单
  onSubmit() {
    let loginInfo = {
          username: this.state.username,
          password: this.state.password,
        },
        checkResult = _user.checkLoginInfo(loginInfo);
      if (checkResult.status) {
        _user.login(loginInfo).then((res) => {
          _util.setStorage('userInfo', res)
          this.props.history.push(this.state.redirect)
        }, (errMsg) => {
          _util.errorTips(errMsg)
        })
      } else {
        _util.errorTips(checkResult.msg)
      }
  }
  render() {
    return(
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 - XHEART管理系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input type="text"
                       name="username"
                       className="form-control"
                       placeholder="请输入用户名"
                       onKeyUp={this.onInputKeyUp.bind(this)}
                       onChange={this.onInputChange.bind(this)} />
              </div>
              <div className="form-group">
                <input type="password" 
                       name="password"
                       className="form-control" 
                       placeholder="请输入密码"
                       onKeyUp={this.onInputKeyUp.bind(this)}
                       onChange={this.onInputChange.bind(this)} />
              </div>
              <button className="btn btn-primary btn-lg btn-block"
                      onClick={this.onSubmit.bind(this)}>登录</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
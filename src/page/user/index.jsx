/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 18:08:02
 * @description: User
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import XUtil from 'util/xutil.jsx'
import User from 'service/user-service.jsx'

import Pagination from 'util/pagination/index.jsx';
import PageTitle from 'component/page-title/index.jsx'

const _util = new XUtil();
const _user = new User();

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      list: [],
      firstLoading: true
    }
  }
  componentDidMount() {
    this.loadUserList()
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res, () => {
        this.setState({ firstLoading: false })
      })
    }, errMsg => {
      this.setState({
        list: [],
      })
      _util.errorTips(errMsg)
    })
  }
  onPageNumChange(page) {
    this.setState({
      pageNum: page,
    }, () => {
      this.loadUserList()
    });
  }
  render() {
    let listBody = this.state.list.map((user, index) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{new Date(user.createTime).toLocaleString()}</td>
        </tr>
      )
    })

    let listError = (
      <tr>
        <td colSpan="5" className="text-center">
        {
          this.state.firstLoading ? '正在加载数据...' : '没有找到相应的结果'
        }
        </td>
      </tr>
    )

    let tableBody = this.state.list.length > 0 ? listBody : listError

    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>邮箱</th>
                  <th>电话</th>
                  <th>注册时间</th>
                </tr>
              </thead>
              <tbody>
                { tableBody }
              </tbody>
            </table>
          </div>
        </div>
        <Pagination current={this.state.pageNum}
                    total={this.state.total}
                    onChange={this.onPageNumChange.bind(this)}/>
      </div>
    )
  }
}

export default UserList
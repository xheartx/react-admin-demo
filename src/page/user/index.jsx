/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-05 11:49:41
 * @description: User
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import XUtil from 'util/xutil.jsx'
import User from 'service/user-service.jsx'

import Pagination from 'util/pagination/index.jsx';
import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx';

const _util = new XUtil();
const _user = new User();

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      list: []
    }
  }
  componentDidMount() {
    this.loadUserList()
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res)
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
    let tableHeads = [
      { name: 'ID', width: '10%' }, 
      { name: '用户名', width: '20%' }, 
      { name: '邮箱', width: '20%' }, 
      { name: '电话', width: '20%' }, 
      { name: '注册时间', width: '30%' }, 
    ]
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
        <TableList tableHeads={ tableHeads }>
          {
            this.state.list.map((user, index) => {
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
          }
        </TableList>
        <Pagination current={this.state.pageNum}
                    total={this.state.total}
                    onChange={this.onPageNumChange.bind(this)}/>
      </div>
    )
  }
}

export default UserList
/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 18:08:02
 * @description: User
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'util/pagination/index.jsx';

import PageTitle from 'component/page-title/index.jsx'

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1
    }
  }
  onChange(page) {
    this.setState({
      current: page,
    });
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID</th>
                  <th>ID</th>
                  <th>ID</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Pagination current={1} total={300} />
      </div>
    )
  }
}

export default UserList
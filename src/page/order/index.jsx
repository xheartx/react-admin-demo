/*
 * @Author: X.Heart
 * @Date: 2018-06-07 15:03:33
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 15:20:58
 * @description: 订单管理
 */

import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import XUtil from 'util/xutil.jsx';
import Order from 'service/order-service.jsx';

import Pagination from 'util/pagination/index.jsx';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import ListSearch from './index-list-search.jsx'

const _util = new XUtil();
const _order = new Order();


class OrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      list: [],
      listType: 'list' // list || search
    }
  }
  componentDidMount() {
    this.loadOrderList()
  }
  // 加载商品列表
  loadOrderList() {
    let listParam = {
      pageNum: this.state.pageNum,
      listType: this.state.listType
    }
    // 如果是搜索的话，需要传入搜索类型和搜索关键字
    if (this.state.listType === 'search') {
      listParam.orderNo = this.state.orderNumber;
    }
    // 请求接口
    _order.getOrderList(listParam).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list: [],
      })
      _util.errorTips(errMsg)
    })
  }
  // 搜索
  onSearch(orderNumber) {
    let listType = orderNumber === '' ? 'list' : 'search'
    this.setState({
      listType,
      pageNum: 1,
      orderNumber
    }, () => {
      this.loadOrderList()
    })
  }
  onPageNumChange(page) {
    this.setState({
      pageNum: page,
    }, () => {
      this.loadOrderList()
    });
  }
  render() {
    // let tableHeads = [
    //   { name: '商品ID', width: '10%' }, 
    //   { name: '商品信息', width: '50%' }, 
    //   { name: '价格', width: '10%' }, 
    //   { name: '状态', width: '15%' }, 
    //   { name: '操作', width: '15%' }, 
    // ]
    let tableHeads = ['订单号','收件人','订单状态','订单总价','创建时间','操作']
    return (
      <div id="page-wrapper">
        <PageTitle title="订单列表" />
        <ListSearch onSearch={this.onSearch.bind(this)}/>
        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((order, index) => {
              return (
                <tr key={order.orderNo}>
                  <td>
                    <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                  </td>
                  <td>{order.receiverName}</td>
                  <td>{order.statusDesc}</td>
                  <td>￥{order.payment}</td>
                  <td>{order.createTime}</td>
                  <td>
                    <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
                  </td>
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

export default OrderList
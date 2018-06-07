/*
 * @Author: X.Heart
 * @Date: 2018-06-05 10:52:57
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 14:53:31
 * @description: 产品管理
 */

import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import XUtil from 'util/xutil.jsx';
import Product from 'service/product-service.jsx';

import Pagination from 'util/pagination/index.jsx';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import ListSearch from './index-list-search.jsx'

import './index.scss'

const _util = new XUtil();
const _product = new Product();


class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      list: [],
      listType: 'list'
    }
  }
  componentDidMount() {
    this.loadProductList()
  }
  // 加载商品列表
  loadProductList() {
    let listParam = {
      pageNum: this.state.pageNum,
      listType: this.state.listType
    }
    // 如果是搜索的话，需要传入搜索类型和搜索关键字
    if (this.state.listType === 'search') {
      listParam.searchType = this.state.searchType;
      listParam.keyword = this.state.searchKeyword;
    }
    // 请求接口
    _product.getProductList(listParam).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list: [],
      })
      _util.errorTips(errMsg)
    })
  }
  // 搜索
  onSearch(searchType, searchKeyword) {
    let listType = searchKeyword === '' ? 'list' : 'search'
    this.setState({
      pageNum: 1,
      listType,
      searchType,
      searchKeyword
    }, () => {
      this.loadProductList()
    })
  }
  onPageNumChange(page) {
    this.setState({
      pageNum: page,
    }, () => {
      this.loadProductList()
    });
  }
  // 改变商品状态
  onSetProductStatus(productId, currentStatus) {
    let newStatus = currentStatus == 1 ? 2 : 1,
        confirmTips = `确定要${currentStatus == 1 ? '下' : '上'}架该商品？`
    if (window.confirm(confirmTips)) {
      _product.setProductStatus({
        productId, 
        status: newStatus
      }).then(res => {
        _util.successTips(res);
        this.loadProductList()
      }, errMsg => {
        _util.errorTips(errMsg)
      })
    }
  }
  render() {
    let tableHeads = [
      { name: '商品ID', width: '10%' }, 
      { name: '商品信息', width: '50%' }, 
      { name: '价格', width: '10%' }, 
      { name: '状态', width: '15%' }, 
      { name: '操作', width: '15%' }, 
    ]
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表">
          <div className="page-header-right">
            <Link className="btn btn-primary" to="/product/save">
              <i className="fa fa-plus"></i>
              <span> 添加商品</span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={this.onSearch.bind(this)}/>
        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td className="left-align">
                    <p>{product.name}</p>
                    <p>{product.subtitle}</p>
                  </td>
                  <td>￥{product.price}</td>
                  <td>
                    <p>{product.status == 1 ? '在售' : '已下架'}</p>
                    <button className="btn btn-xs btn-warning" onClick={this.onSetProductStatus.bind(this, product.id, product.status)}>{product.status == 1 ? '下架' : '上架'}</button>
                  </td>
                  <td>
                    <Link className="opear" to={`/product/detail/${product.id}`}>详情</Link>
                    <Link className="opear" to={`/product/save/${product.id}`}>编辑</Link>
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

export default ProductList
/*
 * @Author: X.Heart
 * @Date: 2018-06-07 13:58:00
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 14:54:48
 * @description: 品类管理
  */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import XUtil from 'util/xutil.jsx'
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx';

const _util = new XUtil();
const _product = new Product();

class CategoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categoryId || 0
    }
  }
  componentDidMount() {
    this.loadCategoryList()
  }
  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname,
        newPath = this.props.location.pathname,
        newId = this.props.match.params.categoryId || 0;
    if (oldPath !== newPath) {
      this.setState({
        parentCategoryId: newId
      }, () => {
        this.loadCategoryList()
      })
    }
  }
  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(res => {
      this.setState({
        list: res
      })
    }, errMsg => {
      this.setState({
        list: [],
      })
      _util.errorTips(errMsg)
    })
  }
  onUpdateName(categoryId, categoryName) {
    let newName = window.prompt('请输入新的品类名称', categoryName)
    if (newName) {
      _product.updateCategoryName({
        categoryId,
        categoryName: newName
      }).then(res => {
        _util.successTips(res)
        this.loadCategoryList()
      }, errMsg => {
        _util.errorTips(errMsg)
      })
    }
  }
  render() {
    let tableHeads = [
      { name: '品类ID', width: '10%' }, 
      { name: '品类名称', width: '20%' }, 
      { name: '操作', width: '30%' }, 
    ]
    return (
      <div id="page-wrapper">
        <PageTitle title="品类列表">
          <div className="page-header-right">
            <Link className="btn btn-primary" to="/product-category/add">
              <i className="fa fa-plus"></i> 
              <span> 添加品类</span>
            </Link>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <p>父品类ID {this.state.parentCategoryId}</p>
          </div>
        </div>
        <TableList tableHeads={ ['品类ID', '品类名称', '操作'] }>
          {
            this.state.list.map((category, index) => {
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <a href="javascript:;" className="opear" onClick={this.onUpdateName.bind(this, category.id, category.name)}>修改名称</a>
                    {
                      category.parentId === 0
                      ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                      : null
                    }
                  </td>
                </tr>
              )
            })
          }
        </TableList>
      </div>
    )
  }
}

export default CategoryList
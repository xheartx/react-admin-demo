/*
 * @Author: X.Heart
 * @Date: 2018-06-05 15:09:13
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 13:43:28
 * @description: 品类选择器
 */

import React, { Component } from 'react';
import XUtil from 'util/xutil.jsx';
import Product from 'service/product-service.jsx';
import './category-selector.scss';

const _util = new XUtil();
const _product = new Product();

class CategorySelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstCategoryId: 0,
      firstCategoryList: [],
      secondCategoryId: 0,
      secondCategoryList: []
    }
  }
  componentDidMount() {
    this.loadFirstCategory()
  }
  componentWillReceiveProps(nextProps) {
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
        parentcategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
    // 数据没有发生变化的时候， 不做处理
    if (!categoryIdChange && !parentcategoryIdChange) {
      return
    }
    // 假如只有一级品类
    if (nextProps.parentCategoryId === 0) {
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0,
      })
    }
    // 假如有两及品类
    else {
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId
      }, () => {
        parentcategoryIdChange && this.loadSecondCategory()
      })
    }
  }
  // 加载一级分类
  loadFirstCategory() {
    _product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList: res
      })
    }, errMsg => {
      _util.errorTips(errMsg)
    })
  }
  // 加载二级分类
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList: res
      })
    }, errMsg => {
      _util.errorTips(errMsg)
    })
  }
  // 选择一级品类
  onFirstCategoryChange(e) {
    if (this.props.readOnly) {
      return 
    }
    let newValue = e.target.value || 0;
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      this.loadSecondCategory();
      this.onPropsCategoryChange()
    })
  }
  onSecondCategoryChange(e) {
    if (this.props.readOnly) {
      return 
    }
    let newValue = e.target.value || 0;
    this.setState({
      secondCategoryId: newValue,
    }, () => {
      this.onPropsCategoryChange()
    })
  }
  // 传给父组件选中的结果
  onPropsCategoryChange() {
    // 判断是否有props函数
    let categoryChangable = typeof this.props.onCategoryChange === 'function'
    if (this.state.secondCategoryId) {
      // 如果有二级品相
      categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
    } else {
      // 如果有一级品相
      categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
    }
  }
  render() {
    return (
      <div className="col-md-10">
        <select className="form-control cate-select"
                readOnly={this.props.readOnly}
                value={this.state.firstCategoryId}
                onChange={this.onFirstCategoryChange.bind(this)}>
          <option value="">请选择一级分类</option>
          {
            this.state.firstCategoryList.map((category, index) => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))
          }
        </select>
        {
          this.state.secondCategoryList.length > 0 ? 
          (<select className="form-control cate-select"
                   readOnly={this.props.readOnly}
                   value={this.state.secondCategoryId}
                   onChange={this.onSecondCategoryChange.bind(this)}>
            <option value="">请选择二级分类</option>
            {
              this.state.secondCategoryList.map((category, index) => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))
            }
          </select>) : null
        }
      </div>
    )
  }
}

export default CategorySelector
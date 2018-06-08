/*
 * @Author: X.Heart
 * @Date: 2018-06-05 10:52:57
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 14:01:49
 * @description: 产品管理
 */

import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import XUtil from 'util/xutil.jsx';
import Product from 'service/product-service.jsx';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';

import './save.scss'

const _util = new XUtil();
const _product = new Product();


class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      price: '',
      stock: '',
      detail: '',
      status: 1  // 商品状态 1 ： 在售
    }
  }
  componentDidMount() {
    this.loadProduct()
  }
  // 加载商品详情
  loadProduct() {
    if (this.state.id) {
      // 有ID表示编辑功能，需要表单回填
      _product.getProduct(this.state.id).then(res => {
        let images = res.subImages.split(',');
        res.subImages = images.map((imgUri) => {
          return {
            uri: imgUri,
            url: res.imageHost + imgUri
          }
        })
        this.setState(res)
      }, errMsg => {
        _util.errorTips(errMsg)
      })
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={this.state.id ? "编辑商品" : "添加商品"} />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.subtitle}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector 
              readOnly
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId} />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input type="number" 
                       className="form-control" 
                       readOnly
                       value={this.state.price}  />
                <span className="input-group-addon">元</span>
              </div>
              {/* <p className="form-control-static">{this.state.price} 元</p> */}
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input type="number" 
                       className="form-control"
                       readOnly
                       value={this.state.stock} />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10 file-upload-images">
            {
              this.state.subImages.length ? this.state.subImages.map((image, index) => (
                <div className="img-con" key={image.uri}>
                  <img src={image.url} alt=""/>
                </div>
              )) : (<div>暂无图片图片</div>)
            }
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10 product-detail" dangerouslySetInnerHTML={{__html: this.state.detail}}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetail
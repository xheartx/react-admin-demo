/*
 * @Author: X.Heart
 * @Date: 2018-06-05 10:52:57
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-06 11:53:25
 * @description: 产品管理
 */

import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import XUtil from 'util/xutil.jsx';
import Product from 'service/product-service.jsx';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';

import './save.scss'

const _util = new XUtil();
const _product = new Product();


class ProductSave extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: 0,
      parentCategoryId: 0,
      subImages: []
    }
  }
  // 品类选择器的变化
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId,
      parentCategoryId
    })
  }
  // 上传图片成功
  onUploadSuccess(res) {
    let subImages = this.state.subImages;
    subImages.push(res);
    this.setState({
      subImages
    })
  }
  // 上传图片失败
  onUploadError(errMsg) {
    _util.errorTips(errMsg)
  }
  // 删除图片
  onImageDelete(e) {
    let index = parseInt(e.target.getAttribute('index')),
        subImages = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
      subImages
    })
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加商品" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="请输入商品名称" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="请输入商品描述" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector onCategoryChange={this.onCategoryChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input type="number" className="form-control" placeholder="价格" />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input type="number" className="form-control" placeholder="库存" />
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
                  <i className="fa fa-close" index={index} onClick={this.onImageDelete.bind(this)}></i>
                </div>
              )) : (<div>请上传图片</div>)
            }
            </div>
            <div className="col-md-10 col-md-offset-2 file-upload-con">
              <FileUploader onSuccess={this.onUploadSuccess.bind(this)}
                            onError={this.onUploadError.bind(this)} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <textarea></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button type="submit" className="btn btn-primary">提交</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSave
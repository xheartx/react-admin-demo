/*
 * @Author: X.Heart
 * @Date: 2018-06-07 14:21:53
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 14:49:13
 * @description: 
 */
/*
 * @Author: X.Heart
 * @Date: 2018-06-07 13:58:00
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 14:21:43
 * @description: 新增品类
  */
 import React, { Component } from 'react'
 import XUtil from 'util/xutil.jsx'
 import Product from 'service/product-service.jsx';
 
 import PageTitle from 'component/page-title/index.jsx'
 
 const _util = new XUtil();
 const _product = new Product();
 
 class CategoryAdd extends Component {
   constructor(props) {
     super(props)
     this.state = {
       categoryList: [],
       parentId: 0,
       categoryName: ''
     }
   }
   componentDidMount() {
    this.loadCategoryList()
   }
   // 显示父品类列表
   loadCategoryList() {
     _product.getCategoryList().then(res => {
       this.setState({
        categoryList: res
       })
     }, errMsg => {
       _util.errorTips(errMsg)
     })
   }
    // 简单字段改变
    onValueChange(e) {
      let name = e.target.name,
          value = e.target.value.trim();
      this.setState({
        [name]: value
      })
    }
    onSubmit() {
      let categoryName = this.state.categoryName.trim()
      if (categoryName) {
        _product.saveCategory({
          parentId: this.state.parentId,
          categoryName
        }).then(res => {
          _util.successTips(res)
          this.props.history.push('/product-category/index')
        }, errMsg => {
          _util.errorTips(errMsg)
        })
      } else {
        _util.errorTips('请输入品类名称！')
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
         <PageTitle title="品类列表" />
         <div className="row">
           <div className="col-md-12">
            <div className="form-horizontal">
                <div className="form-group">
                  <label className="col-md-2 control-label">所属品类</label>
                  <div className="col-md-5">
                    <select name="parentId"
                            className="form-control"
                            onChange={this.onValueChange.bind(this)}>
                      <option value="0">根品类/</option>
                      {
                        this.state.categoryList.map((category, index) => {
                          return <option value={category.id} key={category.id}>根品类/{category.name}</option>
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-2 control-label">品类名称</label>
                  <div className="col-md-5">
                    <input type="text" 
                          className="form-control" 
                          placeholder="请输入品类名称"
                          name="categoryName"
                          // value={this.state.categoryName}
                          onChange={this.onValueChange.bind(this)} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-offset-2 col-md-10">
                    <button type="submit" 
                            className="btn btn-primary"
                            onClick={this.onSubmit.bind(this)}>提交</button>
                  </div>
                </div>
            </div>
           </div>
         </div>
       </div>
     )
   }
 }
 
 export default CategoryAdd
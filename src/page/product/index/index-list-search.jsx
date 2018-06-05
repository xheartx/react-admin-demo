/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-05 14:26:44
 * @description: 搜索组件
 */
import React, { Component }from 'react'

class ListSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchType: 'productId', // productId , productName
      searchKeyword: ''
    }
  }
  // 数据变化处理
  onValueChange(e) {
    let name = e.target.name,
        value = e.target.value.trim();
    this.setState({
      [name]: value
    })
  }
  // 点击搜索按钮
  onSearch() {
    this.props.onSearch(this.state.searchType, this.state.searchKeyword)
  }
  // 输入关键字按回车提交
  onSearchKeywordKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSearch()
    }
  }
  render() {
    return(
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select className="form-control" 
                      name="searchType"
                      onChange={this.onValueChange.bind(this)}>
                <option value="productId">按商品ID查询</option>
                <option value="productName">按商品名称查询</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" 
                     className="form-control" 
                     placeholder="关键词" 
                     name="searchKeyword"
                     onKeyUp={this.onSearchKeywordKeyUp.bind(this)}
                     onChange={this.onValueChange.bind(this)} />
            </div>
            <button className="btn btn-primary"
                    onClick={this.onSearch.bind(this)}>搜索</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListSearch
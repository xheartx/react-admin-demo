/*
 * @Author: X.Heart
 * @Date: 2018-06-04 10:21:14
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 15:13:53
 * @description: 搜索组件
 */
import React, { Component }from 'react'

class ListSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderNumber: ''
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
    this.props.onSearch(this.state.orderNumber)
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
              <select className="form-control">
                <option>按订单号查询</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" 
                     className="form-control" 
                     placeholder="请输入订单号" 
                     name="orderNumber"
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
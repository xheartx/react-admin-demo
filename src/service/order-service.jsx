/*
 * @Author: X.Heart
 * @Date: 2018-06-04 15:40:26
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 15:18:49
 * @description: 订单服务
 */

import XUtil from 'util/xutil.jsx'

const _util = new XUtil();

class Order {
    // 获取商品列表
    getOrderList(listParam) {
      let url = '',
          data = {
            pageNum: listParam.pageNum
          };
      if (listParam.listType === 'list') {
        url = "/manage/order/list.do"
      } else if (listParam.listType === 'search'){
        url = "/manage/order/search.do"
        data.orderNo = listParam.orderNo
      }
      return _util.request({
        type: 'post',
        url,
        data
      })
    }
    // 获取订单详情
    getOrderDetail(orderNo) {
      return _util.request({
        type: 'post',
        url: '/manage/order/detail.do',
        data: {
          orderNo
        }
      })
    }
    // 发货
    onSendGoods(orderNo) {
      return _util.request({
        type: 'post',
        url: '/manage/order/send_goods.do',
        data: {
          orderNo
        }
      })
    }
}

export default Order;

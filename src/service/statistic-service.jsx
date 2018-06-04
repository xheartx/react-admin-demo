/*
 * @Author: X.Heart
 * @Date: 2018-06-04 15:40:26
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-04 17:19:50
 * @description: 用户服务
 */

import XUtil from 'util/xutil.jsx'

const _util = new XUtil();

class Statistic {
  // 首页数据统计
  getHomeCount() {
    return _util.request({
      type: 'get',
      url: '/manage/statistic/base_count.do'
    })
  }
}

export default Statistic;

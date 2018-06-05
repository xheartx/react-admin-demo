/*
 * @Author: X.Heart
 * @Date: 2018-06-04 15:40:26
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-05 15:27:51
 * @description: 产品服务
 */

import XUtil from 'util/xutil.jsx'

const _util = new XUtil();

class Product {
    // 获取商品列表
    getProductList(listParam) {
      let url = '',
          data = {
            pageNum: listParam.pageNum
          };
      if (listParam.listType === 'list') {
        url = "/manage/product/list.do"
      } else if (listParam.listType === 'search'){
        url = "/manage/product/search.do"
        data[listParam.searchType] = listParam.keyword
      }
      return _util.request({
        type: 'post',
        url,
        data
      })
    }
    // 变更商品销售状态
    setProductStatus(productInfo) {
      return _util.request({
        type: 'post',
        url: '/manage/product/set_sale_status.do',
        data: productInfo
      })
    }

    /*
    * 品类相关
    */
   getCategoryList(parentCategoryId) {
      return _util.request({
        type: 'post',
        url: '/manage/category/get_category.do',
        data: {
          categoryId: parentCategoryId || 0
        }
      })
   }
}

export default Product;

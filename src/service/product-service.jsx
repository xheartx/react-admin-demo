/*
 * @Author: X.Heart
 * @Date: 2018-06-04 15:40:26
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 14:52:08
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
    getProduct(productId = 0) {
      return _util.request({
        type: 'post',
        url: '/manage/product/detail.do',
        data: {
          productId
        }
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
    // 检查保存商品表单数据
    checkProduct(product) {
      let result = {
        status: true,
        msg: '验证通过'
      }
      console.log(product)
      // 判断商品名称为空
      if (typeof product.name !== 'string' || product.name.length === 0) {
        return {
          status: false,
          msg: '商品名称不能为空！'
        }
      }
      // 判断商品描述为空
      if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
        return {
          status: false,
          msg: '商品描述不能为空！'
        }
      }
      // 判断品类ID
      if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
        return {
          status: false,
          msg: '请选择商品品类！'
        }
      }
      // 判断商品价格为数字且大于零
      if (typeof product.price !== 'number' || !(product.price >= 0)) {
        return {
          status: false,
          msg: '请输入正确的商品价格！'
        }
      }
      // 判断商品库存为数字且大于零
      if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
        return {
          status: false,
          msg: '请输入正确的库存数量！'
        }
      }
      return result;
    }
    // 保存商品
    saveProduct(product) {
      return _util.request({
        type: 'post',
        url: '/manage/product/save.do',
        data: product
      })
    }

    /*
    * 品类相关
    */
   // 根据ID 获取品类列表
   getCategoryList(parentCategoryId) {
      return _util.request({
        type: 'post',
        url: '/manage/category/get_category.do',
        data: {
          categoryId: parentCategoryId || 0
        }
      })
   }
   // 新增品类
   saveCategory(category) {
    return _util.request({
      type: 'post',
      url: '/manage/category/add_category.do',
      data: category
    })
   }
   // 修改品类
   updateCategoryName(category) {
    return _util.request({
      type: 'post',
      url: '/manage/category/set_category_name.do',
      data: category
    })
   }
}

export default Product;

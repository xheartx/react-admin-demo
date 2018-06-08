/*
 * @Author: X.Heart
 * @Date: 2018-06-07 09:35:05
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-07 11:13:19
 * @description: 通用富文本编辑，依赖Jquery
 */
import React, { Component } from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'
import './index.scss'

class RichEditor extends Component{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.loadEditor();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDetail !== nextProps.defaultDetail){
      this.simditor.setValue(nextProps.defaultDetail)
    }
  }
  loadEditor() {
    let element = this.refs['textarea'];
    this.simditor = new Simditor({
      textarea: $(element),
      defaultValue: this.props.placeholder || '请输入内容',
      upload: {
        url: '/manage/product/richtext_img_upload.do',
        defaultImage: '',
        fileKey: 'upload_file'
      }
    });
    this.bindEditorEvent();
  }
  // 初始化富文本事件
  bindEditorEvent() {
    this.simditor.on('valuechanged', e => {
      this.props.onValueChange(this.simditor.getValue());
    })
  }
  render() {
    return (
      <div className="rich-editor">
        <textarea ref="textarea"></textarea>
      </div>
    )
  }
}

export default RichEditor
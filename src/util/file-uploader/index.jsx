/*
 * @Author: X.Heart
 * @Date: 2018-06-05 15:56:38
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-06 11:24:32
 * @description: 
 */
import React, { Component }from 'react';
import FileUpload from './react-fileupload.jsx';

class FileUploader extends Component{
	constructor(props) {
    super(props)
  }
	render(){
		const options = {
			baseUrl:'/manage/product/upload.do',
			fileFieldName: 'upload_file',
			dataType: 'json',
			chooseAndUpload: true,
			uploadSuccess: (res) => { this.props.onSuccess(res.data) },
			uploadError: (err) => { this.props.onError(err.message || '上传图片失败') }
		}
		return (
			<FileUpload options={options}>
				<button className="btn btn-xs btn-default" ref="chooseAndUpload">请选择图片</button>
			</FileUpload>
		)	        
	}
}

export default FileUploader
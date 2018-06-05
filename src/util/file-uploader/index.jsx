/*
 * @Author: X.Heart
 * @Date: 2018-06-05 15:56:38
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-05 16:00:45
 * @description: 
 */
import React, { Component }from 'react';
import FileUpload from 'react-fileupload';

class FileUploader extends Component{
	render(){
		/*set properties*/
		const options={
			baseUrl:'/manage/product/upload.do',
			fileFieldName: 'upload_file',
			dataType: 'json',
			uploadSucess: (res) => {
				console.log(res);
			},
			uploadError: (err) => {
				console.log(err);
			}
		}
		/*Use FileUpload with options*/
		/*Set two dom with ref*/
		return (
			<FileUpload options={options}>
				<button ref="chooseBtn">choose</button>
				<button ref="uploadBtn">upload</button>
			</FileUpload>
		)	        
	}
}
export default FileUploader
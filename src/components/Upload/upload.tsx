import React from 'react'
import axios, { AxiosProgressEvent } from 'axios';
import Button from '../Button/Button';
import { useRef } from 'react';
export interface UploadProps {
    action: string;
    onProgress?: (percent: number, file:File) => void;
    onSuccess?: (data: any, file:File) => void;
    onError?: (err: any, file:File) => void;
}
export const Upload: React.FC<UploadProps> = (props) => {
  const {action, onProgress, onSuccess, onError} = props
//   使用useRef绑定到input元素，获取它的文件
  const fileInputRef = useRef<HTMLInputElement>(null)
//   点击按钮的时候触发上传
  const handleFile = () => {
    if(fileInputRef.current){
        // 如果有文件，模拟点击input元素
      fileInputRef.current.click()
    }
  }
//   
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 这里拿到的files是一个类数组，包含了所有选中的文件
    // 如果写files[0]，只能上传第一个文件
    const files = e.target.files
    if(!files){
        return
    }
    uploadFiles(files)
    if(fileInputRef.current){
        // 上传完成后，清空input元素的文件
      fileInputRef.current.value = ''
    }
}
const uploadFiles = (files: FileList) => {
    // 遍历文件列表，上传每个文件
    let postFiles = Array.from(files) //因为files是类数组，要转成数组才能用map或forEach
    postFiles.forEach(file => {
        const formData = new FormData()
        formData.append('file', file)
        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            // axios自带的一个上传进度回调函数
            onUploadProgress: (e: AxiosProgressEvent) => {
                // 明确检查e.total是否存在且大于0
                let percent = 0;
                if (e.total && e.total > 0) {
                    percent = Math.round((e.loaded * 100) / e.total);
                }
                onProgress?.(percent, file)
            }
        }).then(res => {
            console.log(res)
            if(onSuccess){
                onSuccess(res.data, file)
            }
        }).catch(err => {
            if(onError){
                onError(err, file)
            }
        })
    })
}
  return (
    <div className='viking-upload-component'>
      <Button btnType='primary' onClick={handleFile}>上传文件</Button>
      <input 
        type="file"
        style={{display: 'none'}}
        // 监听文件选择变化
        onChange={handleFileChange}
        multiple
        ref={fileInputRef}
       />
    </div>
  )
}
export default Upload

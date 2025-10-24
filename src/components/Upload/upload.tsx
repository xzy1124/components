import React from 'react'
import axios, { AxiosProgressEvent } from 'axios';
import Button from '../Button/Button';
import { useRef } from 'react';
export interface UploadProps {
    action: string;
    onProgress?: (percent: number, file:File) => void;
    onSuccess?: (data: any, file:File) => void;
    onError?: (err: any, file:File) => void;
    // 上传前的钩子函数，返回false可以阻止上传
    // 如果返回的是异步Promise，会等待Promise resolve后再上传，这个异步promise的类型是File
    beforeUpload?:(file:File) => boolean | Promise<File>;
    onChange?: (file: File) => void;
}
export const Upload: React.FC<UploadProps> = (props) => {
  const {action, onProgress, onSuccess, onError, beforeUpload, onChange} = props
//   使用useRef绑定到input元素，获取它的文件
  const fileInputRef = useRef<HTMLInputElement>(null)
//   点击按钮的时候触发上传
  const handleFile = () => {
    if(fileInputRef.current){
        // 如果有文件，模拟点击input元素
      fileInputRef.current.click()
    }
  }
//   处理文件选择变化事件,是当用户点击上传选择好文件点击确定后才触发的change
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
        // 这里上传之前外面还是用beforeUpload函数验证一下,如果没有beforeUpload函数，直接上传
        if (!beforeUpload) {
            post(file)
        }
        else {
            const res = beforeUpload(file)
            // 如果返回的是Promise
            if(res && res instanceof Promise){
            // 那返回的结果就有then方法来使用
                res.then(processedFile => {
                    post(processedFile)
                })
            }
            // 如果返回的是布尔值
            else if(res){
                // 返回的是true那就上传
                post(file)
            }
        }
    })
}
// 上传文件封装出去
const post = (file: File) => {
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
        if (onSuccess) {
            onSuccess(res.data, file)
        }
        // 上传完成后，调用onChange函数，将文件对象传递给父组件
        onChange?.(file)
    }).catch(err => {
        if (onError) {
            onError(err, file)
        }
        // 上传失败后，调用onChange函数，将文件对象传递给父组件
        // 它不同于input内置的onChange事件，它是上传完成后调用，而input的onChange是上传过程中调用
        // 它是用来通知父组件上传失败，让父组件可以做一些处理，比如显示错误提示，父组件就是使用这个Input组件的组件
        onChange?.(file)
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

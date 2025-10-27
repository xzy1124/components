import React from 'react'
import axios, { AxiosProgressEvent } from 'axios';
import Button from '../Button/Button';
import { useRef, useState } from 'react';
import UploadList from './uploadList';
import Dragger from './dragger';
// 定义文件列表数据
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: 'ready' | 'uploading' | 'success' | 'error';
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    action: string;
    onProgress?: (percent: number, file:File) => void;
    onSuccess?: (data: any, file:File) => void;
    onError?: (err: any, file:File) => void;
    // 上传前的钩子函数，返回false可以阻止上传
    // 如果返回的是异步Promise，会等待Promise resolve后再上传，这个异步promise的类型是File
    beforeUpload?:(file:File) => boolean | Promise<File>;
    onChange?: (file: File) => void;
    defaultFileList?: UploadFile[];
    onRemove?: (file: UploadFile) => void;
        // 数据丰富化处理http
    header?: {[key: string]: any};
    name?: string;
    data?: {[key: string]: any};
    withCredentials?: boolean;
        // 数据丰富化处理，添加多文件和类型筛选
    accept?: string;
    multiple?: boolean;
    children?: React.ReactNode;
        // 添加拖拽属性
     drag?: boolean;
}
export const Upload: React.FC<UploadProps> = (props) => {
    const { 
        action, 
        onProgress, 
        onSuccess, 
        onError, 
        beforeUpload, 
        onChange, 
        defaultFileList, 
        onRemove,
        header,
        name = 'file',
        data,
        withCredentials,
        accept,
        multiple,
        drag,
        children
    } = props
//   使用useRef绑定到input元素，获取它的文件
  const fileInputRef = useRef<HTMLInputElement>(null)
    // 使用状态管理文件列表,一开始是空数组,后面上传的文件是个UploadFile类型的对象
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    // 添加一个辅助方法用来以后更新，参数一个是要更新的目标文件，一个是要更新的文件的属性
    // Partial<UploadFile>是TypeScript的泛型，表示可以只包含UploadFile接口中部分属性的对象，这样可以灵活地只更新需要改变的属性
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList((preFileList) => {
            return preFileList.map(file => {
                // 根据这个之前的文件的id唯一，我们可以找到要更新的文件，因为之前的文件假如我上传了多个文件，每个文件都有一个唯一的id，
                // 后面我们怎么知道更新的文件是哪一个呢，就是根据这个文件的id唯一
                if (file.uid === updateFile.uid) {
                    // 这是对象展开运算符的用法，后面的属性会覆盖前面同名的属性
                    return { ...file, ...updateObj }
                }
                else {
                    return file
                }
            })
        })
    }   
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
    // 这里实现点击取消上传，参数是一个file,类型是我们包装好的一个上传文件的类型UploadFile
const handleRemove = (file: UploadFile) => {
        // 拿到当前最新的文件列表做处理，做什么处理呢，就是过滤掉要删除的文件，怎么确定过滤的是哪一个文件呢，就是根据文件的uid唯一
        setFileList((preFileList) => {
            return preFileList.filter(f => f.uid !== file.uid)
        })
        // 这里的意思就是如果有onRemove函数，就调用它，把要删除的文件传进去
        // 相当于if(onRemove){onRemove(file)}
        onRemove?.(file)
    }
// 上传文件封装出去
const post = (file: File) => {
    // 上传前,创建一个文件对象,放到我们的状态管理里面,后续好检测上传状态
    let _file: UploadFile = {
        uid: Date.now() + 'upload-file',
        size: file.size,
        name: file.name,
        status: 'ready',
        percent: 0,
        raw: file,
    }
    // setFileList([_file, ...fileList])
    // 这里我们之前只是把新的文件存到状态管理里面，但是上传是异步的，拿不到最新的文件
    setFileList((preFileList) => {
        return [_file, ...preFileList]
    })
    const formData = new FormData()
    formData.append(name ||'file', file)
        // 在这里新增data数据的上传
        if(data){
            Object.keys(data).forEach(key => {
            formData.append(key, data[key])
            })
        }
    axios.post(action, formData, {
        headers: {
            // 把我们自定义的header合并到axios的header里面
            ...header,
            'Content-Type': 'multipart/form-data'
        },
        // axios本身就支持的一个配置项，用来处理跨域请求时是否携带cookie
        withCredentials: withCredentials,
        // axios自带的一个上传进度回调函数
        onUploadProgress: (e: AxiosProgressEvent) => {
            // 明确检查e.total是否存在且大于0
            let percent = 0;
            if (e.total && e.total > 0) {
                percent = Math.round((e.loaded * 100) / e.total);
            }
            // 我们想拿到最新的fileList对象的状态,但是这是个异步更新的过程,如果我们直接打印,会是个空数组
            // console.log(fileList)
            updateFileList(_file, { percent: percent, status: 'uploading' })
            // setFileList((pre) => {
            //     console.log(pre);
            //     return pre
                
            // })
            onProgress?.(percent, file)
        }
    }).then(res => {
        console.log(res)
        updateFileList(_file, {status: 'success', response: res.data})
        if (onSuccess) {
            onSuccess(res.data, file)
        }
        // 上传完成后，调用onChange函数，将文件对象传递给父组件
        onChange?.(file)
    }).catch(err => {
        updateFileList(_file, {status: 'error', error: err})
        if (onError) {
            onError(err, file)
        }
        // 上传失败后，调用onChange函数，将文件对象传递给父组件
        // 它不同于input内置的onChange事件，它是上传完成后调用，而input的onChange是上传过程中调用
        // 它是用来通知父组件上传失败，让父组件可以做一些处理，比如显示错误提示，父组件就是使用这个Input组件的组件
        onChange?.(file)
    })
}
    console.log(fileList)
  return (
    <div className='viking-upload-component'>
      {/* <Button btnType='primary' onClick={handleFile}>上传文件</Button> */}
      {/* 不使用button了我，直接用children来渲染 */}
      <div className='viking-upload-input'
            style={{display: 'inline-block'}}
            onClick={handleFile}
        >
            {/* 只要drag属性是true,我就能渲染我写好的一个dragger组件 */}
            {drag ? 
            // 谁使用我，谁就能用我传出去的一个回调函数onFile, 在drageer里面我把用户拖拽的文件列表
            // 传出来了，相当于这里的files,然后我又把它传到uploadFiles函数中，去执行一个一个的上传
            <Dragger onFile={(files) => {uploadFiles(files)}}>
                {/* children是为了其他组件在使用upload组件的时候可以自定义的元素dom和内容 */}
                {children}
            </Dragger>: 
            children
            }
            <input 
                className='viking-file-input'
                type="file"
                style={{display: 'none'}}
                // 监听文件选择变化
                onChange={handleFileChange}
                multiple
                ref={fileInputRef}
                accept={accept}
            />
      </div>
       {/* 在这里渲染上传列表的状态 */}
        <UploadList defaultFileList={fileList} onRemove={handleRemove}/>
    </div>
  )
}
export default Upload

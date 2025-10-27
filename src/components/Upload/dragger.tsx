import React from 'react'
import classNames from 'classnames'
import { useState,DragEvent } from 'react'                                                                                                                                                                                                                                                                                                                                                                                        
// 定义接口，接口的作用是定义这个组件应该具备的属性
export interface DraggerProps {
    onFile: (file: FileList) => void;
}
export const Dragger: React.FC<React.PropsWithChildren<DraggerProps>> = (props) => {
    const { onFile, children } = props
    // 定义一个状态表示是否在拖拽文件
    const [dragOver, setDragOver] = useState(false)
    const klass = classNames('viking-uploader-dragger', {
        'is-dragover' : dragOver
    })
    // 定义拖拽事件处理函数，取决于传进来的参数 over 是 true 还是 false
    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }
    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        // 通过dataTransfer.files获取到拖拽的文件列表,放进onFile函数中
        onFile(e.dataTransfer.files)
    }
    return (
        <div
            className={klass}    
            onDragOver={e => handleDrag(e, true)}
            onDragLeave={e => handleDrag(e, false)}
            onDrop={handleDrop}
        >
            {/* 谁使用我，谁在我的包裹下传进来的东西 */}
            {children}
        </div>
    )
}
export default Dragger
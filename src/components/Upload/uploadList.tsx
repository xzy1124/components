import React from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'
interface UploadListProps {
    // 具有两个属性，一是一个文件列表，二是一个删除函数
    defaultFileList: UploadFile[],
    onRemove: (file: UploadFile) => void
}
export const UploadList: React.FC<UploadListProps> = (props) => {
    const {defaultFileList, onRemove} = props
    return (
        <ul className='viking-upload-list'>
            {/* 在这里渲染fileList的每个文件 */}
            {defaultFileList.map(item => (
                <li className='viking-upload-list-item' key={item.uid}>
                    {/* 在每一个li中渲染左右两部分，左边是上传的文件名称啊后面是状态图标 */}
                    <span className={`file-name file-name-${item.status}`}>
                        {/* 头部的一个图标 */}
                        <Icon icon="file-alt" theme="secondary" />
                        {item.name}
                    </span>
                    {/* 这是右边的状态图标 */}
                    <span className='file-status'>
                        {item.status === 'uploading' && <Icon icon="spinner" theme="primary" spin />}
                        {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
                        {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
                    </span>
                    <span className='file-actions'>
                        <Icon icon="times" theme="danger" onClick={() => onRemove(item)} />
                    </span>
                </li>
            ))}
        </ul>
    )
}
export default UploadList
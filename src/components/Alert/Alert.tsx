import React from 'react'
import Icon from '../Icon/icon'
// 设计警告组件，用于显示成功、信息、警告、危险等不同类型的提示信息
export type AlertType = 
    | 'success'
    | 'default'
    | 'warning'
    | 'danger'

interface AlertProps {
    title?: string,
    description?: string,  
    // 点击关闭触发的事件
    onClose?: () => void,
    // 是否显示关闭按钮
    closable?: boolean,  // 修改为可选的布尔类型
    type: AlertType,
    children?: React.ReactNode,  // 设置为可选，因为我们有description
}

// 传的时候直接解构type和children，不需要再props中解构
const Alert: React.FC<AlertProps> = ({ title, description, onClose, closable, type, children }) => {
    return (
        <div
            className={`alert alert-${type}`}
            // onClick={onClose}
            title={title}  // title 是合法的 HTML 属性，表示鼠标悬停时显示的提示
        >
            {title && <h4 className="alert-title">{title}</h4>}
            {description && <p className="alert-description">{description}</p>}
            {children}
            {(closable && onClose) && (
                <button
                    className="alert-close"
                    onClick={(e) => {
                        e.stopPropagation();  // 阻止事件冒泡到父级div
                        onClose?.();  // 调用可选的onClose函数
                    }}
                >
                    <Icon theme="primary" icon="times" size="1x" />
                </button>
            )}
        </div>
    )
}

export default Alert
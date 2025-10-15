import React from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { useContext } from 'react'
export interface MenuItemProps {
    index?: number
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}
const MenuItem: React.FC<MenuItemProps> = ({
    index = 0,
    disabled = false,
    className,
    style = {},
    children,
}) => {
    // 从 context 中获取当前选中的索引和选择回调函数
    const context = useContext(MenuContext)
    const menuItemClassName = classNames(
        'menu-item',
        {
            'is-disabled': disabled,
            'is-active': context.itemIndex === index,
        },
        className,
    )
    const handleClick = () => {
        if(context.onSelected && !disabled){
            //点击我，我就把我的索引传递给父组件
            context.onSelected(index)
        }
    }
    return (
        <div className={menuItemClassName} style={style} onClick={handleClick}>
            {children}
        </div>
    )
}
export default MenuItem

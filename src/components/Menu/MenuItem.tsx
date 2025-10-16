import React from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { useContext } from 'react'
export interface MenuItemProps {
    index?: string
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}
const MenuItem: React.FC<MenuItemProps> = ({
    index = '0',
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
        if(context.onSelected && !disabled && (typeof index ==='string')){
            //点击我，我就把我的索引传递给父组件
            context.onSelected(index)
        }
    }
    return (
        <li className={menuItemClassName} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}
// 为MenuItem组件添加displayName静态属性，用于标识其类型
MenuItem.displayName = 'MenuItem'
export default MenuItem

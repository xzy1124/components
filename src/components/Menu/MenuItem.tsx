import React from 'react'
import classNames from 'classnames'
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
    const menuItemClassName = classNames(
        'menu-item',
        {
            'menu-item-disabled': disabled,
        },
        className,
    )
    return (
        <div className={menuItemClassName} style={style}>
            {children}
        </div>
    )
}
export default MenuItem

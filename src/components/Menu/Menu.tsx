import React from 'react'
import classNames from 'classnames'
//编写Menu的接口属性
type MenuType = 'horizontal' | 'vertical'
export interface MenuProps {
    index?: number
    className?: string
    mode?: MenuType
    style?: React.CSSProperties
    onSelect?: (selectedIndex: number) => void
    children?: React.ReactNode
}
//编写Menu组件
const Menu: React.FC<MenuProps> = ({
    index = 0,
    className,
    mode = 'horizontal',
    style = {},
    onSelect,
    children,
}) => {
    const menuClassName = classNames(
        'menu',
        {
            'menu-horizontal': mode === 'horizontal',
            'menu-vertical': mode === 'vertical',
        },
        className,
    )
    return (
        <div className={menuClassName} style={style}>
            {children}
        </div>
    )
}
export default Menu
import React from 'react'
import classNames from 'classnames'
import {useContext, useState} from 'react'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'
export interface SubMenuProps {
    index?: number
    title?: string
    className?: string
    children?: React.ReactNode
}
const SubMenu: React.FC<SubMenuProps> = (props) => {
    const context = useContext(MenuContext)
    const { index, title, className, children } = props
    // 构建classnames
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.itemIndex === index,
    })
    // 定义状态决定要不要显示下拉框
    const [isOpen, setIsOpen] = useState(false)
    // 定义回调函数，点击时触发
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }
    // 因为subMenu下面本质上也是MenuItem，所以也采用孩子遍历
    const renderChild = () => {
        // 定义classname用来携带open-menu
        const klass = classNames('viking-submenu', {
            'open-menu': isOpen
        })
        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem'){
                return React.cloneElement(childElement, {
                    index
                })
            } else {
                console.error("Menu组件的子元素必须是MenuItem组件")
            }
        })
        return (
            <ul className={klass}>
               {/* 这里出来的是一个一个的MenuItem组件 */}
                {childrenComponent}
            </ul>
        )
    }
    return (
        // 使得这个可以下拉的子菜单的classname拥有submenu-item类名
        <li key={index} className={classes}>
            <div className='submenu-title' onClick={handleClick}>
                {title}
            </div>

            {renderChild()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu
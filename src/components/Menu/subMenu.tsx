import React from 'react'
import classNames from 'classnames'
import {useContext, useState} from 'react'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'
export interface SubMenuProps {
    index?: string
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
    // 这里的状态要根据垂直状态下适配一下
    const isDefaultOpend = context.defaultOpenSubMenus as Array<string>
    // 这里判断一下是否默认展开,如果是垂直状态下，默认展开的子菜单索引包含当前子菜单索引，就默认展开
    const open = (index && context.mode === 'vertical') ? isDefaultOpend.includes(index) : false
    const [isOpen, setIsOpen] = useState(open)

    // 定义回调函数，点击时触发
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }
    // 现在我们通过拿到的mode来创建鼠标触发的时候根据水平就触发，垂直就不变
    let timer: any
    const handleMouse = (e:React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setIsOpen(toggle)
        }, 300)
    }
    // 什么时候触发根据mode来判断
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvent = context.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
        onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
    }: {}
    // 因为subMenu下面本质上也是MenuItem，所以也采用孩子遍历
    const renderChild = () => {
        // 定义classname用来携带open-menu
        const klass = classNames('viking-submenu', {
            'open-menu': isOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem'){
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
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
        <li key={index} className={classes} {...hoverEvent}>
            <div className='submenu-title' {...clickEvents}>
                {title}
            </div>

            {renderChild()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu
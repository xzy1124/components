import React, {useState, createContext} from 'react'
import classNames from 'classnames'
//编写Menu的接口属性
type MenuType = 'horizontal' | 'vertical'
// 因为回调函数写了两次，这里用type
type SelectCallback = (selectedIndex: string) => void
export interface MenuProps {
    index?: string
    className?: string
    mode?: MenuType
    style?: React.CSSProperties
    onSelect?: SelectCallback
    children?: React.ReactNode
    // 传递垂直状态下默认展开的属性
    // 为什么这里是字符串数组，因为子菜单的索引是字符串,你要知道展开的是哪一项子菜单吧，这个是要靠App组件传递的
    defaultOpenSubMenus?: string[]
}
// 要传递给子组件的上下文接口
interface MenuContextProps {
    itemIndex: string,
    onSelected?: SelectCallback,
    // 菜单的类型，水平还是垂直
    mode?:MenuType
    // 垂直状态下默认展开的子菜单索引
    defaultOpenSubMenus?: string[]
}
// 使用createContext把MenuContextProps传递给子组件
export const MenuContext = createContext<MenuContextProps>({itemIndex: '0'})
//编写Menu组件
const Menu: React.FC<MenuProps> = ({
    index = '0',
    className,
    mode = 'vertical',
    style = {},
    onSelect,
    children,
    defaultOpenSubMenus = [],
}) => {
    // 内部状态，记录当前选中的索引
    const [selectedIndex, setSelectedIndex] = useState(index)
    const menuClassName = classNames(
        'viking-menu',
        {
            'menu-horizontal': mode === 'horizontal',
            'menu-vertical': mode === 'vertical',
        },
        className,
    )
    const handleClick = (index: string) => {
        // 拿到了子组件点击的索引，放到内部状态中
        setSelectedIndex(index)
        // 如果父组件有传递选择回调函数，就调用它，
        // 把当前选中的索引传递给它，给它用，就是当成参数，具体怎么用，它说了算
        if(onSelect){
            onSelect(index)
        }
    }
    const passedContext: MenuContextProps = {
        itemIndex: selectedIndex ? selectedIndex : '0',
        onSelected: handleClick,
        mode,
        defaultOpenSubMenus,
    }
    // 定义一个render函数遍历子组件
    const renderChild = () => {
        return React.Children.map(children, (child, index) => {
        // 这样我们可以拿到child上面的displayName,但是直接拿child.displayName,child类型不确定
        const childElement = child as React.FunctionComponentElement<MenuProps>
        const { displayName} = childElement.type
        if(displayName === 'MenuItem' || displayName === 'SubMenu'){
            return React.cloneElement(childElement, {
                index: index.toString(),
            })
        }else {
            console.error("Menu组件的子元素必须是MenuItem组件")
        }
    })
}
    return (
        <ul className={menuClassName} style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChild()}
            </MenuContext.Provider>
        </ul>
    )
}
export default Menu
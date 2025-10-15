import React, {useState, createContext} from 'react'
import classNames from 'classnames'
//编写Menu的接口属性
type MenuType = 'horizontal' | 'vertical'
// 因为回调函数写了两次，这里用type
type SelectCallback = (selectedIndex: number) => void
export interface MenuProps {
    index: number
    className?: string
    mode?: MenuType
    style?: React.CSSProperties
    onSelect?: SelectCallback
    children?: React.ReactNode
}
// 要传递给子组件的上下文接口
interface MenuContextProps {
    itemIndex: number,
    onSelected?: SelectCallback
}
// 使用createContext把MenuContextProps传递给子组件
export const MenuContext = createContext<MenuContextProps>({itemIndex: 0})
//编写Menu组件
const Menu: React.FC<MenuProps> = ({
    index = 0,
    className,
    mode = 'horizontal',
    style = {},
    onSelect,
    children,
}) => {
    // 内部状态，记录当前选中的索引
    const [selectedIndex, setSelectedIndex] = useState(index)
    const menuClassName = classNames(
        'menu',
        {
            'menu-horizontal': mode === 'horizontal',
            'menu-vertical': mode === 'vertical',
        },
        className,
    )
    const handleClick = (index:number) => {
        // 拿到了子组件点击的索引，放到内部状态中
        setSelectedIndex(index)
        // 如果父组件有传递选择回调函数，就调用它，
        // 把当前选中的索引传递给它，给它用，就是当成参数，具体怎么用，它说了算
        if(onSelect){
            onSelect(index)
        }
    }
    const passedContext: MenuContextProps = {
        itemIndex: selectedIndex ? selectedIndex : 0,
        onSelected: handleClick,
    }
    return (
        <div className={menuClassName} style={style}>
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
        </div>
    )
}
export default Menu
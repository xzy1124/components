import React from 'react'
import Input, { InputProps } from '../Input/input'
import { useState } from 'react'
// 做改进了,现在我们的筛选数据只能是字符串数组,那我还想是对象呢
interface DataSourceObject {
    value: string
}
export type DataSourceType<T ={}> = T & DataSourceObject
// 需求分析我们要做两件事,第一检测输入框的值,把值存下来去筛选函数中筛选
// 第二件事,根据筛选函数的返回值,渲染结果,这个返回值也要存下来
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (suggest: string) => DataSourceType[]
    onSelect?: (item: DataSourceType) => void
    // 实现自定义模板渲染
    renderItem?: (item: DataSourceType) => React.ReactElement
}
export const AutoComplete: React.FC<AutoCompleteProps> = ((props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderItem,
        ...restProps
    } = props
    // 第一,拿到处理输入框的值
    const [inputvalue, setValue] = useState(value)
    // 第二,拿到处理筛选之后的ui渲染
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setValue(value)
        if (value) {
            const result = fetchSuggestions(value)
            setSuggestions(result)
        }else {
            // 也就是没有输入
            setSuggestions([])
        }
    }
    console.log(suggestions)
    const handleSelect = (item: DataSourceType) => {
        setValue(item.value)
        setSuggestions([])
        if(onSelect) {
            onSelect(item)
        }
    }
        // 自定义渲染项
    const renderItemElement = (item: DataSourceType) => {
        return renderItem ? renderItem(item) : item.value
    }
    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => (
                    <li key={index} onClick={() => handleSelect(item)}>
                        {renderItemElement(item)}
                    </li>
                ))}
            </ul>
        )
    }


    return (
        <div>
            <Input
                value={inputvalue}
                onChange={onHandleChange}
                // 处理选择项的点击事件
                {...restProps}
            />
            {suggestions.length > 0 && generateDropdown()}
        </div>
    )
})
export default AutoComplete
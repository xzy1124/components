import React from 'react'
import Input, { InputProps } from '../Input/input'
import { useState } from 'react'
// 需求分析我们要做两件事,第一检测输入框的值,把值存下来去筛选函数中筛选
// 第二件事,根据筛选函数的返回值,渲染结果,这个返回值也要存下来
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (suggest: string) => string[]
    onSelect?:(item:string) => void
}
export const AutoComplete: React.FC<AutoCompleteProps> = ((props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        ...restProps
    } = props
    // 第一,拿到处理输入框的值
    const [inputvalue, setValue] = useState(value)
    // 第二,拿到处理筛选之后的ui渲染
    const [suggestions, setSuggestions] = useState<string[]>([])
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
    const handleSelect = (item: string) => {
        setValue(item)
        setSuggestions([])
        if(onSelect) {
            onSelect(item)
        }
    }
    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => (
                    <li key={index} onClick={() => handleSelect(item)}>
                        {item}
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
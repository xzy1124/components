import React, { useEffect } from 'react'
import Input, { InputProps } from '../Input/input'
import { useState } from 'react'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
// 做改进了,现在我们的筛选数据只能是字符串数组,那我还想是对象呢
interface DataSourceObject {
    value: string
}
export type DataSourceType<T ={}> = T & DataSourceObject
// 需求分析我们要做两件事,第一检测输入框的值,把值存下来去筛选函数中筛选
// 第二件事,根据筛选函数的返回值,渲染结果,这个返回值也要存下来
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    // 让fetchSuggestions可以返回异步
    fetchSuggestions: (suggest: string) => DataSourceType[] | Promise<DataSourceType[]>
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
    const [inputvalue, setValue] = useState(value as string)
    // 第二,拿到处理筛选之后的ui渲染
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    // 等待异步请求的状态
    const [loading, setLoading] = useState(false)
    // 把inputvalue用防抖函数处理一下
    const deBounceValue = useDebounce(inputvalue, 500)
    // 异步操作属于副作用，所以我们把他们放进useEffect
    useEffect(() => {
        if (deBounceValue) {
            const result = fetchSuggestions(deBounceValue)
            // 先判断一下是不是异步如果是异步,就等待异步完成,再设置suggestions,
            // 因为只要是异步操作,那就有then方法,所以我们可以用then方法来处理异步操作
            if (result instanceof Promise) {
                // 异步请求开始
                setLoading(true)
                result.then(data => {
                    setSuggestions(data)
                    // 异步请求结束
                    setLoading(false)
                })
            } else {
                setSuggestions(result)
            }
        } else {
            // 也就是没有输入
            setSuggestions([])
        }
    }, [deBounceValue])
    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setValue(value)
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
            {/* 处理loading状态 */}
            {loading && <ul><Icon icon='spinner' spin /></ul>}
            {suggestions.length > 0 && generateDropdown()}
        </div>
    )
})
export default AutoComplete
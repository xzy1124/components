// 原来没有这个防抖，是inputValue一变化就会触发请求的
// 现在我们引入这个自定义函数，在变化之后创建一个定时器，等倒计时结束之后再发起请求
// 并且返回一个清除定时器的函数，这样倒计时之后如果用户继续输入，就会清除定时器，重新开始倒计时
import {useState, useEffect} from 'react'
// 函数接收一个value参数，就是用户输入的值，还有一个delay参数，就是倒计时的时间
function useDebounce(value: any, delay = 300) {
    // 然后我定义一个状态
    const [debounceValue, setDebounceValue] = useState(value)
    // 然后我定义一个副作用,当value变化的时候,我就创建一个定时器,等倒计时结束之后,我再设置debounceValue
    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => {
            // 当用户继续输入的时候,我就清除定时器,重新开始倒计时
            // 用户继续输入导致value变化，这会触发useEffect函数，它会先执行return的内容，清除定时器
            // 然后再重新创建一个定时器
            clearTimeout(timer)
        }
    }, [value, delay])
    return debounceValue
}
export default useDebounce
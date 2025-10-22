import { RefObject, useEffect } from "react";
// 接收两个参数，一个是ref，一个是回调函数
function useClickOutside(ref: RefObject<HTMLElement>, callback: Function){
    useEffect(() => {
        // 监听点击事件
        const handleClick = (event: MouseEvent) => {
            // 如果点击的是ref元素内部，或者ref元素不存在，就不执行回调函数
            // 这里的event.target是点击的元素，但是contains返回的是一个节点，所以要进行断言
            if(!ref.current || ref.current.contains(event.target as Node)) {
                return
            }
            callback(event)
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [ref, callback])
}
export default useClickOutside
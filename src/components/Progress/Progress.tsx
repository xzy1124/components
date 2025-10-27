import React from 'react'
import {theme} from '../Icon/icon'
// 这是上传进度的组件，定义接口用来展示
interface ProgressProps {
    // 百分比肯定要有的
    percent: number,
    // 这里可以定义一些样式属性，比如高度和颜色
    height?: number,
    showText?: boolean,
    styles?: React.CSSProperties,
    theme?: theme
}
export const Progress: React.FC<ProgressProps> = (props) => {
    const {
        percent,
        height = 15,
        showText = true,
        styles,
        theme = "primary",

    } = props
    return (
        <div className='viking-progress-bar' style={styles}>
            {/* 最外面那个最长长的灰色进度条 */}
            <div className='viking-progress-bar-outer' style={{height: `${height}px`}}>
                {/* 里面的有颜色的实际进度条 */}
                <div className={`viking-progress-bar-inner color-${theme}`} style={{width: `${percent}%`}}>
                    {/* 判断是否显示进度文字 */}
                    {showText && <span className='innertext'>{`${percent}%`}</span>}
                </div>
            </div>

        </div>
    )
}
export default Progress
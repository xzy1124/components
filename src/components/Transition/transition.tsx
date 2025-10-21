import React from 'react'
import { CSSTransition } from 'react-transition-group'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'

// 把 CSSTransition 的 children 类型剔除，自己用 ReactNode 定义，避免类型不兼容
// 在这里，它从 CSSTransition 组件类型中提取出了其props类型定义
type BaseCSSTransitionProps = Omit<React.ComponentProps<typeof CSSTransition>, 'children'>

export type TransitionProps = BaseCSSTransitionProps & {
    // 允许任意ReactNode（字符串，数组，ReactElement等
    children?: React.ReactNode
    animation?: AnimationName
    wrapper?: boolean
    // 可显式接收 classNames（覆盖默认 animation）
    // classNames?: React.ComponentProps<typeof CSSTransition>['classNames']
}

export const Transition: React.FC<TransitionProps> = (props) => {
    const {
        children,
        classNames,
        animation,
        unmountOnExit = true,
        appear = true,
        wrapper = false,
        // 给 timeout 提供默认值，避免 TS/运行时报缺少 timeout 的问题
        timeout = 400,
        ...rest
    } = props

    // classNames 要传给 CSSTransition，优先使用传入的 classNames，否则使用 animation 字符串
    const csstClassNames = (classNames ?? animation) as React.ComponentProps<typeof CSSTransition>['classNames']

    // CSSTransition 要求 child 是单个 ReactElement；当 children 不是 ReactElement 或者 wrapper 为 true 时，用一个 div 包裹
    const isElement = React.isValidElement(children)
    const childToRender = (wrapper || !isElement) ? <div>{children}</div> : (children as React.ReactElement)

    return (
        <CSSTransition
            {...rest}
            timeout={timeout}
            classNames={csstClassNames}
            unmountOnExit={unmountOnExit}
            appear={appear}
        >
            {childToRender}
        </CSSTransition>
    )
}

export default Transition
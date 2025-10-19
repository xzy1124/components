import React from 'react'
import { CSSTransition } from 'react-transition-group'
type AnimationName = 'zoom-in-top' | 'zoom-in-topleft' | 'zoom-in-right' | 'zoom-in-bottom'
type TransitionProps = React.ComponentProps<typeof CSSTransition> & {
    animation?: AnimationName
}
export const Transition: React.FC<TransitionProps> = (props) => {
    const { 
        children,
        classNames,
        animation,
        unmountOnExit = true,
        appear = true,
        ...rest 
    } = props
    return (
        <CSSTransition
            {...rest}
            classNames={classNames ? classNames : animation}
            unmountOnExit={unmountOnExit}

            appear={appear}
        >
            {children}
        </CSSTransition>
    )
}
export default Transition
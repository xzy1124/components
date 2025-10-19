import classNames from 'classnames';
import React from 'react';
// 设计按钮组件
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
// export enum ButtonType {
//     Primary = 'primary',
//     Secondary = 'secondary',
//     Success = 'success',
//     Danger = 'danger',
//     Warning = 'warning',
//     Info = 'info',
//     Light = 'light',
//     Dark = 'dark',
//     Link = 'link',
//     Default = 'default'
// }
// 定义接口
interface BaseButtonProps {
    btnType?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    className?: string;
    href?: string;
    children: React.ReactNode;
}
// 现有的props属性都是固有属性，缺乏button和a的原生属性如onClick，
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
type NativeLinkProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
export type ButtonProps = Partial<NativeButtonProps & NativeLinkProps>
const Button: React.FC<ButtonProps> = (props) => {
    const {
        btnType = 'default',
        size,
        href,
        disabled = false,
        children,
        className,
        ...restProps
    } = props
    const classes = classNames('btn',className, {
        [`btn-${btnType}`] : btnType,
        [`btn-${size}`] : size,
        'disabled': (btnType === 'link') && disabled,
})
if(btnType === 'link' && href){
    return (
        <a  {...restProps} className={classes} href={href}>
            {children}
           
        </a>
    )
}else {
    return (
        <button  {...restProps} className={classes} disabled={disabled}>
            {children}
        </button>
    )
}
}
export default Button
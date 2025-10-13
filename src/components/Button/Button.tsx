import classNames from 'classnames';
import React from 'react';
// 设计按钮组件
export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}
export enum ButtonType {
    Primary = 'primary',
    Secondary = 'secondary',
    Success = 'success',
    Danger = 'danger',
    Warning = 'warning',
    Info = 'info',
    Light = 'light',
    Dark = 'dark',
    Link = 'link',
    Default = 'default'
}
// 定义接口
interface ButtonProps {
    btnType?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    className?: string;
    href?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
        btnType = ButtonType.Default,
        size,
        href,
        disabled = false,
        children
    } = props
    const classes = classNames('btn',{
        [`btn-${btnType}`] : btnType,
        [`btn-${size}`] : size,
        'disabled': (btnType === ButtonType.Link) && disabled,
})
if(btnType === ButtonType.Link && href){
    return (
        <a className={classes} href={href}>
            {children}
        </a>
    )
}else {
    return (
        <button className={classes} disabled={disabled}>
            {children}
        </button>
    )
}
}
export default Button
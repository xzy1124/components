// 表单的世界，表单由输入框以及下面的面板组成
import React, { ReactElement } from 'react'
import Icon, { IconProps } from '../Icon/icon'
import classNames from 'classnames';
// 分析表单的属性
type InputSize = 'lg' | 'sm'
// 为了支持原始表单的属性,要继承一下祖先爸爸,Omit的作用是排除掉size属性
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'size'> {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProps['icon']
    prepend?: string | ReactElement
    append?: string | ReactElement
}
// 取出所有属性，实现表单组件
export const Input: React.FC<InputProps> = (props) => {
    const { disabled, size, icon, prepend, append, ...rest } = props
    const klass = classNames('viking-input-wrapper',
        {
            [`input-size-${size}`]: size,
            'is-disabled': disabled,
            'input-group': prepend || append,
            'input-group-append': !!append,
            'input-group-prepend': !!prepend,
        }
    )
    return (
        <div className={klass}>
                {prepend && <div className='viking-input-group-prepend'>{prepend}</div>}
                {icon && <div className='icon-wrapper'><Icon icon={icon} title={`title-${icon}`} /></div>}
                <input 
                className='viking-input-inner'
                disabled={disabled}
                {...rest} />
                {append && <div className='viking-input-group-append'>{append}</div>}
        </div>
       
    )
}
export default Input
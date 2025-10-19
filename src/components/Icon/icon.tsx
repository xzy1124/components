import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
 export type theme = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
 export interface IconProps extends FontAwesomeIconProps {
    theme?: theme
    className?: string
 }
 const Icon: React.FC<IconProps> = (props) => {
    const {theme, className, ...rest} = props
    const classes = classNames(
        'viking-icon',
        className,
        {
            [`icon-${theme}`]: theme
        }
    )
  return (
    <FontAwesomeIcon
      {...rest}
      className={classes}
    />
  )
}
export default Icon
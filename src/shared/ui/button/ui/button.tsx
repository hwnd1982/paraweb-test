import cn from 'classnames';
import React from 'react';
import styles from './styles.module.scss';

export const Button = ({type = 'button', className = '', children, onClick}: {onClick?: (e: any) => void, children: string, type?: 'submit' | 'button', className?: string}) => {
  return (
    <button className={cn(className, styles.button)} type={type} onClick={onClick}>{children}</button>
  )
}
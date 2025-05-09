import { memo, ReactNode, forwardRef } from 'react'
import { NavLink, LinkProps } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'

export type AppLinkVariant = 'primary' | 'red'

/* eslint-disable react/no-unused-prop-types */
interface AppLinkProps extends LinkProps{
  className?: string
  variant?: AppLinkVariant
  children?: ReactNode
  activeClassName?: string
}

export const AppLink = memo(forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
  const {
    to,
    className,
    variant = 'primary',
    children,
    activeClassName = '',
    ...otherProps
  } = props

  return (
    <NavLink
      ref={ref}
      to={to}
      className={({ isActive }) => classNames(
        cls.AppLink,
        { [activeClassName]: isActive },
        [className, cls[variant]]
      )}
      {...otherProps}
    >
      {children}
    </NavLink>
  )
}))

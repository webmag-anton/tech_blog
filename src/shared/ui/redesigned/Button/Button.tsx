import {
  ButtonHTMLAttributes,
  memo,
  ReactNode
} from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline' | 'filled'
export type ButtonColor = 'normal' | 'success' | 'error'

export type ButtonSize = 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string
  variant?: ButtonVariant
  square?: boolean
  size?: ButtonSize
  color?: ButtonColor
  disabled?: boolean
  children?: ReactNode
  fullWidth?: boolean
  addonLeft?: ReactNode
  addonRight?: ReactNode
}

export const Button = memo<ButtonProps>((props: ButtonProps) => {
  const {
    className,
    variant = 'outline',
    square,
    size = 'm',
    disabled,
    children,
    fullWidth,
    addonLeft,
    addonRight,
    color = 'normal',
    ...otherProps
  } = props

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
    [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight)
  }

  return (
    <button
      className={classNames(cls.Button, mods, [
        className,
        cls[variant],
        cls[size],
        cls[color]
      ])}
      disabled={disabled}
      {...otherProps}
    >
      <div className={cls.addonLeft}>{addonLeft}</div>
      {children}
      <div className={cls.addonRight}>{addonRight}</div>
    </button>
  )
})

import {
  memo,
  useState,
  useEffect,
  useRef,
  InputHTMLAttributes,
  ChangeEvent,
  ReactNode
} from 'react'
import { HStack } from '../Stack'
import { Text } from '../Text'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps =
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readonly' | 'size'>

type InputSize = 's' | 'm' | 'l'

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  autofocus?: boolean
  readonly?: boolean
  addonLeft?: ReactNode
  addonRight?: ReactNode
  label?: string
  size?: InputSize
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    addonLeft,
    addonRight,
    label,
    size = 'm',
    ...otherProps
  } = props

  const [isFocused, setIsFocused] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true)
      ref.current?.focus()
    }
  }, [autofocus])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  const onFocus = () => setIsFocused(true)
  const onBlur = () => setIsFocused(false)

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.focused]: isFocused,
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight)
  }

  const input = (
    <div className={classNames(cls.InputWrapper, mods, [className, cls[size]])}>
      <div className={cls.addonLeft}>{addonLeft}</div>
      <input
        ref={ref}
        className={cls.input}
        type={type}
        value={value}
        onChange={onChangeHandler}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readonly}
        {...otherProps}
      />
      <div className={cls.addonRight}>{addonRight}</div>
    </div>
  )

  if (label) {
    return (
      <HStack max gap='8'>
        <Text text={label} />
        {input}
      </HStack>
    )
  }

  return input
})
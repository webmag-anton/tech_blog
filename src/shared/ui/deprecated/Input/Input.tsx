import {
  memo,
  useState,
  useEffect,
  useRef,
  InputHTMLAttributes,
  ChangeEvent
} from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readonly'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  autofocus?: boolean
  readonly?: boolean
}

/**
 * @deprecated
 */
export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    ...otherProps
  } = props

  const [isFocused, setIsFocused] = useState(false)
  const [caretPosition, setCaretPosition] = useState(0)

  const ref = useRef<HTMLInputElement>(null)

  const isCaretVisible = isFocused && !readonly

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true)
      ref.current?.focus()
    }
  }, [autofocus])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
    setCaretPosition(e.target.value.length)
  }

  const onFocus = () => setIsFocused(true)
  const onBlur = () => setIsFocused(false)

  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0)
  }

  const mods: Mods = {
    [cls.readonly]: readonly
  }

  return (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>
          {`${placeholder}>`}
        </div>
      )}
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          className={cls.input}
          type={type}
          value={value}
          onChange={onChangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          readOnly={readonly}
          {...otherProps}
        />
        {isCaretVisible && (
          <span
            className={cls.caret}
            style={{ left: `${caretPosition * 9}px` }}
          />
        )}
      </div>
    </div>
  )
})
import { Fragment, ReactNode, useMemo } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownDirection } from '@/shared/types/ui'
import { HStack } from '../../../../redesigned/Stack'
import { Button } from '../../../Button/Button'
import cls from './ListBox.module.scss'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { Icon } from '../../../../redesigned/Icon'

export interface ListBoxItem<T extends string> {
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[]
  className?: string
  value?: T
  defaultValue?: string
  onChange: (value: T) => void
  readonly?: boolean
  direction?: DropdownDirection
  label?: string
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom right',
    label
  } = props

  const optionsClasses = [mapDirectionClass[direction], popupCls.menu]

  const selectedItem = useMemo(
    () => items?.find((item) => item.value === value),
    [items, value]
  )

  return (
    <HStack gap='4'>
      {label && <span>{`${label}>`}</span>}

      <HListBox
        value={value}
        onChange={onChange}
        as='div'
        disabled={readonly}
        className={classNames('', {}, [className, popupCls.popup])}
      >
        <HListBox.Button as='div' className={cls.trigger}>
          <Button disabled={readonly} variant='filled' addonRight={<Icon Svg={ArrowIcon} />}>
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HListBox.Button>

        <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cls.item,
                    {
                      [popupCls.active]: active,
                      [popupCls.disabled]: item.disabled,
                      [popupCls.selected]: selected
                    }
                  )}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  )
}

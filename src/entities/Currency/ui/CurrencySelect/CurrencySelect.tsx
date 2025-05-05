import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Currency } from '../../model/types/currency'
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups'
import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popups'

interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD }
]

export const CurrencySelect = (props: CurrencySelectProps) => {
  const {
    className,
    value,
    onChange,
    readonly
  } = props

  const { t } = useTranslation()

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])

  const listBoxprops = {
    value,
    defaultValue: t('Укажите валюту'),
    label: t('Укажите валюту'),
    items: options,
    onChange: onChangeHandler,
    readonly,
    direction: 'top right' as const,
    className
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<ListBox {...listBoxprops} />}
      off={<ListBoxDeprecated {...listBoxprops} />}
    />
  )
}
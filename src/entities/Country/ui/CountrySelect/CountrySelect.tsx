import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Country } from '../../model/types/country'
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups'
import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popups'

interface CountrySelectProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

const options = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Belarus, content: Country.Belarus }
]

export const CountrySelect = (props: CountrySelectProps) => {
  const {
    className,
    value,
    onChange,
    readonly
  } = props

  const { t } = useTranslation()

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])

  const listBoxProps = {
    onChange: onChangeHandler,
    value,
    defaultValue: t('Укажите страну'),
    label: t('Укажите страну'),
    items: options,
    readonly,
    direction: 'top right' as const,
    className
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<ListBox {...listBoxProps} />}
      off={<ListBoxDeprecated {...listBoxProps} />}
    />

  )
}
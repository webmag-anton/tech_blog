import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Select, SelectOption } from '@/shared/ui/deprecated/Select'
import { SortOrder } from '@/shared/types/sort'
import { ArticleSortField } from '@/entities/Article'
import cls from './ArticleSortSelector.module.scss'
import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popups'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeSort: (newSort: ArticleSortField) => void
  onChangeOrder: (newOrder: SortOrder) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {
    className,
    sort,
    order,
    onChangeSort,
    onChangeOrder
  } = props

  const { t } = useTranslation()

  const orderFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('дате создания')
    },
    {
      value: ArticleSortField.TITLE,
      content: t('названию')
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('просмотрам')
    }
  ], [t])

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('возрастанию')
    },
    {
      value: 'desc',
      content: t('убыванию')
    }
  ], [t])

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <div className={classNames(cls.ArticleSortSelectorRedesigned, {}, [className])}>
          <VStack gap='8'>
            <Text text={t('Сортировать ПО')} />
            <ListBox
              value={sort}
              items={orderFieldOptions}
              onChange={onChangeSort}
            />
            <ListBox
              value={order}
              items={orderOptions}
              onChange={onChangeOrder}
            />
          </VStack>
        </div>
      )}
      off={(
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
          <Select
            value={sort}
            options={orderFieldOptions}
            label={t('Сортировать ПО')}
            onChange={onChangeSort}
          />
          <Select
            value={order}
            options={orderOptions}
            label={t('по')}
            onChange={onChangeOrder}
            className={cls.order}
          />
        </div>
      )}
    />
  )
})
import { memo } from 'react'
import { ArticlesFilters } from '@/widgets/ArticlesFilters'
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters'

interface FiltersContainerProps {
  className?: string
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const {
    className
  } = props

  const {
    sort,
    order,
    search,
    type,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType
  } = useArticlesFilters()

  return (
    <ArticlesFilters
      className={className}
      sort={sort}
      order={order}
      search={search}
      type={type}
      onChangeSort={onChangeSort}
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
      onChangeType={onChangeType}
    />
  )
})
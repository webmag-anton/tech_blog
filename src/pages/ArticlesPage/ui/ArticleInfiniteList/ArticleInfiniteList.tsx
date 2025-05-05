import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getArticles } from '../../model/slices/articlesPageSlice'
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import { ArticleList } from '@/entities/Article'
import { Text } from '@/shared/ui/deprecated/Text'

interface ArticleInfiniteListProps {
  className?: string
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const {
    className
  } = props

  const { t } = useTranslation()

  // адаптер автоматически генерирует селекторы
  const articles = useSelector(getArticles.selectAll)
  // а эти селекторы нужно уже делать самому
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const error = useSelector(getArticlesPageError)

  if (error) {
    return <Text text={t('Ошибка при загрузке статей')} />
  }

  return (
    <ArticleList
      className={className}
      articles={articles}
      view={view}
      isLoading={isLoading}
    />
  )
})
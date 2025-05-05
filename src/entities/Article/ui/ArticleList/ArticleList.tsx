import { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextSize } from '@/shared/ui/deprecated/Text'
import cls from './ArticleList.module.scss'
import { Article } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { ArticleView } from '../../model/consts/consts'
import { ToggleFeatures } from '@/shared/lib/features'
import { HStack } from '@/shared/ui/redesigned/Stack'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((item, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
  ))

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
    target
  } = props

  const { t } = useTranslation()

  if (!isLoading && !articles?.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    )
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <HStack
          gap='16'
          wrap='wrap'
          className={classNames(cls.ArticleListRedesigned, {}, [])}
          data-testid='ArticleList'
        >
          {articles.map((article: Article) => (
            <ArticleListItem
              key={article.id}
              className={cls.card}
              article={article}
              view={view}
              target={target}
            />
          ))}
          {isLoading && getSkeletons(view)}
        </HStack>
      )}
      off={(
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
          data-testid='ArticleList'
        >
          {articles.map((article: Article) => (
            <ArticleListItem
              key={article.id}
              className={cls.card}
              article={article}
              view={view}
              target={target}
            />
          ))}
          {isLoading && getSkeletons(view)}
        </div>
      )}
    />
  )
})
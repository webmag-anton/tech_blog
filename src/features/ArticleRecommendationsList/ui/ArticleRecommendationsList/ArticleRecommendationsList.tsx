import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { ArticleList } from '@/entities/Article'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { useGetArticleRecommendationsListQuery } from '../../api/articleRecommendationsApi'
import { ToggleFeatures } from '@/shared/lib/features'

interface ArticleReccomendationsListProps {
  className?: string
}

export const ArticleRecommendationsList = memo((props: ArticleReccomendationsListProps) => {
  const { className } = props
  const { t } = useTranslation()

  const {
    data: articles,
    isLoading,
    error
  } = useGetArticleRecommendationsListQuery(3)

  if (isLoading || error || !articles) {
    return null
  }

  return (
    <VStack
      gap='8'
      className={classNames('', {}, [className])}
      data-testid='ArticleRecommendationsList'
    >
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <Text
            size='l'
            title={t('Рекомендуем')}
          />
        )}
        off={(
          <TextDeprecated
            size={TextSize.L}
            title={t('Рекомендуем')}
          />
        )}
      />
      <ArticleList
        articles={articles}
        target='_blank'
      />
    </VStack>
  )
})
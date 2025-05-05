import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleListItemRedesigned.module.scss'
import { ArticleListItemProps } from '../ArticleListItem'
import { Text } from '@/shared/ui/redesigned/Text'
import { Icon } from '@/shared/ui/redesigned/Icon'
import EyeIcon from '@/shared/assets/icons/eye.svg'
import { ArticleView, ArticleBlockType } from '../../../model/consts/consts'
import { ArticleTextBlock } from '../../../model/types/article'
import { Card } from '@/shared/ui/redesigned/Card'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { getRouteArticleDetails } from '@/shared/const/router'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
    target
  } = props

  const { t } = useTranslation('article')

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
      <Text bold text={article.user.username} />
    </>
  )
  // const types = <Text text={article.type.join(', ')} className={cls.types} />
  const views = (
    <HStack gap='8'>
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  )

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock

    return (
      <Card
        max
        padding='24'
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        data-testid='ArticleListItem'
      >
        <VStack max gap='16'>
          <HStack max gap='8'>
            <Avatar size={32} src={article.user.avatar} />
            <Text bold text={article.user.username} />
            <Text text={article.createdAt} />
          </HStack>
          <Text text={article.title} bold />
          <Text text={article.subtitle} size='s' />
          <AppImage
            src={article.img}
            className={cls.img}
            alt={article.title}
            fallback={<Skeleton width='100%' height={250} />}
          />
          {textBlock?.paragraphs && (
            <Text
              text={textBlock.paragraphs.slice(0, 2).join('')}
              className={cls.textBlock}
            />
          )}
          <HStack max justify='between'>
            <AppLink
              to={getRouteArticleDetails(article.id)}
              target={target}
            >
              <Button variant='outline'>
                {t('Читать далее')}
              </Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    )
  }

  return (
    <AppLink
      data-testid='ArticleListItem'
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [
        className,
        cls[view]
      ])}
    >
      <Card className={cls.card} border='partial' padding='0'>
        <AppImage
          fallback={<Skeleton width='100%' height={200} />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
        <VStack className={cls.info} gap='4'>
          <Text title={article.title} className={cls.title} />
          <VStack gap='4' className={cls.footer} max>
            <HStack justify='between' max>
              <Text
                text={article.createdAt}
                className={cls.date}
              />
              {views}
            </HStack>
            <HStack gap='4'>{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  )
})

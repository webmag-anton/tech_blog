import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { ArticleImageBlock } from '../../model/types/article'
import { ToggleFeatures } from '@/shared/lib/features'
import cls from './ArticleImageBlockComponent.module.scss'

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const {
    className,
    block
  } = props

  return (
    <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
      <img src={block.src} alt={block.title} className={cls.img} />
      {block.title && (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<Text text={block.title} align='center' />}
          off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
        />
      )}
    </div>
  )
})
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/redesigned/Stack'
import cls from './TechnologyItem.module.scss'
import { JSONTextMapper } from '@/shared/lib/components/JSONTextMapper/JSONTextMapper'
import { ITechnologyItem } from '../../types/technology'

interface TechnologyItemProps {
  className?: string
  item: ITechnologyItem
}

export const TechnologyItem = memo((props: TechnologyItemProps) => {
  const {
    className,
    item
  } = props

  const { title, description } = item

  return (
    <HStack
      className={classNames(cls.TechnologyItem, {}, [className])}
      align='start'
    >
      <h3 className={cls.title}>{title}</h3>
      <p className={cls.description}>
        <JSONTextMapper text={description} />
      </p>
    </HStack>
  )
})
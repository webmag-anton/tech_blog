import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import technologies from '../../const/const'
import { TechnologyItem } from '../TechnologyItem/TechnologyItem'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'
import cls from './TechnologyList.module.scss'

interface TechnologyProps {
  className?: string
}

export const TechnologyList = memo((props: TechnologyProps) => {
  const { className } = props
  const { t: tMain } = useTranslation('main')
  const { t } = useTranslation('technologies')

  return (
    <>
      <Text
        className={cls.title}
        title={tMain('Technical Overview')}
        align='center'
      />
      <VStack
        className={classNames(cls.TechnologyList, {}, [className])}
      >
        {technologies.map(({ id, key }) => {
          const item = {
            title: t(`technologies.${key}`),
            description: t(`descriptions.${key}`)
          }
          return <TechnologyItem item={item} key={id} />
        })}
      </VStack>
    </>
  )
})
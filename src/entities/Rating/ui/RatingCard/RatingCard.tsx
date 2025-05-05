import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserView, MobileView } from 'react-device-detect'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './RatingCard.module.scss'
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card'
import { Card } from '@/shared/ui/redesigned/Card'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { StarRating } from '@/shared/ui/deprecated/StarRating'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Input } from '@/shared/ui/redesigned/Input'
import { Button as ButtonDeprecated, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'
import { Drawer } from '@/shared/ui/redesigned/Drawer'
import { ToggleFeatures } from '@/shared/lib/features'

interface RatingCardProps {
  className?: string
  title?: string
  hasFeedback?: boolean
  feedbackTitle?: string
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
  rate?: number
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    title,
    hasFeedback,
    feedbackTitle,
    onCancel,
    onAccept,
    rate = 0
  } = props

  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(rate)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)

    if (hasFeedback) {
      setIsModalOpen(true)
    } else {
      onAccept?.(selectedStarsCount)
    }
  }, [hasFeedback, onAccept])

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false)
    onAccept?.(starsCount, feedback)
  }, [feedback, starsCount, onAccept])

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false)
    onCancel?.(starsCount)
  }, [starsCount, onCancel])

  const modalContent = (

    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <>
          <Text title={feedbackTitle} />
          <Input
            placeholder={t('Ваш отзыв')}
            value={feedback}
            onChange={setFeedback}
            data-testid='RatingCard.Input'
          />
        </>
      )}
      off={(
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            placeholder={t('Ваш отзыв')}
            value={feedback}
            onChange={setFeedback}
            data-testid='RatingCard.Input'
          />
        </>
      )}
    />
  )

  const content = (
    <>
      <VStack align='center' gap='8' max>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<Text title={starsCount ? t('Спасибо за оценку!') : title} />}
          off={<TextDeprecated title={starsCount ? t('Спасибо за оценку!') : title} />}
        />

        <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
      </VStack>

      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack gap='32' max>
            {modalContent}
            <ToggleFeatures
              feature='isAppRedesigned'
              on={(
                <HStack gap='16' max justify='end'>
                  <Button
                    onClick={cancelHandle}
                    data-testid='RatingCard.Close'
                  >
                    {t('Закрыть')}
                  </Button>
                  <Button
                    onClick={acceptHandle}
                    data-testid='RatingCard.Send'
                  >
                    {t('Отправить')}
                  </Button>
                </HStack>
              )}
              off={(
                <HStack gap='16' max justify='end'>
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE_RED}
                    onClick={cancelHandle}
                    data-testid='RatingCard.Close'
                  >
                    {t('Закрыть')}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    onClick={acceptHandle}
                    data-testid='RatingCard.Send'
                  >
                    {t('Отправить')}
                  </ButtonDeprecated>
                </HStack>
              )}
            />
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer
          isOpen={isModalOpen}
          lazy
          onClose={cancelHandle}
        >
          <VStack gap='32'>
            {modalContent}
            <ToggleFeatures
              feature='isAppRedesigned'
              on={(
                <Button fullWidth onClick={acceptHandle} size='l'>
                  {t('Отправить')}
                </Button>
              )}
              off={(
                <ButtonDeprecated fullWidth onClick={acceptHandle} size={ButtonSize.L}>
                  {t('Отправить')}
                </ButtonDeprecated>
              )}
            />
          </VStack>

        </Drawer>
      </MobileView>
    </>
  )

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <Card
          padding='24'
          max
          border='partial'
        >
          {content}
        </Card>
      )}
      off={(
        <CardDeprecated
          max
          className={classNames(cls.RatingCard, {}, [className])}
          data-testid='RatingCard'
        >
          {content}
        </CardDeprecated>
      )}
    />

  )
})
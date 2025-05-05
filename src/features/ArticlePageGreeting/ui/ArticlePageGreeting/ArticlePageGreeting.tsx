import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { BrowserView, MobileView } from 'react-device-detect'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Text } from '@/shared/ui/deprecated/Text'
import { getJsonSettingsArticlesPage, saveJsonSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Drawer } from '@/shared/ui/redesigned/Drawer'

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const wasArticlesPageOpened = useSelector(getJsonSettingsArticlesPage)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!wasArticlesPageOpened) {
      setIsOpen(true)
      dispatch(saveJsonSettings({ wasArticlesPageOpened: true }))
    }
  }, [wasArticlesPageOpened, dispatch])

  const onClose = () => setIsOpen(false)

  const text = (
    <Text
      title={t('Добро пожаловать на страницу статей')}
      text={t('Здесь вы можете искать и просматривать статьи на различные темы')}
    />
  )

  return (
    <>
      <BrowserView>
        <Modal lazy isOpen={isOpen} onClose={onClose}>
          {text}
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer lazy isOpen={isOpen} onClose={onClose}>
          {text}
        </Drawer>
      </MobileView>
    </>
  )
})
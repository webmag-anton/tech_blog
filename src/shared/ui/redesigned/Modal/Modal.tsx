import { ReactNode } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { Portal } from '../Portal/Portal'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import cls from './Modal.module.scss'
import { Overlay } from '../Overlay/Overlay'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { toggleFeatures } from '@/shared/lib/features'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void // cb, вызываемый при закрытии модалки
  lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    lazy
  } = props

  const {
    close, // ф-я закрытия, после которого отрабатывает onClose
    isClosing,
    isMounted
  } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen
  })

  const { theme } = useTheme()

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        className={classNames(cls.Modal, mods, [
          className,
          theme,
          'app_modal',
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.modalNew,
            off: () => cls.modalOld
          })
        ])}
      >
        <Overlay onClick={close} />

        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

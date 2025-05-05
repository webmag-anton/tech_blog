import { CSSProperties, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'
import { AppImage } from '../../redesigned/AppImage'
import UserIcon from '../../../assets/icons/user-filled.svg'
import { Icon } from '../Icon'
import { Skeleton } from '../Skeleton'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
}

export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    size = 100,
    alt
  } = props

  const style = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
    objectFit: 'cover'
  }), [size])

  const fallback = <Skeleton width={size} height={size} border='50%' />
  const errorFallback = (
    <Icon
      width={size}
      height={size}
      Svg={UserIcon}
    />
  )

  return (
    <AppImage
      className={classNames(cls.Avatar, {}, [className])}
      src={src}
      style={style}
      alt={alt}
      fallback={fallback}
      errorFallback={errorFallback}
    />
  )
}
import { memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StarRating.module.scss'
import { Icon as IconDeprecated } from '../Icon/Icon'
import StarIcon from '@/shared/assets/icons/star.svg'
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features'
import { Icon } from '../../redesigned/Icon'

interface StarRatingProps {
  className?: string
  onSelect?: (starsCount: number) => void
  size?: number
  selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

/**
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
  const {
    className,
    onSelect,
    size = 30,
    selectedStars = 0
  } = props

  const [currentStarsHoverCount, setCurrentStarsHoverCount] = useState(selectedStars)
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsHoverCount(starsCount)
    }
  }
  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsHoverCount(0)
    }
  }

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount)
      setIsSelected(true)
    }
  }

  return (
    <div
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          off: () => cls.StarRating,
          on: () => cls.StarRatingRedesigned
        }),
        {},
        [className]
      )}
    >
      {stars.map((starNumber) => {
        const commonProps = {
          key: starNumber,
          className: classNames(
            cls.starIcon,
            { [cls.selected]: isSelected },
            [starNumber <= currentStarsHoverCount ? cls.hovered : cls.normal]
          ),
          Svg: StarIcon,
          width: size,
          height: size,
          onMouseEnter: onHover(starNumber),
          onMouseLeave: onLeave,
          onClick: onClick(starNumber),
          'data-testid': `StarRating.${starNumber}`,
          'data-selected': starNumber <= currentStarsHoverCount
        }

        return (
          <ToggleFeatures
            key={starNumber}
            feature='isAppRedesigned'
            on={(
              <Icon
                clickable={!isSelected}
                {...commonProps}
              />
            )}
            off={(
              <IconDeprecated
                {...commonProps}
              />
            )}
          />
        )
      })}
    </div>
  )
})
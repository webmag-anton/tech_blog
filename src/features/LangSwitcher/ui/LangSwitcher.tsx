import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'
import { ToggleFeatures } from '@/shared/lib/features'
import { Icon } from '@/shared/ui/redesigned/Icon'
import LanguageIcon from '@/shared/assets/icons/language.svg'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ua' ? 'en' : 'ua')
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <Button
          variant='clear'
          onClick={toggle}
          addonLeft={short ? undefined : <Icon width={24} Svg={LanguageIcon} />}
        >
          {t(short ? 'Короткий язык' : 'Язык')}
        </Button>
      )}
      off={(
        <ButtonDeprecated
          className={classNames('', {}, [className])}
          theme={ButtonTheme.CLEAR}
          onClick={toggle}
        >
          {t(short ? 'Короткий язык' : 'Язык')}
        </ButtonDeprecated>
      )}
    />
  )
})

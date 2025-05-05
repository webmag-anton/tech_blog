import { useMemo, useState, memo } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LangSwitcher } from '@/features/LangSwitcher'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import cls from './Sidebar.module.scss'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { ToggleFeatures } from '@/shared/lib/features'
import { AppLogo } from '@/shared/ui/redesigned/AppLogo'
import { Icon } from '@/shared/ui/redesigned/Icon'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const sidebarItemsList = useSelector(getSidebarItems)

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  const itemsList = useMemo(() => (
    sidebarItemsList.map((item) => (
      <SidebarItem
        key={item.path}
        item={item}
        collapsed={collapsed}
      />
    ))
  ), [sidebarItemsList, collapsed])

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <aside
          data-testid='sidebar'
          className={classNames(
            cls.SidebarRedesigned,
            { [cls.collapsedRedesigned]: collapsed },
            [className]
          )}
        >
          <AppLogo
            size={collapsed ? 30 : 50}
            className={cls.appLogo}
          />

          <VStack role='navigation' gap='8' className={cls.items}>
            {itemsList}
          </VStack>

          <Icon
            data-testid='sidebar-toggle'
            onClick={onToggle}
            Svg={ArrowIcon}
            className={cls.collapseBtn}
            clickable
          />

          <div className={cls.switchers}>
            <LangSwitcher className={cls.lang} short={collapsed} />
            <ThemeSwitcher />
          </div>
        </aside>
      )}
      off={(
        <aside
          data-testid='sidebar'
          className={classNames(
            cls.Sidebar,
            { [cls.collapsed]: collapsed },
            [className]
          )}
        >
          <Button
            data-testid='sidebar-toggle'
            onClick={onToggle}
            className={cls.collapseBtn}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            square
            size={ButtonSize.L}
          >
            {collapsed ? '>' : '<'}
          </Button>

          <VStack role='navigation' gap='8' className={cls.items}>
            {itemsList}
          </VStack>

          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={cls.lang} short={collapsed} />
          </div>
        </aside>
      )}
    />
  )
})

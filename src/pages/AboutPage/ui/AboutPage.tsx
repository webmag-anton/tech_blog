import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { JSONTextMapper } from '@/shared/lib/components/JSONTextMapper/JSONTextMapper'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AboutPage.module.scss'

const AboutPage = () => {
  const { t } = useTranslation('about')

  const aboutUs: string[] = t('about_us', { returnObjects: true })

  return (
    <Page
      className={classNames(cls.AboutPage, {}, [])}
      data-testid='AboutPage'
    >
      {aboutUs?.map((item, index) => (
        <p key={index}>
          <JSONTextMapper text={item} />
        </p>
      ))}
    </Page>
  )
}

export default AboutPage

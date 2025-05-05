import { useTranslation } from 'react-i18next'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { Text as TextDeprecated, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Input } from '@/shared/ui/redesigned/Input'
import { Loader } from '@/shared/ui/deprecated/Loader'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Profile } from '../../model/types/profile'
import { CurrencySelect, Currency } from '@/entities/Currency'
import { CountrySelect, Country } from '@/entities/Country'
import cls from './ProfileCard.module.scss'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { ToggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/redesigned/Card'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

interface ProfileCardProps {
  className?: string
  data?: Profile
  error?: string
  isLoading?: boolean
  readonly?: boolean
  onChangeFirstname?: (value?: string) => void
  onChangeLastname?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
  onChangeCurrency?: (currency: Currency) => void
  onChangeCountry?: (country: Country) => void
}

export const ProfileCardSkeleton = () => (
  <Card max padding='24'>
    <VStack gap='32'>
      <HStack max justify='center'>
        <Skeleton border='100%' width={128} height={128} />
      </HStack>
      <HStack max gap='32'>
        <VStack gap='16' max>
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
        </VStack>
        <VStack gap='16' max>
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
        </VStack>
      </HStack>
    </VStack>
  </Card>
)

export const ProfileCardDeprecatedLoader = () => (
  <HStack
    justify='center'
    max
    className={classNames(cls.ProfileCard, {}, [cls.loading])}
  >
    <Loader />
  </HStack>
)

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    error,
    isLoading,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
    readonly
  } = props

  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ProfileCardSkeleton />}
        off={<ProfileCardDeprecatedLoader />}
      />
    )
  }

  if (error) {
    return (
      <HStack
        justify='center'
        max
        className={classNames(cls.ProfileCard, {}, [className, cls.error])}
      >
        <TextDeprecated
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </HStack>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <Card
          padding='16'
          border='partial'
          max
          className={classNames(cls.ProfileCardRedesigned, {}, [className])}
        >
          <VStack gap='32'>
            {data?.avatar && (
              <HStack justify='center' max>
                <Avatar src={data?.avatar} size={128} />
              </HStack>
            )}

            <HStack gap='24' max>
              <VStack gap='16' max>
                <Input
                  value={data?.first}
                  label={t('Ваше имя')}
                  onChange={onChangeFirstname}
                  readonly={readonly}
                  data-testid='ProfileCard.firstname'
                />
                <Input
                  value={data?.lastname}
                  label={t('Ваша фамилия')}
                  onChange={onChangeLastname}
                  readonly={readonly}
                  data-testid='ProfileCard.lastname'
                />
                <Input
                  value={data?.age}
                  label={t('Ваш возраст')}
                  onChange={onChangeAge}
                  readonly={readonly}
                />
                <Input
                  value={data?.city}
                  label={t('Город')}
                  onChange={onChangeCity}
                  readonly={readonly}
                />
              </VStack>
              <VStack gap='16' max>
                <Input
                  value={data?.username}
                  label={t('Введите имя пользователя')}
                  onChange={onChangeUsername}
                  readonly={readonly}
                />
                <Input
                  value={data?.avatar}
                  label={t('Введите ссылку на аватар')}
                  onChange={onChangeAvatar}
                  readonly={readonly}
                />

                <CurrencySelect
                  value={data?.currency}
                  onChange={onChangeCurrency}
                  readonly={readonly}
                />

                <CountrySelect
                  value={data?.country}
                  onChange={onChangeCountry}
                  readonly={readonly}
                />
              </VStack>
            </HStack>
          </VStack>
        </Card>
      )}
      off={(
        <VStack gap='8' max className={classNames(cls.ProfileCard, mods, [className])}>
          {data?.avatar && (
            <HStack justify='center' max className={cls.avatarWrapper}>
              <AvatarDeprecated src={data?.avatar} />
            </HStack>
          )}

          <InputDeprecated
            value={data?.first}
            placeholder={t('Ваше имя')}
            className={cls.input}
            onChange={onChangeFirstname}
            readonly={readonly}
            data-testid='ProfileCard.firstname'
          />
          <InputDeprecated
            value={data?.lastname}
            placeholder={t('Ваша фамилия')}
            className={cls.input}
            onChange={onChangeLastname}
            readonly={readonly}
            data-testid='ProfileCard.lastname'
          />
          <InputDeprecated
            value={data?.age}
            placeholder={t('Ваш возраст')}
            className={cls.input}
            onChange={onChangeAge}
            readonly={readonly}
          />
          <InputDeprecated
            value={data?.city}
            placeholder={t('Город')}
            className={cls.input}
            onChange={onChangeCity}
            readonly={readonly}
          />
          <InputDeprecated
            value={data?.username}
            placeholder={t('Введите имя пользователя')}
            className={cls.input}
            onChange={onChangeUsername}
            readonly={readonly}
          />
          <InputDeprecated
            value={data?.avatar}
            placeholder={t('Введите ссылку на аватар')}
            className={cls.input}
            onChange={onChangeAvatar}
            readonly={readonly}
          />

          <CurrencySelect
            className={cls.input}
            value={data?.currency}
            onChange={onChangeCurrency}
            readonly={readonly}
          />

          <CountrySelect
            className={cls.input}
            value={data?.country}
            onChange={onChangeCountry}
            readonly={readonly}
          />
        </VStack>
      )}
    />
  )
}
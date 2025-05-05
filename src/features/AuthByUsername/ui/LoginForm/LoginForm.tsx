import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Input } from '@/shared/ui/redesigned/Input'
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import cls from './LoginForm.module.scss'
import { ToggleFeatures } from '@/shared/lib/features'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { useForceUpdate } from '@/shared/lib/render/forceUpdate'

export interface LoginFormProps {
  className?: string
}

const LoginForm = memo((props: LoginFormProps) => {
  const {
    className
  } = props

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginIsLoading)
  const error = useSelector(getLoginError)

  const forceUpdate = useForceUpdate()

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(async () => {
    await dispatch(loginByUsername({ username, password }))
    forceUpdate()
  }, [dispatch, username, password, forceUpdate])

  return (
    <DynamicModuleLoader
      reducers={{ loginForm: loginReducer }}
      removeAfterUnmount
    >
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <VStack gap='16' className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />
            {error && <Text text={t('Вы ввели неверный логин или пароль')} variant='error' />}

            <Input
              type='text'
              className={cls.input}
              placeholder={t('Введите username')}
              autofocus
              onChange={onChangeUsername}
              value={username}
            />
            <Input
              type='text'
              className={cls.input}
              placeholder={t('Введите пароль')}
              onChange={onChangePassword}
              value={password}
            />
            <Button
              className={cls.loginBtn}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t('Войти')}
            </Button>
          </VStack>
        )}
        off={(
          <div className={classNames(cls.LoginForm, {}, [className])}>
            <TextDeprecated title={t('Форма авторизации')} />
            {error
              && (
                <TextDeprecated
                  text={t('Вы ввели неверный логин или пароль')}
                  theme={TextTheme.ERROR}
                />
              )}

            <InputDeprecated
              type='text'
              className={cls.input}
              placeholder={t('Введите username')}
              autofocus
              onChange={onChangeUsername}
              value={username}
            />
            <InputDeprecated
              type='text'
              className={cls.input}
              placeholder={t('Введите пароль')}
              onChange={onChangePassword}
              value={password}
            />
            <ButtonDeprecated
              className={cls.loginBtn}
              theme={ButtonTheme.OUTLINE}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t('Войти')}
            </ButtonDeprecated>
          </div>
        )}
      />
    </DynamicModuleLoader>
  )
})

export default LoginForm
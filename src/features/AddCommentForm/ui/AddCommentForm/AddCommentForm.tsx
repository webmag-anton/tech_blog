import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Input } from '@/shared/ui/redesigned/Input'
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors'
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice'
import cls from './AddCommentForm.module.scss'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { ToggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/redesigned/Card'

export interface AddCommentFormProps {
  className?: string,
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const {
    className,
    onSendComment
  } = props

  const { t } = useTranslation()
  const text = useSelector(getAddCommentFormText)
  const dispatch = useAppDispatch()

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value))
  }, [dispatch])

  const onSendHandler = useCallback(() => {
    onSendComment(text || '')
    // очищаем инпут
    onCommentTextChange('')
  }, [onCommentTextChange, onSendComment, text])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <Card padding='24' border='partial' max>
            <HStack
              justify='between'
              max
              gap='16'
              className={classNames(cls.AddCommentFormRedesigned, {}, [className])}
              data-testid='AddCommentForm'
            >
              <Input
                className={cls.input}
                placeholder={t('Введите текст комментария')}
                value={text}
                onChange={onCommentTextChange}
                data-testid='AddCommentForm.Input'
              />

              <Button
                onClick={onSendHandler}
                data-testid='AddCommentForm.Button'
              >
                {t('Отправить')}
              </Button>
            </HStack>
          </Card>
        )}
        off={(
          <HStack
            justify='between'
            max
            className={classNames(cls.AddCommentForm, {}, [className])}
            data-testid='AddCommentForm'
          >
            <InputDeprecated
              className={cls.input}
              placeholder={t('Введите текст комментария')}
              value={text}
              onChange={onCommentTextChange}
              data-testid='AddCommentForm.Input'
            />

            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE}
              onClick={onSendHandler}
              data-testid='AddCommentForm.Button'
            >
              {t('Отправить')}
            </ButtonDeprecated>
          </HStack>
        )}
      />
    </DynamicModuleLoader>
  )
})

export default AddCommentForm
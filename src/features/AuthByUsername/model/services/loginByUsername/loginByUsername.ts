import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User, userActions } from '@/entities/User'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>(
  'login/loginByUsername',
  async (authData, { rejectWithValue, dispatch, extra }) => {
    try {
      // @ts-ignore
      const response = await extra.api.post<User>('/login', authData)

      if (!response.data) {
        throw new Error('ошибка - сервер ничего не вернул')
      }

      dispatch(userActions.setAuthData(response.data))

      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue('error')
    }
  }
)
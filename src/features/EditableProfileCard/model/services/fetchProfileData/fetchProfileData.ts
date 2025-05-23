import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile } from '@/entities/Profile'

export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
>(
  'profile/fetchProfileData',
  async (profileId, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get<Profile>(`/profile/${profileId}`)

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue('error')
    }
  }
)
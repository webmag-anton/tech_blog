import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScrollPositionSaveSchema } from '../types/scrollPositionSave'

const initialState: ScrollPositionSaveSchema = {
  scroll: {}
}

export const scrollPositionSaveSlice = createSlice({
  name: 'scrollPositionSave',
  initialState,
  reducers: {
    setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
      state.scroll[payload.path] = payload.position
    }
  }
})

export const { actions: scrollPositionSaveActions } = scrollPositionSaveSlice
export const { reducer: scrollPositionSaveReducer } = scrollPositionSaveSlice
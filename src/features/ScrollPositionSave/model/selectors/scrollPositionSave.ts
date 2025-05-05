import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'

export const getScrollPosition = (state: StateSchema) => state.scrollPositionSave.scroll

export const getScrollPositionByPath = createSelector(
  getScrollPosition, // 1й селектор
  (state: StateSchema, path: string) => path, // 2й селектор
  (scroll, path) => scroll[path] || 0 // в итоговый селектор аргументами приходят результаты предыдущих селекторов
)
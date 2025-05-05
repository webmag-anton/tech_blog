import {
  AnyAction,
  EnhancedStore,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { CombinedState, Dispatch } from 'redux'
import { CounterSchema } from '@/entities/Counter'
import { UserSchema } from '@/entities/User'
import { LoginSchema } from '@/features/AuthByUsername'
import { ProfileSchema } from '@/features/EditableProfileCard'
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage'
import { AddCommentFormSchema } from '@/features/AddCommentForm'
import { ArticlesPageSchema } from '@/pages/ArticlesPage'
import { ScrollPositionSaveSchema } from '@/features/ScrollPositionSave'
import { ArticleDetailsSchema } from '@/entities/Article'
import { rtkApi } from '@/shared/api/rtkApi'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  scrollPositionSave: ScrollPositionSaveSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
  articleDetailsPage?: ArticleDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  dispatch?: Dispatch
  state: StateSchema
}
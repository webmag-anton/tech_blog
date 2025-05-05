import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { CombinedState, Reducer } from 'redux'
import { $api } from '@/shared/api/api'
import { scrollPositionSaveReducer } from '@/features/ScrollPositionSave'
import { counterReducer } from '@/entities/Counter'
import { userReducer } from '@/entities/User'
import { StateSchema } from './StateSchema'
import { createReducerManager } from './reducerManager'
import { rtkApi } from '@/shared/api/rtkApi'

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    scrollPositionSave: scrollPositionSaveReducer,
    [rtkApi.reducerPath]: rtkApi.reducer
  }

  const reducerManager = createReducerManager(rootReducers)

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api
        }
      }
    }).concat(rtkApi.middleware)
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
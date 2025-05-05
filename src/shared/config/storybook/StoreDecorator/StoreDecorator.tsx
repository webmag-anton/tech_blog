import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { loginReducer } from '@/features/AuthByUsername/testing'
import { addCommentFormReducer } from '@/features/AddCommentForm/testing'
// eslint-disable-next-line imports-checker-fsd/public-api-imports,imports-checker-fsd/layer-imports
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices'
import { profileReducer } from '@/features/EditableProfileCard/testing'
import { articleDetailsReducer } from '@/entities/Article/testing'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer
}

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
)

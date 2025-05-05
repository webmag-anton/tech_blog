import { ComponentStory, ComponentMeta } from '@storybook/react'
import withMock from 'storybook-addon-mock'
import { ArticleRecommendationsList } from './ArticleRecommendationsList'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { Article } from '@/entities/Article'

export default {
  title: 'features/Article/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  decorators: [withMock]
} as ComponentMeta<typeof ArticleRecommendationsList>

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />

const article: Article = {
  id: '1',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  createdAt: '',
  views: 123,
  user: { id: '1', username: '123' },
  blocks: [],
  type: [],
  title: '123',
  subtitle: 'asfsa'
}

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=3`,
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' },
        { ...article, id: '3' }
      ]
    }
  ]
}

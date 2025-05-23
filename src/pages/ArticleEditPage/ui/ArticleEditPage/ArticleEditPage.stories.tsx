import { ComponentStory, ComponentMeta } from '@storybook/react'
import ArticleEditPage from './ArticleEditPage'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

export default {
  title: 'pages/ArticleEditPage/ArticleEditPage',
  component: ArticleEditPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  decorators: [StoreDecorator({})]
} as ComponentMeta<typeof ArticleEditPage>

const Template: ComponentStory<typeof ArticleEditPage> = (args) => <ArticleEditPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}

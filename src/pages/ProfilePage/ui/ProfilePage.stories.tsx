import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import avatar from '@/shared/assets/tests/storybook.jpg'
import ProfilePage from './ProfilePage'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { Theme } from '@/shared/const/theme'

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ProfilePage>

const Template: ComponentStory<typeof ProfilePage> = (args: object) => <ProfilePage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
// 1й аргумент - preloadedState
Normal.decorators = [StoreDecorator({
  profile: {
    form: {
      first: 'admin_test',
      lastname: 'Ulbi',
      age: 22,
      country: Country.Ukraine,
      city: 'geer',
      currency: Currency.USD,
      avatar
    }
  }
})]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      first: 'admin',
      lastname: 'Ulbi',
      age: 22,
      country: Country.Ukraine,
      city: 'geer',
      currency: Currency.USD,
      avatar
    }
  }
})]

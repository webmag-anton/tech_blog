import { ComponentMeta, ComponentStory } from '@storybook/react'
import avatar from '@/shared/assets/tests/storybook.jpg'
import { ProfileCard } from './ProfileCard'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

export default {
  title: 'features/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  data: {
    first: 'admin',
    lastname: 'Ulbi',
    age: 22,
    country: Country.Ukraine,
    city: 'geer',
    currency: Currency.USD,
    avatar
  }
}

export const withError = Template.bind({})
withError.args = {
  error: 'true'
}

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true
}
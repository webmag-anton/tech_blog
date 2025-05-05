import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Select } from './Select'

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    options: []
  }
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'укажите значение',
  options: [
    { value: 'Dan', content: 'Dan' },
    { value: 'Tracy', content: 'Tracy' },
    { value: 'Brown', content: 'Brown' }
  ]
}
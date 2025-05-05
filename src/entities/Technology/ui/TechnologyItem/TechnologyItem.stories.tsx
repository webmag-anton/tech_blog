import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TechnologyItem } from './TechnologyItem'

export default {
  title: 'shared/Button',
  component: TechnologyItem,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof TechnologyItem>

const Template: ComponentStory<typeof TechnologyItem> = (args) => <TechnologyItem {...args} />

export const Normal = Template.bind({})
Normal.args = {}
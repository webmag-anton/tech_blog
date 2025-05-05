import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TechnologyList } from './TechnologyList'

export default {
  title: 'entities/TechnologyList',
  component: TechnologyList,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof TechnologyList>

const Template: ComponentStory<typeof TechnologyList> = (args) => <TechnologyList {...args} />

export const Normal = Template.bind({})
Normal.args = {

}
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AvatarDropdown } from './AvatarDropdown'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { UserRole } from '@/entities/User'

export default {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <Story />
      </div>
    )
  ]
} as ComponentMeta<typeof AvatarDropdown>

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />

export const User = Template.bind({})
User.args = {}
User.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        username: 'Anton',
        avatar: 'https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png',
        roles: [UserRole.USER]
      }
    }
  })
]

export const Admin = Template.bind({})
Admin.args = {}
Admin.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '2',
        username: 'admin',
        avatar: 'https://miro.medium.com/v2/resize:fit:640/0*ngAthWxOvKZHvsw9',
        roles: [UserRole.ADMIN]
      }
    }
  })
]

export const Manager = Template.bind({})
Manager.args = {}
Manager.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '3',
        username: 'manager',
        avatar: 'data:image/png;base64,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',
        roles: [UserRole.MANAGER]
      }
    }
  })
]

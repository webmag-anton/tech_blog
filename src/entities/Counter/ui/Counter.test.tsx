import { act, screen } from '@testing-library/react'
import { userEvent } from '@storybook/testing-library'
import { ComponentRender } from '@/shared/lib/tests/ComponentRender/ComponentRender'
import { Counter } from './Counter'

describe('Counter', () => {
  test('test render', () => {
    ComponentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    expect(screen.getByTestId('value-title')).toHaveTextContent('10')
  })

  test('increment', () => {
    ComponentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    act(() => {
      userEvent.click(screen.getByTestId('increment-btn'))
    })
    expect(screen.getByTestId('value-title')).toHaveTextContent('11')
  })

  test('decrement', async () => {
    ComponentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    act(() => {
      userEvent.click(screen.getByTestId('decrement-btn'))
    })
    expect(screen.getByTestId('value-title')).toHaveTextContent('9')
  })
})

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TabBar } from '../../src/'

const defaultOptions = ['Home', 'Account']
const objectOptions = [
  { key: 'Home', value: 'home' },
  { key: 'Account', value: 4 },
]

describe('TabBar', () => {
  test('defaults to horizontal alignment', () => {
    render(<TabBar options={defaultOptions} value="home" />)
    expect(screen.getByRole('tablist')).toHaveAttribute(
      'aria-orientation',
      'horizontal'
    )
  })

  test('aligns vertically with vertical option', () => {
    render(<TabBar options={defaultOptions} vertical={true} value="home" />)
    expect(screen.getByRole('tablist')).toHaveAttribute(
      'aria-orientation',
      'vertical'
    )
  })

  test('renders defaultOptions', () => {
    render(<TabBar options={defaultOptions} value="home" />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Account')).toBeInTheDocument()
  })

  test('renders objectOptions', () => {
    render(<TabBar options={objectOptions} value="home" />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Account')).toBeInTheDocument()
  })

  test('adds Active class', () => {
    render(<TabBar options={objectOptions} value="home" />)
    expect(screen.getByText('Home').parentElement).toHaveClass('active')
  })

  test('calls onChange', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()
    render(<TabBar options={objectOptions} value="home" onChange={onChange} />)
    await user.click(screen.getByText(objectOptions[0].key))
    expect(onChange).toHaveBeenCalledWith(objectOptions[0].value)
  })

  test('passes down custom className to ul', () => {
    render(<TabBar options={objectOptions} value="home" className="custom" />)
    expect(screen.getByRole('tablist')).toHaveClass('tabs', 'custom')
  })

  test('passes down custom activeClassName to li', () => {
    render(
      <TabBar options={objectOptions} value="home" activeClassName="custom" />
    )
    const homeTab = screen.getByText('Home')
    expect(homeTab.parentElement).toHaveClass('custom')
    expect(homeTab.parentElement).not.toHaveClass('active')
  })

  test('assigns appropriate aria roles', () => {
    render(<TabBar options={defaultOptions} value="home" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab').length).toBe(defaultOptions.length)
  })

  test('assigns unique id to tab', () => {
    render(<TabBar options={defaultOptions} value="home" />)
    expect(screen.getByText('Home')).toHaveAttribute(
      'id',
      'tab-' + defaultOptions[0].toLowerCase()
    )
  })

  test('inactive tabs are explicitly removed from the natural tab order', () => {
    render(<TabBar options={defaultOptions} value="home" />)
    expect(screen.getByText('Account')).toHaveAttribute('tabIndex', '-1')
  })

  test('tab to show is triggered via Enter', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()
    render(<TabBar options={objectOptions} value="home" onChange={onChange} />)
    screen.getByText(objectOptions[1].key).focus()
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith(objectOptions[1].value)
  })

  test('tab to show is triggered via Space', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()
    render(<TabBar options={objectOptions} value="home" onChange={onChange} />)
    screen.getByText(objectOptions[1].key).focus()
    await user.keyboard('[Space]')
    expect(onChange).toHaveBeenCalledWith(objectOptions[1].value)
  })

  describe('focus management', () => {
    const focusOptions = ['Home', 'First', 'Second', 'Last']

    test('Home key focuses the first tab', async () => {
      const user = userEvent.setup()

      render(
        <TabBar
          options={focusOptions}
          value={focusOptions.at(2)}
          onChange={jest.fn()}
        />
      )

      await user.click(screen.getByText(focusOptions.at(2)))
      await user.keyboard('{Home}')

      expect(screen.getByText(focusOptions.at(0))).toHaveFocus()
    })
    test('End key focuses the last tab', async () => {
      const user = userEvent.setup()

      render(
        <TabBar
          options={focusOptions}
          value={focusOptions.at(2)}
          onChange={jest.fn()}
        />
      )

      await user.click(screen.getByText(focusOptions.at(2)))
      await user.keyboard('{End}')

      expect(screen.getByText(focusOptions.at(-1))).toHaveFocus()
    })
    test('pressing a random key does not change focus', async () => {
      const user = userEvent.setup()

      render(
        <TabBar
          options={focusOptions}
          value={focusOptions.at(2)}
          onChange={jest.fn()}
        />
      )

      await user.click(screen.getByText(focusOptions.at(2)))
      await user.keyboard('{Meta}')

      expect(screen.getByText(focusOptions.at(2))).toHaveFocus()
    })
    test('pressing directional key when not focused on a tab does not change focus', () => {

      render(
        <TabBar
          options={focusOptions}
          value={focusOptions.at(2)}
          onChange={jest.fn()}
        />
      )

      fireEvent.keyDown(screen.getByText(focusOptions.at(2)).parentElement, { key: 'Home' })

      expect(screen.getByText(focusOptions.at(0))).not.toHaveFocus()
    })
    test('defaults to using code if key is not present', () => {
      render(
        <TabBar
          options={focusOptions}
          value={focusOptions.at(2)}
          onChange={jest.fn()}
        />
      )

      fireEvent.keyDown(screen.getByText(focusOptions.at(2)), { code: 'Home' })

      expect(screen.getByText(focusOptions.at(0))).toHaveFocus()
    })

    describe('horizontal orientation (default)', () => {
      test('Left arrow key focuses the previous tab', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(2)}
            onChange={jest.fn()}
          />
        )

        await user.click(screen.getByText(focusOptions.at(2)))
        await user.keyboard('{ArrowLeft}')

        expect(screen.getByText(focusOptions.at(1))).toHaveFocus()
      })
      test('Right arrow key focuses the next tab', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(2)}
            onChange={jest.fn()}
          />
        )

        await user.click(screen.getByText(focusOptions.at(2)))
        await user.keyboard('{ArrowRight}')

        expect(screen.getByText(focusOptions.at(3))).toHaveFocus()
      })
      test('Down arrow key does not change focus', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(2)}
            onChange={jest.fn()}
          />
        )

        await user.click(screen.getByText(focusOptions.at(2)))
        await user.keyboard('{ArrowDown}')

        expect(screen.getByText(focusOptions.at(2))).toHaveFocus()
      })
      test('Up arrow key does not change focus', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(2)}
            onChange={jest.fn()}
          />
        )

        await user.click(screen.getByText(focusOptions.at(2)))
        await user.keyboard('{ArrowUp}')

        expect(screen.getByText(focusOptions.at(2))).toHaveFocus()
      })
      test('Right arrow key focuses the first tab when focused on the last tab', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(-1)}
            onChange={jest.fn()}
          />
        )

        await user.click(screen.getByText(focusOptions.at(-1)))
        await user.keyboard('{ArrowRight}')

        expect(screen.getByText(focusOptions.at(0))).toHaveFocus()
      })
      test('Left arrow key focuses the last tab when focused on the first tab', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(0)}
            onChange={jest.fn()}
          />
        )

        await user.click(screen.getByText(focusOptions.at(0)))
        await user.keyboard('{ArrowLeft}')

        expect(screen.getByText(focusOptions.at(-1))).toHaveFocus()
      })
    })

    describe('vertical orientation', () => {
      test('Left arrow key does not change focus', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(2)}
            onChange={jest.fn()}
            vertical={true}
          />
        )

        await user.click(screen.getByText(focusOptions.at(2)))
        await user.keyboard('{ArrowLeft}')

        expect(screen.getByText(focusOptions.at(2))).toHaveFocus()
      })
      test('Right arrow key does not change focus', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(2)}
            onChange={jest.fn()}
            vertical={true}
          />
        )

        await user.click(screen.getByText(focusOptions.at(2)))
        await user.keyboard('{ArrowRight}')

        expect(screen.getByText(focusOptions.at(2))).toHaveFocus()
      })
      test('Down arrow key focuses the next tab', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(2)}
            onChange={jest.fn()}
            vertical={true}
          />
        )

        await user.click(screen.getByText(focusOptions.at(2)))
        await user.keyboard('{ArrowDown}')

        expect(screen.getByText(focusOptions.at(3))).toHaveFocus()
      })
      test('Up arrow key focuses the previous tab', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(2)}
            onChange={jest.fn()}
            vertical={true}
          />
        )

        await user.click(screen.getByText(focusOptions.at(2)))
        await user.keyboard('{ArrowUp}')

        expect(screen.getByText(focusOptions.at(1))).toHaveFocus()
      })
      test('Down arrow key focuses the first tab when focused on the last tab', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(-1)}
            onChange={jest.fn()}
            vertical={true}
          />
        )

        await user.click(screen.getByText(focusOptions.at(-1)))
        await user.keyboard('{ArrowDown}')

        expect(screen.getByText(focusOptions.at(0))).toHaveFocus()
      })
      test('Up arrow key focuses the last tab when focused on the first tab', async () => {
        const user = userEvent.setup()

        render(
          <TabBar
            options={focusOptions}
            value={focusOptions.at(0)}
            onChange={jest.fn()}
            vertical={true}
          />
        )

        await user.click(screen.getByText(focusOptions.at(0)))
        await user.keyboard('{ArrowUp}')

        expect(screen.getByText(focusOptions.at(-1))).toHaveFocus()
      })
    })
  })
})

import '../.storybook/styles/application.scss'
import React from 'react'
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/addon-docs/blocks'

const preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        height: '300px',
      },
      page: () => (
        <>
          <Title/>
          <Subtitle/>
          <Description/>
          <Primary/>
          <Controls/>
          <Stories/>
        </>
      ),
    }
  }
}

export default preview;

import React from 'react'
import { render, screen } from '@testing-library/react'
import About from '../pages/About'

describe('About Component', () => {
  test('renders about section with correct content', () => {
    render(<About />)
    const aboutHeadings = screen.queryAllByText('About')
    const aboutText = screen.getByText(/In this project, I have developed a chatbot/i)

    expect(aboutHeadings.length).toBeGreaterThan(0)
    expect(aboutText).toBeInTheDocument()
  })
})

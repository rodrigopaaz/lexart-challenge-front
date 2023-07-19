import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import Menu from '../components/Menu'

describe('Menu Component', () => {
  test('renders menu head with correct text', () => {
    render(<Menu />)
    const menuHead = screen.getByText('Menu')

    expect(menuHead).toBeInTheDocument()
  })

  test('navigates to Main when Main option is clicked', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Menu />
      </Router>
    )
    const mainOption = screen.getByText('Main')
    fireEvent.click(mainOption)

    expect(history.location.pathname).toBe('/')
  })

  test('navigates to History when History option is clicked', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Menu />
      </Router>
    )
    const historyOption = screen.getByText('History')
    fireEvent.click(historyOption)

    expect(history.location.pathname).toBe('/history')
  })

  test('navigates to About when About option is clicked', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Menu />
      </Router>
    )
    const aboutOption = screen.getByText('About')
    fireEvent.click(aboutOption)

    expect(history.location.pathname).toBe('/about')
  })
})

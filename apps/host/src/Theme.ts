import { type DefaultTheme, styled } from "styled-components"


declare module 'styled-components' {
  export interface DefaultTheme {
    hoverColor: string,
    borderRadius: string,
    padding: string,
    button: {
      colors: {
        primary: string,
        secondary: string,
        white: string
      }
    },
    text: {
      fontSize: string,
      fontWeight: string,
      colors: {
        primary: string,
        secondary: string,
        white: string
      }
    },
    colors: {
      primary: string,
      secondary: string,
      white: string
    }
  }
}

export const Theme: DefaultTheme = {
  hoverColor: '#e0e0e0',
  borderRadius: '6px',
  padding: '0.5rem',
  button: {
    colors: {
      primary: '#f0f0f0',
      secondary: 'rgba(0, 0, 0, .2)',
      white: '#fff',
    }
  },
  text: {
    fontSize: '1rem',
    fontWeight: '600',
    colors: {
      primary: '#f0f0f0',
      secondary: 'rgba(0, 0, 0, .65)',
      white: '#fff',
    }
  },
  colors: {
    primary: '#f0f0f0',
    secondary: 'rgba(0, 0, 0, .65)',
    white: '#fff',
  }
}

export const StyledCenterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 48px;
  justify-content: center;
`
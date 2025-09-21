'use client'
import React, { createContext, useContext, ReactNode } from 'react'
import { theme, type Theme } from './tokens'

interface ThemeContextType {
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider ({ children }: ThemeProviderProps): JSX.Element {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme (): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Hook for easy access to theme tokens
// export function useDesignTokens ():  {
//   const { theme } = useTheme()
//   return theme
// }

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useApp } from './index'

// Mock react-i18next
const mockChangeLanguage = vi.fn()
const mockUseTranslation = vi.fn(() => ({
  i18n: {
    changeLanguage: mockChangeLanguage
  }
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => mockUseTranslation()
}))

describe('useApp Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default language "es"', () => {
    const { result } = renderHook(() => useApp())
    
    expect(result.current.language).toBe('es')
  })

  it('should call i18n.changeLanguage with initial language on mount', () => {
    renderHook(() => useApp())
    
    expect(mockChangeLanguage).toHaveBeenCalledWith('es')
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1)
  })

  it('should toggle language from "es" to "en"', () => {
    const { result } = renderHook(() => useApp())
    
    expect(result.current.language).toBe('es')
    
    act(() => {
      result.current.toggleLanguage()
    })
    
    expect(result.current.language).toBe('en')
  })

  it('should toggle language from "en" to "es"', () => {
    const { result } = renderHook(() => useApp())
    
    // First toggle: es -> en
    act(() => {
      result.current.toggleLanguage()
    })
    
    expect(result.current.language).toBe('en')
    
    // Second toggle: en -> es
    act(() => {
      result.current.toggleLanguage()
    })
    
    expect(result.current.language).toBe('es')
  })

  it('should call i18n.changeLanguage when language changes', () => {
    const { result } = renderHook(() => useApp())
    
    expect(mockChangeLanguage).toHaveBeenCalledWith('es')
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1)
    
    act(() => {
      result.current.toggleLanguage()
    })
    
    expect(mockChangeLanguage).toHaveBeenCalledWith('en')
    expect(mockChangeLanguage).toHaveBeenCalledTimes(2)
  })
})

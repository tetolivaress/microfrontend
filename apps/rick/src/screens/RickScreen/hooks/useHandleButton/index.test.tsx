import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useHandleButton } from './index'

describe('useHandleButton Hook', () => {
  it('should initialize with showCharacters as false', () => {
    const { result } = renderHook(() => useHandleButton())
    
    expect(result.current.showCharacters).toBe(false)
    expect(typeof result.current.toggleCharacters).toBe('function')
  })

  it('should toggle showCharacters from false to true when toggleCharacters is called', () => {
    const { result } = renderHook(() => useHandleButton())
    
    expect(result.current.showCharacters).toBe(false)
    
    act(() => {
      result.current.toggleCharacters()
    })
    
    expect(result.current.showCharacters).toBe(true)
  })

  it('should toggle showCharacters from true to false when toggleCharacters is called again', () => {
    const { result } = renderHook(() => useHandleButton())
    
    // First toggle: false -> true
    act(() => {
      result.current.toggleCharacters()
    })
    expect(result.current.showCharacters).toBe(true)
    
    // Second toggle: true -> false
    act(() => {
      result.current.toggleCharacters()
    })
    expect(result.current.showCharacters).toBe(false)
  })
})

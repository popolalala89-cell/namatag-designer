import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import vibes, { patterns } from '../utils/vibes'

const VibeContext = createContext()

export function VibeProvider({ children }) {
  const [vibe, setVibe] = useState(vibes[0]) // default: indomaret

  const applyVibe = useCallback((v) => {
    setVibe(v)
    // Apply CSS custom properties
    const root = document.documentElement
    const c = v.colors
    root.style.setProperty('--vibe-primary', c.primary)
    root.style.setProperty('--vibe-primary-light', c.primaryLight)
    root.style.setProperty('--vibe-secondary', c.secondary)
    root.style.setProperty('--vibe-accent', c.accent)
    root.style.setProperty('--vibe-bg', c.bg)
    root.style.setProperty('--vibe-sidebar-bg', c.sidebarBg)
    root.style.setProperty('--vibe-sidebar-border', c.sidebarBorder)
    root.style.setProperty('--vibe-card-bg', c.cardBg)
    root.style.setProperty('--vibe-text', c.text)
    root.style.setProperty('--vibe-text-muted', c.textMuted)
    root.style.setProperty('--vibe-canvas-bg', c.canvasBg)
    root.style.setProperty('--vibe-glass-bg', c.glassBg)
    root.style.setProperty('--vibe-glass-border', c.glassBorder)
    root.style.setProperty('--vibe-gradient', c.gradient)
    root.style.setProperty('--vibe-glow', c.glow)
    root.style.setProperty('--vibe-pattern', `url("data:image/svg+xml,${encodeURIComponent(patterns[v.pattern] || '')}")`)
  }, [])

  const changeVibe = useCallback((vibeId) => {
    const found = vibes.find((v) => v.id === vibeId)
    if (found) applyVibe(found)
  }, [applyVibe])

  useEffect(() => {
    applyVibe(vibe)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <VibeContext.Provider value={{ vibe, changeVibe, vibes }}>
      {children}
    </VibeContext.Provider>
  )
}

export function useVibe() {
  const ctx = useContext(VibeContext)
  if (!ctx) throw new Error('useVibe must be used within VibeProvider')
  return ctx
}

export default useVibe

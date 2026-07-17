import { useRef, useEffect } from 'react'
import { useVibe } from '../hooks/useVibe'

export default function Canvas({ canvasElRef, canvasWidth, canvasHeight }) {
  const containerRef = useRef(null)
  const { vibe } = useVibe()

  // Responsive canvas sizing
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasElRef.current
    if (!container || !canvas) return

    const resizeCanvas = () => {
      const maxW = Math.min(container.clientWidth || 300, 500)
      const maxH = (container.clientHeight || 300) * 0.7
      const scale = Math.min(maxW / canvasWidth, maxH / canvasHeight, 1)
      canvas.style.width = `${canvasWidth * scale}px`
      canvas.style.height = `${canvasHeight * scale}px`
    }

    resizeCanvas()

    // Also resize on window resize
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [canvasWidth, canvasHeight, canvasElRef])

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center p-4 overflow-auto vibe-transition canvas-container"
      style={{ background: vibe.colors.canvasBg }}
    >
      <div
        className="shadow-lg rounded-sm"
        style={{ boxShadow: vibe.colors.glow }}
      >
        <canvas
          ref={canvasElRef}
          id="namatag-canvas"
        />
      </div>
    </div>
  )
}

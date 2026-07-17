import { useRef, useEffect } from 'react'
import { useVibe } from '../hooks/useVibe'

export default function Canvas({ canvasElRef, canvasWidth, canvasHeight }) {
  const containerRef = useRef(null)
  const { vibe } = useVibe()

  useEffect(() => {
    if (containerRef.current && canvasElRef.current) {
      const container = containerRef.current
      const canvas = canvasElRef.current
      // Make canvas responsive
      const maxW = Math.min(container.clientWidth, 500)
      const scale = maxW / canvasWidth
      canvas.style.width = `${canvasWidth * scale}px`
      canvas.style.height = `${canvasHeight * scale}px`
    }
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

import { useRef, useEffect } from 'react'

export default function Canvas({ canvasElRef, canvasWidth, canvasHeight }) {
  const containerRef = useRef(null)

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
      className="flex-1 flex items-center justify-center bg-gray-100 p-4 overflow-auto"
    >
      <div className="shadow-lg bg-white rounded-sm">
        <canvas
          ref={canvasElRef}
          id="namatag-canvas"
        />
      </div>
    </div>
  )
}

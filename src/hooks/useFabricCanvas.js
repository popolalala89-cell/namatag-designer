import { useEffect, useRef, useCallback } from 'react'
import { Canvas, Rect, Textbox, FabricImage } from 'fabric'

export default function useFabricCanvas(canvasElRef) {
  const canvasRef = useRef(null)
  const objectsRef = useRef({}) // track text objects by key
  const bgRectRef = useRef(null)
  const borderRectRef = useRef(null)
  const logoRef = useRef(null)

  // Init canvas
  useEffect(() => {
    if (!canvasElRef.current) return

    const el = canvasElRef.current
    const canvas = new Canvas(el, {
      width: 400,
      height: 250,
      selection: false,
      backgroundColor: '#ffffff',
    })

    canvasRef.current = canvas

    return () => {
      canvas.dispose()
      canvasRef.current = null
    }
  }, [canvasElRef])

  // Load template
  const loadTemplate = useCallback((template) => {
    const canvas = canvasRef.current
    if (!canvas || !template) return

    const { width, height, defaultBg, defaultBorder, defaultTexts } = template

    canvas.setWidth(width)
    canvas.setHeight(height)
    canvas.backgroundColor = defaultBg

    // Clear all objects
    canvas.remove(...canvas.getObjects())
    objectsRef.current = {}
    bgRectRef.current = null
    borderRectRef.current = null
    logoRef.current = null

    // Background rect (for colored backgrounds)
    const bg = new Rect({
      left: 0,
      top: 0,
      width,
      height,
      fill: defaultBg,
      selectable: false,
      evented: false,
    })
    bgRectRef.current = bg
    canvas.add(bg)
    canvas.sendObjectToBack(bg)

    // Border rect
    const border = new Rect({
      left: 2,
      top: 2,
      width: width - 4,
      height: height - 4,
      fill: 'transparent',
      stroke: defaultBorder || '#cccccc',
      strokeWidth: 1.5,
      selectable: false,
      evented: false,
    })
    borderRectRef.current = border
    canvas.add(border)

    // Text objects
    if (defaultTexts) {
      defaultTexts.forEach((t) => {
        const textbox = new Textbox(t.value, {
          left: t.x,
          top: t.y,
          fontSize: t.fontSize,
          fontWeight: t.fontWeight || 'normal',
          fill: t.fill || '#000000',
          fontFamily: t.fontFamily || 'Arial',
          textAlign: t.textAlign || 'center',
          originX: 'center',
          originY: 'center',
          width: width * 0.8,
          selectable: true,
          evented: true,
          name: t.key,
        })
        objectsRef.current[t.key] = textbox
        canvas.add(textbox)
      })
    }

    canvas.renderAll()
  }, [])

  // Update text value by key
  const updateText = useCallback((key, value) => {
    const obj = objectsRef.current[key]
    if (obj) {
      obj.set('text', value || obj.text)
      canvasRef.current?.renderAll()
    }
  }, [])

  // Update font family
  const updateFontFamily = useCallback((family) => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getObjects().forEach((obj) => {
      if (obj instanceof Textbox && obj.name) {
        obj.set('fontFamily', family)
      }
    })
    canvas.renderAll()
  }, [])

  // Update text color
  const updateTextColor = useCallback((color) => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getObjects().forEach((obj) => {
      if (obj instanceof Textbox && obj.name) {
        obj.set('fill', color)
      }
    })
    canvas.renderAll()
  }, [])

  // Update background color
  const updateBgColor = useCallback((color) => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (bgRectRef.current) {
      bgRectRef.current.set('fill', color)
    }
    canvas.backgroundColor = color
    canvas.renderAll()
  }, [])

  // Update border color
  const updateBorderColor = useCallback((color) => {
    if (borderRectRef.current) {
      borderRectRef.current.set('stroke', color)
      canvasRef.current?.renderAll()
    }
  }, [])

  // Add logo image
  const addLogo = useCallback((url) => {
    const canvas = canvasRef.current
    if (!canvas) return

    FabricImage.fromURL(url, { crossOrigin: 'anonymous' }).then((img) => {
      // Scale to fit (max 60px)
      const maxW = 60
      const scale = maxW / Math.max(img.width, img.height)
      img.set({
        scaleX: scale,
        scaleY: scale,
        left: canvas.width / 2 - (img.width * scale) / 2,
        top: 15,
        selectable: true,
        evented: true,
      })

      // Remove old logo if exists
      if (logoRef.current) {
        canvas.remove(logoRef.current)
      }
      logoRef.current = img
      canvas.add(img)
      canvas.renderAll()
    })
  }, [])

  // Remove logo
  const removeLogo = useCallback(() => {
    if (logoRef.current) {
      canvasRef.current?.remove(logoRef.current)
      logoRef.current = null
      canvasRef.current?.renderAll()
    }
  }, [])

  // Get all current text values
  const getTextValues = useCallback(() => {
    const values = {}
    Object.entries(objectsRef.current).forEach(([key, obj]) => {
      values[key] = obj.text
    })
    return values
  }, [])

  return {
    canvasRef,
    loadTemplate,
    updateText,
    updateFontFamily,
    updateTextColor,
    updateBgColor,
    updateBorderColor,
    addLogo,
    removeLogo,
    getTextValues,
  }
}

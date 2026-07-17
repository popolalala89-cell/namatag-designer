import { useEffect, useRef, useCallback } from 'react'
import { Canvas, Rect, Textbox, FabricImage, Circle, Ellipse } from 'fabric'

export default function useFabricCanvas(canvasElRef) {
  const canvasRef = useRef(null)
  const objectsRef = useRef({}) // track text objects by key
  const bgRectRef = useRef(null)
  const borderRectRef = useRef(null)
  const logoRef = useRef(null)
  const photoRef = useRef(null)
  const decorationsRef = useRef([])
  const currentTemplateRef = useRef(null)

  // Init canvas
  useEffect(() => {
    if (!canvasElRef.current) return

    const el = canvasElRef.current
    const canvas = new Canvas(el, {
      width: 500,
      height: 320,
      selection: false,
      backgroundColor: '#ffffff',
    })

    canvasRef.current = canvas

    return () => {
      canvas.dispose()
      canvasRef.current = null
    }
  }, [canvasElRef])

  // Helper: create decoration objects
  function createDecorations(decorations, tmplWidth, tmplHeight) {
    const objects = []
    if (!decorations) return objects

    decorations.forEach((dec) => {
      let obj = null
      switch (dec.type) {
        case 'headerBar':
          obj = new Rect({
            left: dec.x, top: dec.y, width: dec.width || tmplWidth, height: dec.height,
            fill: dec.fill, selectable: false, evented: false, name: 'dec-headerBar',
          })
          break
        case 'headerBar2':
          obj = new Rect({
            left: dec.x, top: dec.y, width: dec.width, height: dec.height,
            fill: dec.fill, selectable: false, evented: false, name: 'dec-headerBar2',
          })
          break
        case 'footerBar':
          obj = new Rect({
            left: dec.x, top: dec.y, width: dec.width || tmplWidth, height: dec.height,
            fill: dec.fill, selectable: false, evented: false, name: 'dec-footerBar',
          })
          break
        case 'accentLine':
          obj = new Rect({
            left: dec.x, top: dec.y, width: dec.width, height: dec.height,
            fill: dec.fill, selectable: false, evented: false, name: 'dec-accentLine',
          })
          break
        case 'bgAccent':
          obj = new Rect({
            left: dec.x, top: dec.y, width: dec.width, height: dec.height,
            fill: dec.fill, selectable: false, evented: false, name: 'dec-bgAccent',
          })
          break
        case 'separator':
          obj = new Rect({
            left: dec.x, top: dec.y - (dec.strokeWidth || 1) / 2,
            width: dec.x2 - dec.x, height: dec.strokeWidth || 1,
            fill: dec.stroke, selectable: false, evented: false, name: 'dec-separator',
          })
          break
        case 'headerText':
          obj = new Textbox(dec.text, {
            left: dec.x, top: dec.y, fontSize: dec.fontSize, fontWeight: dec.fontWeight,
            fill: dec.fill, fontFamily: dec.fontFamily, textAlign: 'center',
            originX: 'center', originY: 'center', selectable: false, evented: false, name: 'dec-headerText',
            width: tmplWidth * 0.9,
          })
          break
        default:
          break
      }
      if (obj) objects.push(obj)
    })
    return objects
  }

  // Load template
  const loadTemplate = useCallback((template) => {
    const canvas = canvasRef.current
    if (!canvas || !template) return

    const { width, height, defaultBg, defaultBorder, defaultTexts, decorations } = template

    currentTemplateRef.current = template

    canvas.setWidth(width)
    canvas.setHeight(height)
    canvas.backgroundColor = defaultBg

    // Clear all objects
    canvas.remove(...canvas.getObjects())
    objectsRef.current = {}
    bgRectRef.current = null
    borderRectRef.current = null
    logoRef.current = null
    photoRef.current = null
    decorationsRef.current = []

    // Background rect
    const bg = new Rect({
      left: 0, top: 0, width, height,
      fill: defaultBg,
      selectable: false, evented: false,
    })
    bgRectRef.current = bg
    canvas.add(bg)
    canvas.sendObjectToBack(bg)

    // Decoration objects
    const decObs = createDecorations(decorations, width, height)
    decorationsRef.current = decObs
    decObs.forEach((d) => {
      canvas.add(d)
      // send to back but above bg
      canvas.sendObjectToBack(d)
    })

    // Border rect
    const border = new Rect({
      left: 2, top: 2,
      width: width - 4, height: height - 4,
      fill: 'transparent',
      stroke: defaultBorder || '#cccccc',
      strokeWidth: 1.5,
      selectable: false, evented: false,
    })
    borderRectRef.current = border
    canvas.add(border)

    // Bring bg to very back
    canvas.sendObjectToBack(bg)

    // Text objects
    if (defaultTexts) {
      defaultTexts.forEach((t) => {
        const textbox = new Textbox(t.value, {
          left: t.x, top: t.y,
          fontSize: t.fontSize,
          fontWeight: t.fontWeight || 'normal',
          fill: t.fill || '#000000',
          fontFamily: t.fontFamily || 'Inter',
          textAlign: t.textAlign || 'center',
          originX: t.textAlign === 'left' ? 'left' : 'center',
          originY: 'center',
          width: width * 0.45,
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

  // Update font family for ALL text
  const updateFontFamily = useCallback((family) => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getObjects().forEach((obj) => {
      if (obj instanceof Textbox && obj.name && obj.name.startsWith('dec-')) return
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
      if (obj instanceof Textbox && obj.name && obj.name.startsWith('dec-')) return
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
      const maxW = 60
      const scale = maxW / Math.max(img.width, img.height)
      img.set({
        scaleX: scale,
        scaleY: scale,
        left: canvas.width / 2 - (img.width * scale) / 2,
        top: 15,
        selectable: true, evented: true,
        name: 'logo',
      })

      if (logoRef.current) {
        canvas.remove(logoRef.current)
      }
      logoRef.current = img
      canvas.add(img)
      canvas.renderAll()
    }).catch(() => {
      // silent fail
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

  // Add photo (with shape clipping)
  const addPhoto = useCallback((url) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const template = currentTemplateRef.current
    if (!template || !template.photoArea) return

    const pa = template.photoArea

    FabricImage.fromURL(url, { crossOrigin: 'anonymous' }).then((img) => {
      // Calculate scale to fill photo area
      const targetW = pa.width
      const targetH = pa.height
      const scaleX = targetW / img.width
      const scaleY = targetH / img.height
      const scale = Math.max(scaleX, scaleY) // cover the area

      img.set({
        scaleX: scale,
        scaleY: scale,
        left: pa.x + targetW / 2,
        top: pa.y + targetH / 2,
        originX: 'center',
        originY: 'center',
        selectable: true, evented: true,
        name: 'photo',
      })

      // Create clipPath based on shape
      let clipPath
      if (pa.shape === 'circle') {
        clipPath = new Circle({
          radius: Math.min(targetW, targetH) / 2,
          left: pa.x + targetW / 2 - Math.min(targetW, targetH) / 2,
          top: pa.y + targetH / 2 - Math.min(targetW, targetH) / 2,
          originX: 'center', originY: 'center',
        })
      } else {
        // roundrect
        clipPath = new Rect({
          left: pa.x, top: pa.y,
          width: targetW, height: targetH,
          rx: 12, ry: 12,
        })
      }
      img.clipPath = clipPath

      // Add a border circle/rect around photo
      const borderObj = pa.shape === 'circle'
        ? new Circle({
            radius: Math.min(targetW, targetH) / 2 + (pa.borderWidth || 1),
            left: pa.x + targetW / 2 - Math.min(targetW, targetH) / 2 - (pa.borderWidth || 1),
            top: pa.y + targetH / 2 - Math.min(targetW, targetH) / 2 - (pa.borderWidth || 1),
            fill: 'transparent',
            stroke: pa.borderColor || '#ffffff',
            strokeWidth: pa.borderWidth || 2,
            selectable: false, evented: false,
            name: 'photo-border',
          })
        : new Rect({
            left: pa.x - (pa.borderWidth || 1),
            top: pa.y - (pa.borderWidth || 1),
            width: targetW + (pa.borderWidth || 1) * 2,
            height: targetH + (pa.borderWidth || 1) * 2,
            rx: 14, ry: 14,
            fill: 'transparent',
            stroke: pa.borderColor || '#ffffff',
            strokeWidth: pa.borderWidth || 2,
            selectable: false, evented: false,
            name: 'photo-border',
          })

      // Remove old photo + border
      if (photoRef.current) {
        canvas.remove(photoRef.current.img)
        canvas.remove(photoRef.current.border)
      }
      photoRef.current = { img, border: borderObj }
      canvas.add(img)
      canvas.add(borderObj)
      canvas.renderAll()
    }).catch(() => {
      // silent fail
    })
  }, [])

  // Remove photo
  const removePhoto = useCallback(() => {
    if (photoRef.current) {
      canvasRef.current?.remove(photoRef.current.img)
      canvasRef.current?.remove(photoRef.current.border)
      photoRef.current = null
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
    addPhoto,
    removePhoto,
    getTextValues,
  }
}

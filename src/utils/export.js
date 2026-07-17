import jsPDF from 'jspdf'

/**
 * Add watermark overlay to canvas
 */
function addWatermark(canvas) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.save()
  ctx.font = '12px Arial'
  ctx.fillStyle = 'rgba(150, 150, 150, 0.5)'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'bottom'
  ctx.fillText('namatag.design', w - 8, h - 8)
  ctx.restore()
}

/**
 * Export canvas sebagai PNG (dengan watermark)
 */
export function exportPNG(fabricCanvas, filename = 'namatag.png') {
  if (!fabricCanvas) return

  const dataURL = fabricCanvas.toDataURL({ multiplier: 2, format: 'png' })
  const img = new Image()
  img.onload = () => {
    const c = document.createElement('canvas')
    c.width = img.width
    c.height = img.height
    const ctx = c.getContext('2d')
    ctx.drawImage(img, 0, 0)

    // Watermark
    ctx.save()
    ctx.font = `${Math.round(img.width * 0.03)}px Arial`
    ctx.fillStyle = 'rgba(150, 150, 150, 0.5)'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'bottom'
    ctx.fillText('namatag.design', img.width - 16, img.height - 16)
    ctx.restore()

    const link = document.createElement('a')
    link.download = filename
    link.href = c.toDataURL('image/png')
    link.click()
  }
  img.src = dataURL
}

/**
 * Export canvas sebagai PDF A4 (4 nametag per halaman, dengan watermark)
 */
export function exportPDF(fabricCanvas, filename = 'namatag.pdf') {
  if (!fabricCanvas) return

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageW = 210
  const pageH = 297
  const margin = 10

  const dataURL = fabricCanvas.toDataURL({ multiplier: 2, format: 'png' })
  const img = new Image()

  img.onload = () => {
    // Tambah watermark ke image
    const c = document.createElement('canvas')
    c.width = img.width
    c.height = img.height
    const ctx = c.getContext('2d')
    ctx.drawImage(img, 0, 0)
    ctx.save()
    ctx.font = `${Math.round(img.width * 0.03)}px Arial`
    ctx.fillStyle = 'rgba(150, 150, 150, 0.5)'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'bottom'
    ctx.fillText('namatag.design', img.width - 16, img.height - 16)
    ctx.restore()

    const watermarkedURL = c.toDataURL('image/png')

    // Hitung ukuran nametag di PDF (2x2 per halaman)
    const cols = 2
    const rows = 2
    const usableW = pageW - margin * 2
    const usableH = pageH - margin * 2
    const cardW = usableW / cols
    const cardH = usableH / rows

    // Aspect ratio nametag
    const origRatio = fabricCanvas.width / fabricCanvas.height
    let fitW = cardW - 4
    let fitH = fitW / origRatio
    if (fitH > cardH - 4) {
      fitH = cardH - 4
      fitW = fitH * origRatio
    }

    for (let r = 0; r < rows; r++) {
      for (let cIdx = 0; cIdx < cols; cIdx++) {
        const x = margin + cIdx * cardW + (cardW - fitW) / 2
        const y = margin + r * cardH + (cardH - fitH) / 2
        pdf.addImage(watermarkedURL, 'PNG', x, y, fitW, fitH)
      }
    }

    pdf.save(filename)
  }
  img.src = dataURL
}

/**
 * Render canvas ke gambar (untuk preview order WA)
 */
export function canvasToBlob(fabricCanvas) {
  return new Promise((resolve) => {
    const dataURL = fabricCanvas.toDataURL({ multiplier: 2, format: 'png' })
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width
      c.height = img.height
      const ctx = c.getContext('2d')
      ctx.drawImage(img, 0, 0)
      c.toBlob((blob) => resolve(blob), 'image/png')
    }
    img.src = dataURL
  })
}

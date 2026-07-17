import { useState, useRef, useEffect, useCallback } from 'react'
import templates from './utils/templates'
import { exportPNG, exportPDF } from './utils/export'
import useFabricCanvas from './hooks/useFabricCanvas'
import { useVibe } from './hooks/useVibe'
import Canvas from './components/Canvas'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import VibePicker from './components/VibePicker'

export default function App() {
  const canvasElRef = useRef(null)
  const { vibe } = useVibe()
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [texts, setTexts] = useState({})
  const [fontFamily, setFontFamily] = useState('Inter')
  const [textColor, setTextColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [borderColor, setBorderColor] = useState('#cccccc')
  const [hasLogo, setHasLogo] = useState(false)
  const [logoUrl, setLogoUrl] = useState(null)
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoUrl, setPhotoUrl] = useState(null)
  const [toast, setToast] = useState(null)

  // Toaster
  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const {
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
    canvasRef,
  } = useFabricCanvas(canvasElRef)

  // Load template on select
  const handleSelectTemplate = useCallback(
    (t) => {
      setSelectedTemplate(t)
      loadTemplate(t)
      // Reset states sesuai template
      const initialTexts = {}
      t.defaultTexts.forEach((dt) => {
        initialTexts[dt.key] = dt.value
      })
      setTexts(initialTexts)
      setBgColor(t.defaultBg)
      setBorderColor(t.defaultBorder || '#cccccc')
      if (t.defaultTexts.length > 0) {
        setTextColor(t.defaultTexts[0].fill)
      }
      setHasLogo(false)
      setLogoUrl(null)
      setHasPhoto(false)
      setPhotoUrl(null)
    },
    [loadTemplate]
  )

  // Sync text changes to canvas
  useEffect(() => {
    if (!selectedTemplate) return
    Object.entries(texts).forEach(([key, value]) => {
      updateText(key, value)
    })
  }, [texts, selectedTemplate, updateText])

  // Sync font family
  useEffect(() => {
    if (!selectedTemplate) return
    updateFontFamily(fontFamily)
  }, [fontFamily, selectedTemplate, updateFontFamily])

  // Sync text color
  useEffect(() => {
    if (!selectedTemplate) return
    updateTextColor(textColor)
  }, [textColor, selectedTemplate, updateTextColor])

  // Sync bg color
  useEffect(() => {
    if (!selectedTemplate) return
    updateBgColor(bgColor)
  }, [bgColor, selectedTemplate, updateBgColor])

  // Sync border color
  useEffect(() => {
    if (!selectedTemplate) return
    updateBorderColor(borderColor)
  }, [borderColor, selectedTemplate, updateBorderColor])

  // Handle logo upload
  const handleLogoUpload = useCallback(
    (url) => {
      setLogoUrl(url)
      setHasLogo(true)
      addLogo(url)
    },
    [addLogo]
  )

  const handleRemoveLogo = useCallback(() => {
    setHasLogo(false)
    setLogoUrl(null)
    removeLogo()
  }, [removeLogo])

  // Handle photo upload
  const handlePhotoUpload = useCallback(
    (url) => {
      // Remove old photo first
      if (hasPhoto && photoUrl) {
        URL.revokeObjectURL(photoUrl)
      }
      setPhotoUrl(url)
      setHasPhoto(true)
      addPhoto(url)
    },
    [addPhoto, hasPhoto, photoUrl]
  )

  const handleRemovePhoto = useCallback(() => {
    setHasPhoto(false)
    if (photoUrl) URL.revokeObjectURL(photoUrl)
    setPhotoUrl(null)
    removePhoto()
  }, [removePhoto, photoUrl])

  // Export handlers
  const handleExportPNG = useCallback(() => {
    if (!canvasRef.current) return
    exportPNG(canvasRef.current, 'namatag.png')
    showToast('✅ PNG berhasil di-download!')
  }, [canvasRef, showToast])

  const handleExportPDF = useCallback(() => {
    if (!canvasRef.current) return
    exportPDF(canvasRef.current, 'namatag.pdf')
    showToast('✅ PDF berhasil di-download!')
  }, [canvasRef, showToast])

  const handleReset = useCallback(() => {
    if (selectedTemplate) {
      handleSelectTemplate(selectedTemplate)
      showToast('🔄 Canvas di-reset')
    }
  }, [selectedTemplate, handleSelectTemplate, showToast])

  const handleOrderWA = useCallback(() => {
    if (!canvasRef.current || !selectedTemplate) return

    const fabricCanvas = canvasRef.current
    const dataURL = fabricCanvas.toDataURL({ multiplier: 2, format: 'png' })

    const waNumber = '6281993295352'
    const message = encodeURIComponent(
      `Halo! Saya mau order cetak nametag:\n\n` +
      `Template: ${selectedTemplate.name}\n` +
      `Ukuran: ${selectedTemplate.width}×${selectedTemplate.height}\n` +
      `Teks: ${Object.entries(texts).map(([k, v]) => `${k}: ${v}`).join(', ')}\n` +
      `\nMohon info harga dan estimasi ya.`
    )

    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank')
    showToast('📱 Order via WhatsApp!')
  }, [canvasRef, selectedTemplate, texts, showToast])

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden vibe-transition"
      style={{ background: vibe.colors.bg, color: vibe.colors.text }}
    >
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl shadow-lg text-sm animate-slide-in glass"
          style={{ color: vibe.colors.text }}
        >
          {toast}
        </div>
      )}

      {/* Toolbar */}
      <Toolbar
        onExportPNG={handleExportPNG}
        onExportPDF={handleExportPDF}
        onOrderWA={handleOrderWA}
        onReset={handleReset}
      />

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          template={selectedTemplate}
          texts={texts}
          setTexts={setTexts}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          textColor={textColor}
          setTextColor={setTextColor}
          bgColor={bgColor}
          setBgColor={setBgColor}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
          onLogoUpload={handleLogoUpload}
          onRemoveLogo={handleRemoveLogo}
          hasLogo={hasLogo}
          onPhotoUpload={handlePhotoUpload}
          onRemovePhoto={handleRemovePhoto}
          hasPhoto={hasPhoto}
        />

        {/* Template picker + Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Vibe Picker */}
          <VibePicker />

          {/* Template Picker */}
          <div
            className="px-4 pt-3 pb-1 border-b vibe-transition"
            style={{
              background: vibe.colors.sidebarBg,
              borderColor: vibe.colors.sidebarBorder,
            }}
          >
            <div className="flex gap-2 overflow-x-auto">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTemplate(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all template-btn ${
                    selectedTemplate?.id === t.id ? 'template-btn-active' : ''
                  }`}
                  style={
                    selectedTemplate?.id === t.id
                      ? {}
                      : {
                          background: vibe.colors.cardBg,
                          color: vibe.colors.textMuted,
                          border: `1px solid ${vibe.colors.sidebarBorder}`,
                        }
                  }
                >
                  {t.emoji || ''} {t.name}
                </button>
              ))}
            </div>
          </div>

          <Canvas
            canvasElRef={canvasElRef}
            canvasWidth={selectedTemplate?.width || 500}
            canvasHeight={selectedTemplate?.height || 320}
          />
        </div>
      </div>

      {/* Footer branding */}
      <div
        className="text-center text-[10px] py-1 border-t vibe-transition"
        style={{
          background: vibe.colors.sidebarBg,
          borderColor: vibe.colors.sidebarBorder,
          color: vibe.colors.textMuted,
        }}
      >
        namatag.design — {vibe.emoji} desain sendiri, download, atau pesan cetak
      </div>
    </div>
  )
}

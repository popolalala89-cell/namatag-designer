import { useVibe } from '../hooks/useVibe'

export default function Sidebar({
  texts, setTexts, fontFamily, setFontFamily,
  textColor, setTextColor, bgColor, setBgColor,
  borderColor, setBorderColor, onLogoUpload, onRemoveLogo, hasLogo,
}) {
  const { vibe } = useVibe()

  const handleTextChange = (key, value) => {
    setTexts((prev) => ({ ...prev, [key]: value }))
  }

  const handleLogoFile = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onLogoUpload(url)
    }
  }

  const textFields = Object.keys(texts)

  return (
    <div
      className="w-72 h-full overflow-y-auto p-4 space-y-4 shrink-0 border-r vibe-transition"
      style={{
        background: vibe.colors.sidebarBg,
        borderColor: vibe.colors.sidebarBorder,
      }}
    >
      {/* Section: Text */}
      {textFields.length > 0 && (
        <Section label="📝 Teks" vibe={vibe}>
          <div className="space-y-2.5">
            {textFields.map((key) => (
              <div key={key}>
                <label className="block text-[11px] font-medium mb-1 capitalize" style={{ color: vibe.colors.textMuted }}>
                  {key.replace(/_/g, ' ')}
                </label>
                <input
                  type="text"
                  value={texts[key] || ''}
                  onChange={(e) => handleTextChange(key, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-sm input-vibe"
                  style={{
                    borderColor: vibe.colors.sidebarBorder,
                    background: vibe.colors.cardBg,
                    color: vibe.colors.text,
                    fontFamily,
                  }}
                  placeholder={`Masukkan ${key.replace(/_/g, ' ')}`}
                />
              </div>
            ))}
          </div>
        </Section>
      )}
      {textFields.length === 0 && (
        <div className="text-center py-8 animate-fade-in" style={{ color: vibe.colors.textMuted }}>
          <span className="text-3xl block mb-2">🎨</span>
          <p className="text-sm font-medium">Pilih template dulu!</p>
          <p className="text-[11px] mt-1">Klik template di atas untuk mulai desain</p>
        </div>
      )}

      {/* Section: Font */}
      {textFields.length > 0 && (
        <Section label="🔤 Font" vibe={vibe}>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-sm select-vibe"
            style={{
              borderColor: vibe.colors.sidebarBorder,
              background: vibe.colors.cardBg,
              color: vibe.colors.text,
              fontFamily,
            }}
          >
            {['Inter','Poppins','Quicksand','Nunito','Bebas Neue','Playfair Display','Crimson Text','Space Grotesk','Plus Jakarta Sans','Outfit','Arial','Helvetica','Times New Roman','Georgia','Impact'].map((f) => (
              <option key={f} value={f} style={{ fontFamily: f }}>
                {f}
              </option>
            ))}
          </select>
        </Section>
      )}

      {/* Section: Colors */}
      {textFields.length > 0 && (
        <Section label="🎨 Warna" vibe={vibe}>
          <div className="space-y-2.5">
            <ColorField label="Teks" value={textColor} onChange={setTextColor} vibe={vibe} />
            <ColorField label="Background" value={bgColor} onChange={setBgColor} vibe={vibe} />
            <ColorField label="Border" value={borderColor} onChange={setBorderColor} vibe={vibe} />
          </div>
        </Section>
      )}

      {/* Section: Logo */}
      {textFields.length > 0 && (
        <Section label="🖼️ Logo" vibe={vibe}>
          <label
            className="flex items-center justify-center w-full px-3 py-3 border-2 border-dashed rounded-xl cursor-pointer text-sm transition-all hover:scale-[1.02]"
            style={{
              borderColor: hasLogo ? vibe.colors.primary : vibe.colors.sidebarBorder,
              background: hasLogo ? vibe.colors.primary + '10' : vibe.colors.cardBg,
              color: hasLogo ? vibe.colors.primary : vibe.colors.textMuted,
            }}
          >
            <span className="flex items-center gap-1.5">
              {hasLogo ? '🔄 Ganti Logo' : '➕ Upload Logo'}
            </span>
            <input type="file" accept="image/*" onChange={handleLogoFile} className="hidden" />
          </label>
          {hasLogo && (
            <button
              onClick={onRemoveLogo}
              className="mt-1.5 text-xs font-medium transition-all hover:scale-105"
              style={{ color: vibe.colors.accent }}
            >
              ✖ Hapus logo
            </button>
          )}
        </Section>
      )}
    </div>
  )
}

function Section({ label, children, vibe }) {
  return (
    <div className="animate-fade-in">
      <h3
        className="text-[11px] font-bold uppercase tracking-wider mb-2.5 pb-1.5 border-b"
        style={{ color: vibe.colors.primary, borderColor: vibe.colors.sidebarBorder }}
      >
        {label}
      </h3>
      {children}
    </div>
  )
}

function ColorField({ label, value, onChange, vibe }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium shrink-0 w-16" style={{ color: vibe.colors.textMuted }}>
        {label}
      </label>
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 p-0.5 border rounded-lg cursor-pointer"
          style={{ borderColor: vibe.colors.sidebarBorder }}
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-2 py-1.5 rounded-xl text-xs font-mono input-vibe"
        style={{
          borderColor: vibe.colors.sidebarBorder,
          background: vibe.colors.cardBg,
          color: vibe.colors.text,
        }}
      />
    </div>
  )
}

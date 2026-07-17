export default function Sidebar({
  texts,
  setTexts,
  fontFamily,
  setFontFamily,
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  borderColor,
  setBorderColor,
  onLogoUpload,
  onRemoveLogo,
  hasLogo,
}) {
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

  const fonts = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Verdana',
    'Courier New',
    'Impact',
    'Trebuchet MS',
  ]

  const textFields = Object.keys(texts)

  return (
    <div className="w-72 bg-white border-r border-gray-200 h-full overflow-y-auto p-4 space-y-5 shrink-0">
      {/* Judul */}
      <div>
        <h2 className="text-lg font-bold text-gray-800">Namatag Designer</h2>
        <p className="text-xs text-gray-400 mt-0.5">Bikin nametag keren sendiri</p>
      </div>

      {/* Text inputs */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Teks</h3>
        {textFields.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Pilih template dulu</p>
        ) : (
          textFields.map((key) => (
            <div key={key}>
              <label className="block text-xs text-gray-500 mb-1 capitalize">
                {key.replace(/_/g, ' ')}
              </label>
              <input
                type="text"
                value={texts[key] || ''}
                onChange={(e) => handleTextChange(key, e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder={`Masukkan ${key.replace(/_/g, ' ')}`}
              />
            </div>
          ))
        )}
      </div>

      {/* Font */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Font</h3>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        >
          {fonts.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Warna</h3>
        <ColorField label="Teks" value={textColor} onChange={setTextColor} />
        <ColorField label="Background" value={bgColor} onChange={setBgColor} />
        <ColorField label="Border" value={borderColor} onChange={setBorderColor} />
      </div>

      {/* Logo */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Logo</h3>
        <label className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 text-sm text-gray-500">
          <span>{hasLogo ? 'Ganti Logo' : '+ Upload Logo'}</span>
          <input type="file" accept="image/*" onChange={handleLogoFile} className="hidden" />
        </label>
        {hasLogo && (
          <button
            onClick={onRemoveLogo}
            className="mt-1.5 text-xs text-red-500 hover:text-red-700"
          >
            Hapus logo
          </button>
        )}
      </div>
    </div>
  )
}

function ColorField({ label, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-500 w-20">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 p-0.5 border border-gray-300 rounded cursor-pointer"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
    </div>
  )
}

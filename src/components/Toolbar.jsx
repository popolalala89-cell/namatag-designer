export default function Toolbar({
  onExportPNG,
  onExportPDF,
  onOrderWA,
  onReset,
}) {
  const buttonClass =
    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all'

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-gray-700">
          🏷️ Namatag Designer
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className={`${buttonClass} text-gray-600 hover:bg-gray-100`}
          title="Reset canvas"
        >
          🔄 Reset
        </button>

        <button
          onClick={onExportPNG}
          className={`${buttonClass} bg-blue-500 text-white hover:bg-blue-600`}
          title="Download PNG"
        >
          ⬇ PNG
        </button>

        <button
          onClick={onExportPDF}
          className={`${buttonClass} bg-green-500 text-white hover:bg-green-600`}
          title="Download PDF siap cetak"
        >
          ⬇ PDF
        </button>

        <button
          onClick={onOrderWA}
          className={`${buttonClass} bg-emerald-600 text-white hover:bg-emerald-700`}
          title="Pesan cetak via WhatsApp"
        >
          📱 Pesan Cetak
        </button>
      </div>
    </div>
  )
}

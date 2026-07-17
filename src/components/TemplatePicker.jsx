export default function TemplatePicker({ templates, selectedId, onSelect }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
        Template
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t)}
            className={`text-left px-3 py-2.5 rounded-lg border transition-all text-sm ${
              selectedId === t.id
                ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="font-medium">{t.name}</div>
            <div className="text-xs text-gray-400 mt-0.5">{t.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

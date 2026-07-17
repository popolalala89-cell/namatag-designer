import { useVibe } from '../hooks/useVibe'

export default function Toolbar({ onExportPNG, onExportPDF, onOrderWA, onReset }) {
  const { vibe } = useVibe()

  return (
    <div
      className="flex items-center justify-between px-4 py-2 border-b shrink-0 vibe-transition"
      style={{
        background: vibe.colors.sidebarBg,
        borderColor: vibe.colors.sidebarBorder,
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
          style={{ background: vibe.colors.gradient }}
        >
          🏷️
        </div>
        <div>
          <span className="text-sm font-bold" style={{ color: vibe.colors.text }}>
            Namatag Designer
          </span>
          <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded-full" style={{ background: vibe.colors.primary + '20', color: vibe.colors.primary }}>
            {vibe.emoji} {vibe.name}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <ActionButton onClick={onReset} vibe={vibe} emoji="🔄" label="Reset" />

        <ActionButton
          onClick={onExportPNG}
          vibe={vibe}
          emoji="⬇"
          label="PNG"
          primary
        />

        <ActionButton
          onClick={onExportPDF}
          vibe={vibe}
          emoji="⬇"
          label="PDF"
          primary
        />

        <button
          onClick={onOrderWA}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          style={{
            background: '#25D366',
            color: 'white',
            boxShadow: '0 2px 8px rgba(37,211,102,0.3)',
          }}
        >
          <span>📱</span>
          <span>Pesan Cetak</span>
        </button>
      </div>
    </div>
  )
}

function ActionButton({ onClick, vibe, emoji, label, primary }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all hover:scale-105 active:scale-95"
      style={
        primary
          ? { background: vibe.colors.gradient, color: 'white', boxShadow: vibe.colors.glow }
          : { background: vibe.colors.cardBg, color: vibe.colors.textMuted, border: `1px solid ${vibe.colors.sidebarBorder}` }
      }
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  )
}

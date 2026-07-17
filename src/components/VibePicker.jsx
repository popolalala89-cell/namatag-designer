import { useVibe } from '../hooks/useVibe'

export default function VibePicker() {
  const { vibe, changeVibe, vibes } = useVibe()

  return (
    <div className="relative px-4 py-2">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300">
        {vibes.map((v) => (
          <button
            key={v.id}
            onClick={() => changeVibe(v.id)}
            className={`
              relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium
              whitespace-nowrap transition-all duration-300 shrink-0
              ${vibe.id === v.id
                ? 'shadow-lg scale-105'
                : 'opacity-60 hover:opacity-90'
              }
            `}
            style={{
              background: vibe.id === v.id ? v.colors.gradient : v.colors.cardBg,
              color: vibe.id === v.id ? '#fff' : v.colors.text,
              boxShadow: vibe.id === v.id ? v.colors.glow : 'none',
            }}
            title={v.desc}
          >
            <span className="text-base">{v.emoji}</span>
            <span>{v.name}</span>
            {vibe.id === v.id && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

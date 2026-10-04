'use client';

type DealerButtonProps = {
  type: 'D' | 'SB' | 'BB';
};

export function DealerButton({ type }: DealerButtonProps) {
  const bgClass =
    type === 'D'
      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
      : type === 'SB'
        ? 'bg-sky-500 text-white border-sky-400'
        : 'bg-purple-600 text-white border-purple-400';

  return (
    <div
      className={`${bgClass} w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center font-display font-black text-[10px] sm:text-xs shadow-md select-none transition-transform hover:scale-110`}
      title={type === 'D' ? 'Dealer Button' : type === 'SB' ? 'Small Blind' : 'Big Blind'}
    >
      {type}
    </div>
  );
}

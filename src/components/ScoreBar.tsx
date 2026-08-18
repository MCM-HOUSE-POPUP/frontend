interface ScoreBarProps {
  label: string;
  score: number;
  maxScore: number;
}

export default function ScoreBar({
  label,
  score,
  maxScore,
}: ScoreBarProps) {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));

  return (
    <div className="flex items-center gap-3">
      <p className="w-[72px] shrink-0 text-[13px] font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-black">
        {label}
      </p>

      <div
        className="h-[9px] flex-1 overflow-hidden rounded-[13px] bg-mcm-border"
        role="progressbar"
        aria-label={`${label} 점수`}
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={maxScore}
      >
        <div
          className="h-full rounded-[13px] bg-mcm-accent"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
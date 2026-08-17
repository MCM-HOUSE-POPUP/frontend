interface ChoiceButtonProps {
  index: number;
  text: string;
  selected: boolean;
  onClick: () => void;
}

export default function ChoiceButton({
  index,
  text,
  selected,
  onClick,
}: ChoiceButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex min-h-[60px] w-full items-center rounded-[10px] border px-5 text-left ${
        selected
          ? "border-mcm-black bg-mcm-black text-mcm-white"
          : "border-[#D9D9D9] bg-mcm-white text-mcm-desc"
      }`}
    >
      <span
        className={`w-7 shrink-0 text-xs font-semibold leading-[1.7] tracking-[-0.02em] ${
          selected ? "text-mcm-white" : "text-mcm-secondary"
        }`}
      >
        {index + 1}
      </span>

      <span
        className={`text-[14px] font-semibold leading-[1.7] tracking-[-0.02em] ${
          selected ? "text-mcm-white" : "text-mcm-desc"
        }`}
      >
        {text}
      </span>
    </button>
  );
}
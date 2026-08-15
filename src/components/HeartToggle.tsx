interface HeartToggleProps {
  isSaved: boolean;
  onClick: () => void;
}

export default function HeartToggle({ isSaved, onClick }: HeartToggleProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute top-2 right-2 z-10"
      aria-label={isSaved ? "찜 해제하기" : "찜하기"}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isSaved ? "black" : "none"}
        stroke="black"
        strokeWidth="1.5"
      >
        <path d="M12 21s-6.716-4.35-9.428-8.24C.94 10.02 1.2 6.2 4.2 4.6c2.2-1.17 4.66-.55 6.2 1.3l1.6 1.9 1.6-1.9c1.54-1.85 4-2.47 6.2-1.3 3 1.6 3.26 5.42 1.63 8.16C18.716 16.65 12 21 12 21z" />
      </svg>
    </button>
  );
}

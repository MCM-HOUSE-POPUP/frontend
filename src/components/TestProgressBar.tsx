interface TestProgressProps {
  current: number;
  total: number;
}

export default function TestProgress({
  current,
  total,
}: TestProgressProps) {
  return (
    <div className="flex items-center">
      {Array.from({ length: total }).map((_, index) => {
        const active = index <= current;

        return (
          <div
            key={index}
            className="flex flex-1 items-center last:flex-none"
          >
            <span
              className={`h-3.5 w-3.5 shrink-0 rounded-full ${
                active ? "bg-mcm-black" : "bg-[#D9D9D9]"
              }`}
            />

            {index < total - 1 && (
              <span
                className={`h-px flex-1 ${
                  index < current
                    ? "bg-mcm-black"
                    : "bg-[#D9D9D9]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
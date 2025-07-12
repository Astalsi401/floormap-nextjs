"use client";

export const Results: React.FC = () => {
  return (
    <div
      data-scroll
      className="flex flex-col gap-1 pb-10 h-full overflow-y-auto"
    >
      {Array.from({ length: 100 }).map((_, index) => (
        <div
          key={index}
          className="p-2 bg-background shadow hover:bg-background/50 transition-colors"
        >
          <h3 className="text-lg font-semibold">Result {index + 1}</h3>
          <p className="text-sm text-foreground/70">
            This is a description of result {index + 1}.
          </p>
        </div>
      ))}
    </div>
  );
};

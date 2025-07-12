"use client";

export const Results: React.FC = () => {
  return (
    <div data-scroll className="flex flex-col gap-2 p-4 h-full overflow-y-auto">
      {Array.from({ length: 100 }).map((_, index) => (
        <div
          key={index}
          className="p-2 bg-white rounded shadow hover:bg-gray-50 transition-colors"
        >
          <h3 className="text-lg font-semibold">Result {index + 1}</h3>
          <p className="text-sm text-gray-600">
            This is a description of result {index + 1}.
          </p>
        </div>
      ))}
    </div>
  );
};

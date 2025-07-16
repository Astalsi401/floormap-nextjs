import clsx from "clsx";

export const BoothName: React.FC<
  React.HTMLProps<HTMLDivElement> & {
    boothId: string;
    floor: number;
    boothName: string;
  }
> = ({ className, boothName, boothId, floor, ...props }) => {
  return (
    <div
      {...props}
      className={clsx(
        "select-none cursor-pointer rounded-xs flex gap-1",
        className
      )}
    >
      <h3 className="font-semibold h-[3em] flex items-center grow">
        <span>{boothName}</span>
      </h3>
      <div className="w-[6em] shrink-0 text-xs flex items-center justify-end">
        <span>
          {boothId} / {floor}F
        </span>
      </div>
    </div>
  );
};

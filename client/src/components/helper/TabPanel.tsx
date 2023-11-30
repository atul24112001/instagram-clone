import { ReactNode } from "react";

type Props = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  selected?: boolean;
  setActiveTab?: (tab: string) => void;
  tab: string;
};

export default function TabPanel({
  prefix = null,
  selected = false,
  suffix = null,
  setActiveTab,
  tab,
}: //   children,
Props) {
  return (
    <div
      onClick={() => {
        setActiveTab?.(tab.toLocaleLowerCase());
      }}
      className={`flex ${
        selected ? "font-bold" : ""
      } items-center gap-2 cursor-pointer`}
    >
      {prefix}
      <span className="text-sm">{tab}</span>
      {suffix}
    </div>
  );
}

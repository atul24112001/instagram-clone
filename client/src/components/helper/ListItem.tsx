import React from "react";
import Avatar from "./Avatar";

type Props = {
  title: string;
  subTitle?: string | null;
  tail?: React.ReactNode;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
};

export default function ListItem({
  title,
  subTitle = null,
  tail = null,
  size = "medium",
  onClick = () => {},
}: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 mb-4 cursor-pointer hover:bg-secondary-background rounded-lg"
    >
      <Avatar size={size} />
      <div className="flex-1">
        <div className={size == "small" ? "font-bold text-sm" : "font-bold"}>
          {title}
        </div>
        {subTitle && (
          <div
            className={
              size == "small"
                ? "text-secondary-text text-xs"
                : "text-secondary-text text-sm"
            }
          >
            {subTitle}
          </div>
        )}
      </div>
      {tail}
    </div>
  );
}

import { User } from "lucide-react";

type Props = {
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
};

function Avatar({ size = "medium", onClick, className = "" }: Props) {
  return (
    <div
      onClick={onClick}
      className={`rounded-full bg-secondary-background cursor-pointer ${
        size == "small" ? "p-2" : size == "large" ? "p-4" : "p-3"
      } ${className}`}
    >
      <User
        size={
          size == "small"
            ? 22
            : size == "large"
            ? Math.min(Math.max(innerWidth / 25, 25), 50)
            : 24
        }
      />
    </div>
  );
}

export default Avatar;

import { User } from "lucide-react";

type Props = {
  size?: "small" | "medium" | "large";
  onClick?: () => void;
};

function Avatar({ size = "medium", onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`rounded-full bg-secondary-background cursor-pointer ${
        size == "small" ? "p-2" : size == "large" ? "p-4" : "p-3"
      }`}
    >
      <User size={size == "small" ? 22 : size == "large" ? 30 : 24} />
    </div>
  );
}

export default Avatar;

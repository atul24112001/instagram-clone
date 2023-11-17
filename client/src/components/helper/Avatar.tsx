import { User } from "lucide-react";

type Props = {
  size?: "small" | "medium" | "large";
};

function Avatar({ size = "medium" }: Props) {
  return (
    <div
      className={`rounded-full bg-secondary-background ${
        size == "small" ? "p-2" : size == "large" ? "p-4" : "p-3"
      }`}
    >
      <User size={size == "small" ? 22 : size == "large" ? 30 : 24} />
    </div>
  );
}

export default Avatar;

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
      <User fontSize={size == "small" ? 12 : size == "large" ? 32 : 24} />
    </div>
  );
}

export default Avatar;

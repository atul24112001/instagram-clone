import { ButtonHTMLAttributes } from "react";
import Loader from "./loader/Loader";

type Props = {
  fullWidth?: boolean;
  loading?: boolean;
  variant?: "contain-primary" | "contain-secondary" | "text";
  size?: "small" | "medium" | "large";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  disabled,
  fullWidth,
  loading,
  variant = "contain-primary",
  size = "medium",
  ...rest
}: Props) {
  return (
    <button
      style={{ width: fullWidth ? "100%" : "", opacity: disabled ? 0.7 : 1 }}
      className={`${
        variant.includes("contain")
          ? `${
              variant == "contain-primary"
                ? "bg-primary-button"
                : "bg-secondary-background"
            } text-white hover:bg-primary-button-hover`
          : "transparent text-primary-button hover:text-primary-button-hover"
      } flex justify-center rounded-lg py-1 px-4 ${
        size == "small" ? "text-sm" : "text-base"
      } font-bold `}
      disabled={disabled}
      {...rest}
      onClick={(e) => {
        if (!loading && rest.onClick) {
          rest.onClick(e);
        }
      }}
    >
      {loading ? <Loader width="50" color="white" /> : children}
    </button>
  );
}

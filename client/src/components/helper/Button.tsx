import { ButtonHTMLAttributes } from "react";
import Loader from "./loader/Loader";

type Props = {
  fullWidth?: boolean;
  loading?: boolean;
  variant?: "contain" | "text";
  size?: "small" | "medium" | "large";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  disabled,
  fullWidth,
  loading,
  variant = "contain",
  size = "medium",
  ...rest
}: Props) {
  return (
    <button
      style={{ width: fullWidth ? "100%" : "", opacity: disabled ? 0.7 : 1 }}
      className={`${
        variant == "contain"
          ? "bg-primary-button text-white hover:bg-primary-button-hover"
          : "transparent text-primary-button hover:text-primary-button-hover"
      } flex justify-center rounded-lg py-1 px-4 ${
        size == "small" ? "text-sm" : "text-base"
      } `}
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

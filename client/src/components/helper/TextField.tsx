import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";

type Props = {
  border?: boolean;
  suffix?: ReactNode;
  title?: string;
  message?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ name, suffix, message, onChange, ...rest }, ref) => {
    const [value, setValue] = useState("");
    return (
      <div className="mb-2">
        <div
          style={{
            paddingTop: value.length > 0 ? "0.1rem" : "0.65rem",
            paddingBottom: value.length > 0 ? "0.1rem" : "0.65rem",
          }}
          className={`bg-secondary-background flex gap-2 mt-1 px-3 rounded-md border-[1px] border-solid border-border-primary items-center`}
        >
          <div className="flex flex-1 flex-col">
            {value.length > 0 && rest.placeholder && (
              <div
                style={{
                  fontSize: "12px",
                }}
                className="text-secondary-text"
              >
                {rest.placeholder}
              </div>
            )}
            <input
              style={{
                fontSize: value.length > 0 ? "12px" : "16px",
              }}
              className="bg-secondary-background active:bg-secondary-background w-full border-none active:outline-none focus:outline-none text-base"
              id={name}
              name={name}
              ref={ref}
              placeholder={`Enter ${name}`}
              onChange={(e) => {
                setValue(e.target.value);
                if (onChange) {
                  onChange(e);
                }
              }}
              {...rest}
            />
          </div>
          {suffix}
        </div>
        {message && (
          <div className="text-right text-red-500 opacity-80 text-sm">
            {message}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;

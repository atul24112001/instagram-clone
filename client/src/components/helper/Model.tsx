import { X } from "lucide-react";
import { PropsWithChildren } from "react";

type Props = {
  open: boolean;
  onCancel: () => void;
};

export default function Model({
  onCancel,
  open,
  children,
}: PropsWithChildren<Props>) {
  return open ? (
    <div
      onClick={onCancel}
      className="fixed z-100 top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-overlay"
    >
      <X className="absolute right-4 cursor-pointer top-4" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-secondary-background  md:rounded-lg max-h-screen  overflow-y-auto h-screen w-screen  md:h-auto md:w-5/6 lg:w-1/3 "
      >
        {children}
      </div>
    </div>
  ) : null;
}

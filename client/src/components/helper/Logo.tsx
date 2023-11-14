import { Instagram } from "lucide-react";

type Props = {
  size?: "medium" | "small" | "large";
};

export default function Logo({ size = "large" }: Props) {
  return (
    <>
      <h1
        className={`font-bold md:hidden lg:block py-4`}
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize:
            size == "large" ? "48px" : size == "medium" ? "36px" : "24px",
        }}
      >
        Instagram
      </h1>
      <div className="hidden md:block lg:hidden py-6">
        <Instagram />
      </div>
    </>
  );
}

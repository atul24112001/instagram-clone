import { useEffect } from "react";
import Posts from "./sections/Posts";
import Status from "./sections/Status";

export default function Home() {
  useEffect(() => {
    window.addEventListener("touchmove", () => {
      console.log("hello");
    });
    return () => {
      window.removeEventListener("touchmove", () => {
        console.log("hello");
      });
    };
  });

  return (
    <div
      onTouchEnd={(e) => {
        console.log(e);
      }}
      className="flex-[2] col-span-2  lg:mt-10"
    >
      <Status />
      <Posts />
    </div>
  );
}

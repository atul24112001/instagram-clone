import Posts from "./sections/Posts";
import Status from "./sections/Status";

export default function Home() {
  return (
    <div className="flex-[2] col-span-2  lg:mt-10">
      <Status />
      <Posts />
    </div>
  );
}

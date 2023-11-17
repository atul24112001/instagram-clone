import { Plus } from "lucide-react";
import Avatar from "../../helper/Avatar";

const stories: number[] = [];

export default function Status() {
  return (
    <div className="flex-[2] p-4 lg:pt-0  overflow-x-scroll ">
      <div className="flex gap-4">
        <div className="flex cursor-pointer gap-2 flex-col items-center">
          <div className="relative">
            <Avatar size="large" />
            <div className="w-4 h-4 flex justify-center items-center absolute bottom-0 right-0 bg-primary-button rounded-full text-xs">
              <Plus className="w-4" />
            </div>
          </div>
          <div className="text-xs">Your Story</div>
        </div>
        {stories.map((story) => {
          return (
            <div
              key={story}
              className="flex cursor-pointer gap-2 flex-col items-center"
            >
              <div className="relative">
                <Avatar size="large" />
              </div>
              <div className="text-xs">
                {stories.length > 10
                  ? `${stories.toString().substring(0, 7)}...`
                  : stories}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

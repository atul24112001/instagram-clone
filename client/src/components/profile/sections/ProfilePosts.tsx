import { useState } from "react";
import Post from "../../helper/Post";
import { API_URL } from "../../../apolloClient";
import { GalleryVertical, Grid } from "lucide-react";
import TabPanel from "../../helper/TabPanel";

type Props = {
  posts: Post[];
  user: User;
};
// Hello, I am a full-stack developer with 1 year of experience, looking for a new role.

export default function ProfilePosts({ posts, user }: Props) {
  const [activeTab, setActiveTab] = useState("posts");
  return (
    <div className="md:p-4 pt-0 ">
      <div className="py-3 border-t-[1px] border-b-[1px] border-primary-border flex justify-center gap-5">
        <TabPanel
          setActiveTab={setActiveTab}
          selected={activeTab == "posts"}
          prefix={<Grid size={16} />}
          tab="Posts"
        />
        <TabPanel
          setActiveTab={setActiveTab}
          selected={activeTab == "feed"}
          prefix={<GalleryVertical size={16} />}
          tab="Feed"
        />
        {/* <TabPanel
          setActiveTab={setActiveTab}
          selected={activeTab == "Saved"}
          prefix={<Bookmark size={16} />}
          tab="Saved"
        /> */}
      </div>
      {activeTab == "feed" ? (
        <div className="flex flex-col items-center">
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                assets={post.assets}
                caption={post.caption}
                user={user}
              />
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {posts.map((post) => {
            return (
              <img
                key={post.id}
                className="aspect-square"
                src={`${API_URL}/asset/${post.assets[0].id}-100`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

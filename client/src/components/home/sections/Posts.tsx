import { useSelector } from "react-redux";
import Post from "../../helper/Post";
import { RootStateType } from "../../../redux/store";

export default function Posts() {
  const posts = useSelector((state: RootStateType) => state.dataReducer.posts);
  return (
    <div className="flex-[2] flex items-center flex-col">
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            post.user && (
              <Post
                assets={post.assets}
                user={post.user}
                caption={post.caption}
              />
            )
          );
        })
      ) : (
        <div className="font-bold text-sm text-secondary-text">No Posts</div>
      )}
    </div>
  );
}

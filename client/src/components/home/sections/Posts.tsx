import Post from "../../helper/Post";

const posts: string[] = ["Name", "asdsa", "asdsa", "asdsa"];

export default function Posts() {
  return (
    <div className="flex-[2] mt-10 flex items-center flex-col">
      {posts.length > 0 ? (
        posts.map(() => {
          return <Post />;
        })
      ) : (
        <div className="font-bold text-sm text-secondary-text">No Posts</div>
      )}
    </div>
  );
}

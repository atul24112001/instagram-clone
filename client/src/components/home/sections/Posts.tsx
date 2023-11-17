import Post from "../../helper/Post";

const posts: string[] = [];

export default function Posts() {
  return (
    <div className="flex-[2] flex items-center flex-col">
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

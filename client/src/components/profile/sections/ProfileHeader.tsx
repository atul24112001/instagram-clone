import Avatar from "../../helper/Avatar";
import Button from "../../helper/Button";

type Props = {
  user: User;
  followers: number;
  following: number;
  postsCount: number;
  admin: boolean;
};

function ProfileHeader({
  user,
  followers = 0,
  following = 0,
  postsCount = 0,
  admin = false,
}: Props) {
  return (
    <>
      {" "}
      <div className="p-5 flex gap-5 items-center justify-center">
        <Avatar size="large" className="hidden md:block" />
        <div>
          <div className="flex  gap-5 items-center">
            <Avatar size="large" className="md:hidden" />
            <div className="flex flex-col md:flex-row md:items-center  gap-2">
              <div className="font-bold text-xl">{user.userName}</div>
              {admin && (
                <div className="flex gap-2">
                  <Button variant="contain-secondary" size="small">
                    Edit Profile
                  </Button>
                  <Button variant="contain-secondary" size="small">
                    View Archive
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center py-4 gap-4">
            <div className="font-semibold">
              <span className="font-bold">{postsCount}</span> post
            </div>
            <div className="font-semibold">
              <span className="font-bold">{followers}</span> followers
            </div>
            <div className="font-semibold">
              <span className="font-bold">{following}</span> following
            </div>
          </div>
          <div className="pt-1">
            <div className="font-bold">{user.name}</div>
          </div>
        </div>
      </div>
      <div className="flex md:hidden items-center justify-evenly border-t-[1px] border-primary-border py-2 gap-4">
        <div className="font-semibold">
          <span className="font-bold">{postsCount}</span> post
        </div>
        <div className="font-semibold">
          <span className="font-bold">{followers}</span> followers
        </div>
        <div className="font-semibold">
          <span className="font-bold">{following}</span> following
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;

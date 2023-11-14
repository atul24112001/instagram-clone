import { useSelector } from "react-redux";
import { RootStateType } from "../../redux/store";
import Button from "../helper/Button";
import Avatar from "../helper/Avatar";

const users = [
  {
    name: "Virat Kohli",
    email: "viratkohli@gmail.com",
  },
  {
    name: "CR7",
    email: "cristianoronaldo@gmail.com",
  },
];

function Sidebar() {
  const user = useSelector((state: RootStateType) => state.authReducer.user);
  return (
    <div className="px-4 pt-10 pb-4">
      <div className="flex items-center gap-4 mb-4">
        <Avatar />
        <div className="flex-1">
          <div className="font-bold">{user?.name}</div>
          <div className="text-secondary-text">{user?.email}</div>
        </div>
        <Button variant="text">Logout</Button>
      </div>
      <div>
        <div className="font-bold text-secondary-text">Suggested User</div>

        <div className="pt-4">
          {users.map((us) => {
            return (
              <div key={us.email} className="flex items-center gap-4 mb-4">
                <Avatar />
                <div className="flex-1">
                  <div className="font-bold">{us?.name}</div>
                  <div className="text-secondary-text text-sm">{us?.email}</div>
                </div>
                <Button size="small" variant="text">
                  Follow
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

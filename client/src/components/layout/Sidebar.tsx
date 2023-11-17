import { useSelector } from "react-redux";
import { RootStateType } from "../../redux/store";
import Button from "../helper/Button";
import ListItem from "../helper/ListItem";

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
      {user && <ListItem title={user.name} subTitle={user.email} />}
      <div>
        <div className="font-bold text-secondary-text">Suggested User</div>
        <div className="pt-4">
          {users.map((us) => {
            return (
              <ListItem
                subTitle={
                  us?.email.length > 10
                    ? `${us?.email?.substring(0, 9)}...`
                    : us?.email
                }
                title={us?.name}
                key={us.email}
                tail={
                  <Button size="small" variant="text">
                    Follow
                  </Button>
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

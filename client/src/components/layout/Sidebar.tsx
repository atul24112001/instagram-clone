import { useSelector } from "react-redux";
import { RootStateType } from "../../redux/store";
import Button from "../helper/Button";
import ListItem from "../helper/ListItem";

function Sidebar() {
  const user = useSelector((state: RootStateType) => state.authReducer.user);
  const suggestedUsers = useSelector(
    (state: RootStateType) => state.dataReducer.suggestedUsers
  );

  return (
    <div className="px-4 pt-10 pb-4">
      {user && <ListItem title={user.userName} subTitle={user.name} />}
      {suggestedUsers.length > 0 && (
        <div>
          <div className="font-bold text-secondary-text">Suggested User</div>
          <div className="pt-4">
            {suggestedUsers.map((us) => {
              return (
                <ListItem
                  subTitle={
                    us.userName
                    // us?.email.length > 10
                    //   ? `${us?.email?.substring(0, 9)}...`
                    //   : us?.email
                  }
                  title={us?.name}
                  key={us.id}
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
      )}
    </div>
  );
}

export default Sidebar;

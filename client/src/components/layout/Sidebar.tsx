import { useSelector } from "react-redux";
import { RootStateType } from "../../redux/store";
import Button from "../helper/Button";
import ListItem from "../helper/ListItem";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const user = useSelector((state: RootStateType) => state.authReducer.user);
  const suggestedUsers = useSelector(
    (state: RootStateType) => state.dataReducer.suggestedUsers
  );

  const navigate = useNavigate();

  return (
    <div className="px-4 pt-10 pb-4">
      {user && (
        <ListItem
          onClick={() => {
            navigate(user.userName);
          }}
          title={user.userName}
          subTitle={user.name}
        />
      )}
      {suggestedUsers.length > 0 && (
        <div>
          <div className="font-bold text-secondary-text">Suggested User</div>
          <div className="pt-4">
            {suggestedUsers.map((us) => {
              return (
                <ListItem
                  subTitle={us.userName}
                  onClick={() => {
                    navigate(us.userName);
                  }}
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

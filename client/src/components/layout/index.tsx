import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import Logo from "../helper/Logo";
import { NavLink } from "react-router-dom";
import { Heart, HomeIcon, Plus, Search, User } from "lucide-react";
import Sidebar from "./Sidebar";
import CreatePost from "../create-post/CreatePost";
import Model from "../helper/Model";
import { useLazyQuery } from "@apollo/client";
import { INITIAL_DATA } from "../../graphql/authenticated";
import Loader from "../helper/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, addSuggestedUsers } from "../../redux/data/dataSlice";
import { RootStateType } from "../../redux/store";

const rootVariables: { [key: string]: string } = {
  "--primary-background": "0, 0, 0",
  "--secondary-background": "38, 38, 38",
  "--primary-text": "255, 255, 255",
  "--primary-border": "50, 50, 50",
  "--overlay": "0, 0, 0, 0.4",
};

export default function Layout({ children }: PropsWithChildren) {
  const [getInitialData, { data, loading }] = useLazyQuery(INITIAL_DATA);
  const isAuthenticated = useSelector(
    (state: RootStateType) => state.authReducer.isAuthenticated
  );

  const [openCreatePostModel, setOpenCreatePostModel] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    document.title = "Instagram";
    console.log("setting root variables", isAuthenticated);
    if (isAuthenticated) {
      for (const key in rootVariables) {
        document.documentElement.style.setProperty(
          key,
          rootVariables[key] ?? ""
        );
      }
      getInitialData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!loading && data?.getInitialData) {
      dispatch(addPosts(data?.getInitialData.posts));
      dispatch(addSuggestedUsers(data?.getInitialData.suggestedUsers));
    }
  }, [loading]);

  const toggleCreatePostForm = () => {
    setOpenCreatePostModel(false);
  };

  const routes = useMemo(() => {
    return [
      {
        title: "Home",
        Icon: HomeIcon,
        url: "/",
      },
      {
        title: "Search",
        Icon: Search,
        url: "/search",
      },
      {
        title: "Create",
        Icon: Plus,
        onClick: () => {
          setOpenCreatePostModel(true);
        },
      },
      {
        title: "Notifications",
        Icon: Heart,
        url: "/notifications",
      },
      {
        title: "Profile",
        Icon: User,
        url: "/profile",
      },
    ];
  }, []);

  return isAuthenticated ? (
    <div className="bg-primary-background h-screen w-screen flex flex-col md:flex-row pb-8 md:pb-0">
      <div className="hidden md:block w-1/10 lg:w-1/6 border-r-[1px] border-solid  px-2 py-4 border-primary-border">
        <div className="px-4">
          <Logo size="small" />
        </div>
        <div className="mt-4">
          {routes.map((route) => {
            const { Icon, title, url, onClick } = route;
            if (!url && onClick) {
              return (
                <div
                  className={`flex items-center gap-3 hover:bg-[#cccccc30] cursor-pointer mb-4 px-4 py-2 rounded-md`}
                  key={title}
                  onClick={onClick}
                >
                  <Icon /> <span className="hidden lg:inline">{title}</span>
                </div>
              );
            }
            return (
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 hover:bg-[#cccccc30] cursor-pointer mb-4 px-4 py-2 rounded-md ${
                    isActive ? "font-bold bg-[#cccccc30]" : ""
                  }`
                }
                key={title}
                to={url}
              >
                {({ isActive }) => (
                  <>
                    <Icon strokeWidth={isActive ? 2.5 : undefined} />{" "}
                    <span className="hidden lg:inline">{title}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-3">
        {loading ? (
          <div className="flex-[2] col-span-2  lg:mt-10">
            <Loader />
          </div>
        ) : (
          children
        )}
        <div className="hidden lg:block flex-1">
          <Sidebar />
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-primary-background  flex justify-evenly items-center border-t-[1px] border-solid  border-primary-border ">
        {routes.map((route) => {
          const { Icon, title, url, onClick } = route;
          if (!url && onClick) {
            return (
              <div
                className={
                  "flex items-center gap-3 hover:bg-[#cccccc30] cursor-pointer p-3 rounded-md"
                }
                key={title}
                onClick={onClick}
              >
                <Icon /> <span className="hidden lg:inline">{title}</span>
              </div>
            );
          }

          return (
            <NavLink
              className={
                "flex items-center gap-3 hover:bg-[#cccccc30] cursor-pointer p-3 rounded-md"
              }
              key={title}
              to={url ?? ""}
            >
              {({ isActive }) => (
                <>
                  <Icon strokeWidth={isActive ? 2.5 : undefined} />
                  <span className="hidden lg:inline">{title}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      <Model onCancel={toggleCreatePostForm} open={openCreatePostModel}>
        <CreatePost onDone={toggleCreatePostForm} />
      </Model>
    </div>
  ) : (
    <>{children}</>
  );
}

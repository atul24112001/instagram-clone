import {
  ChangeEvent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import { useSelector } from "react-redux";
// import { RootStateType } from "../../redux/store";
import Logo from "../helper/Logo";
// import routes from "./navigations.routes";
import { NavLink } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  HomeIcon,
  Plus,
  Search,
  Upload,
  User,
} from "lucide-react";
import Model from "../helper/Model";
import Button from "../helper/Button";

const rootVariables: { [key: string]: string } = {
  "--primary-background": "0, 0, 0",
  "--secondary-background": "38, 38, 38",
  "--primary-text": "255, 255, 255",
  "--primary-border": "50, 50, 50",
  "--overlay": "0, 0, 0, 0.4",
};

export default function Layout({ children }: PropsWithChildren) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [openCreatePostModel, setOpenCreatePostModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // const user = useSelector((state: RootStateType) => state.authReducer.user);

  useEffect(() => {
    document.title = "Instagram";
    for (const key in rootVariables) {
      document.documentElement.style.setProperty(key, rootVariables[key] ?? "");
    }
  }, []);

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
        url: "/",
      },
      {
        title: "Profile",
        Icon: User,
        url: "/profile",
      },
    ];
  }, []);

  const chooseFileHandler = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const selectedFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Assuming you want to display the image as a base64-encoded URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-primary-background h-screen w-screen flex flex-col md:flex-row">
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
                <Icon /> <span className="hidden lg:inline">{title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="flex-1 "> {children}</div>
      <div className="md:hidden  flex justify-evenly items-center border-t-[1px] border-solid  border-primary-border ">
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
              <Icon /> <span className="hidden lg:inline">{title}</span>
            </NavLink>
          );
        })}
      </div>

      <Model
        onCancel={() => {
          setOpenCreatePostModel(false);
        }}
        open={openCreatePostModel}
      >
        <div className="border-b-[1px] p-2 border-solid border-primary-border flex justify-between items-center">
          {selectedImage ? (
            <>
              <ArrowLeft
                className="cursor-pointer"
                onClick={() => {
                  setSelectedImage(null);
                }}
              />
              <Button variant="text">Next</Button>
            </>
          ) : (
            <div className="font-bold text-xl text-center flex-1">
              Create new post
            </div>
          )}
        </div>
        <div className="p-4 flex justify-center flex-col gap-4 items-center">
          {selectedImage ? (
            <img src={selectedImage} />
          ) : (
            <>
              <Upload />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={selectedFileHandler}
              />
              <Button onClick={chooseFileHandler}>Choose File</Button>
            </>
          )}
        </div>
      </Model>
    </div>
  );
}

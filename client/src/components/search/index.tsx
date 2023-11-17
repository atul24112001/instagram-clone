import { Search as SearchIcon, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Loader from "../helper/loader/Loader";
import { User } from "../../redux/auth/authSlice";
import ListItem from "../helper/ListItem";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<User[]>([]);

  useEffect(() => {
    if (searchText.trim()) {
      (async () => {
        setSearching(true);
        setResults([]);
        setTimeout(() => {
          setSearching(false);
        }, 5000);
      })();
    }
  }, [searchText]);

  const history = useMemo(() => {
    const cachedHistory = localStorage.getItem("search");
    if (cachedHistory) {
      const target = JSON.parse(cachedHistory);
      if (Array.isArray(target)) return target;
    }
    return [];
  }, []);

  return (
    <div className="col-span-2 p-2 md:p-4 pt-5 lg:mt-7">
      <div className="bg-secondary-background items-center rounded-lg flex  px-4 py-1">
        <input
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
          placeholder="Search"
          className="w-full placeholder:text-secondary-text bg-transparent hover:outline-0 active:outline-0 focus:outline-0"
        />
        <SearchIcon size={18} className="" color="rgb(var(--secondary-text))" />
      </div>
      {searching ? (
        <div className="mt-3">
          <Loader width="100" color="rgb(var(--primary-button))" />
        </div>
      ) : (history.length == 0 && !searchText) || results.length == 0 ? (
        <div className="mt-5 text-sm text-secondary-text text-center">
          No data
        </div>
      ) : !searchText ? (
        <div className="pt-4 px-1">
          {history.map((user) => {
            return (
              <ListItem
                title={user.name}
                subTitle={user.email}
                size="small"
                tail={
                  <div className="pr-2">
                    <X size={18} className="cursor-pointer " />
                  </div>
                }
              />
            );
          })}
        </div>
      ) : (
        <div className="pt-4 px-1">
          {results.map((user) => {
            return (
              <ListItem title={user.name} subTitle={user.email} size="small" />
            );
          })}
        </div>
      )}
    </div>
  );
}

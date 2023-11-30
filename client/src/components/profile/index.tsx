import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootStateType } from "../../redux/store";
import { useLazyQuery } from "@apollo/client";
import { GET_PROFILE } from "../../graphql/authenticated";
import Loader from "../helper/loader/Loader";
import ProfileHeader from "./sections/ProfileHeader";
import ProfilePosts from "./sections/ProfilePosts";
import { setProfileDetails } from "../../redux/data/dataSlice";

export default function Profile() {
  const [admin, setAdmin] = useState(true);
  const [loadingLocal, setLoadingLocal] = useState(true);

  const viewer = useSelector((state: RootStateType) => state.authReducer.user);
  const profileDetails = useSelector(
    (state: RootStateType) => state.dataReducer.profileDetails
  );

  const dispatch = useDispatch();

  const [getProfileDetails, { loading, data, error, refetch }] = useLazyQuery(
    GET_PROFILE,
    {
      fetchPolicy: "no-cache",
    }
  );

  const { userName } = useParams();
  const encodedParam = encodeURIComponent(userName ?? "");

  useEffect(() => {
    if (encodedParam && encodedParam !== viewer?.userName) {
      setAdmin(false);
      getProfileDetails({
        variables: {
          userName: encodedParam,
        },
      });
    } else {
      getProfileDetails({
        variables: {
          userName: viewer?.userName,
        },
        fetchPolicy: "no-cache",
      });
    }
    setLoadingLocal(false);
    return () => {
      setAdmin(true);
    };
  }, [encodedParam]);

  useEffect(() => {
    if (admin && !loading && !error && data?.getProfile) {
      if (!profileDetails) {
        dispatch(setProfileDetails(data.getProfile));
      }
    }
  }, [loading, data, error, admin]);

  useEffect(() => {
    if (
      admin &&
      profileDetails &&
      data?.getProfile &&
      profileDetails.posts.length != data?.getProfile.posts.length
    ) {
      refetch({
        variables: {
          userName: admin ? encodedParam : viewer?.userName,
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [profileDetails?.posts.length, data, admin]);

  console.log(admin);
  return loadingLocal || loading || !data?.getProfile ? (
    <div className="col-span-2 pt-5">
      <Loader width="150" />
    </div>
  ) : (
    <div className="col-span-3 lg:col-span-2">
      <ProfileHeader
        followers={data.getProfile.followersCount}
        following={data.getProfile.followingCount}
        postsCount={data.getProfile.postsCount}
        user={data.getProfile.user}
        admin={admin}
      />
      <ProfilePosts user={data.getProfile.user} posts={data.getProfile.posts} />
    </div>
  );
}

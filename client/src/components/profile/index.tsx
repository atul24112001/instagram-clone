// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { RootStateType } from "../../redux/store";
// import { useLazyQuery } from "@apollo/client";
// import { GET_PROFILE } from "../../graphql/authenticated";

export default function Profile() {
  // const [admin, setAdmin] = useState(true);
  // const [loadingLocal, setLoadingLocal] = useState(true);

  // const viewer = useSelector((state: RootStateType) => state.authReducer.user);

  // const [getProfileDetails, { loading, error, data }] = useLazyQuery(
  //   GET_PROFILE,
  //   {
  //     variables: {
  //       userName: viewer?.userName,
  //     },
  //   }
  // );

  // const params = useParams();

  // useEffect(() => {
  //   if (params.userName && params.userName !== viewer?.userName) {
  //     setAdmin(false);
  //     // getProfileDetails();
  //   }
  // }, []);

  // console.log(admin);
  return <div className="col-span-2">Profile - {}</div>;
}

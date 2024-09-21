import React, { useEffect, useState, useContext } from "react";
import AuthenticationContext from "../../../utils/AuthenticationProvider";
import { useQuery } from "@tanstack/react-query";
import { auth } from "../api/auth";

function GoogleLogin() {
  const { accessToken } = useContext(AuthenticationContext);
  const [userInfo, setUserInfo] = useState(null);

  // Query to fetch user info based on accessToken
  const userInfoQuery = useQuery({
    queryKey: ["userInfo", accessToken],
    queryFn: () => auth.getGoogleUserInfo({ access_token: accessToken }),
    enabled: !!accessToken, // Only run query if accessToken is available
    refetchOnWindowFocus: false,
    retry: 0,
  });

  useEffect(() => {
    if (userInfoQuery.data) {
      setUserInfo(userInfoQuery.data.user_info);
    }
  }, [userInfoQuery.data]);

  if (userInfoQuery.isLoading) return <h1>LOADING</h1>;
  if (userInfoQuery.isError) return <h1>{JSON.stringify(userInfoQuery.error.message)}</h1>;

  return (
    <>
      {userInfo && (
        <>
          <h2>Name: {userInfo.name}</h2>
          <h2>Email: {userInfo.email}</h2>
        </>
      )}
    </>
  );
}

export default GoogleLogin;

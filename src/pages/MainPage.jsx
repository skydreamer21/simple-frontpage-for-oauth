import { useState } from "react";
import rootReducer from "../reducers";
import { useSelector, useDispatch } from "react-redux";
import { memberLogin, memberLogout } from "../reducers/memberReducer";
import axios from "axios";

const MainPage = () => {
  const dispatch = useDispatch();
  const memberName = useSelector((state) => state.memberReducer.memberName);
  const accessToken = useSelector((state) => state.memberReducer.accessToken);
  const refreshToken = useSelector((state) => state.memberReducer.refreshToken);
  const devBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const API_PREFIX = devBaseUrl + "/api/v1";
  const EXPIRED_ERROR_CODE = "ERR_AUTH_005";
  const AUTHORIZATION_HEADER = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const INVALID_AUTHORIZATION_HEADER = {
    headers: {
      Authorization: `Beare ${accessToken}`,
    },
  };

  const EMPTY_AUTHORIZATION_HEADER = {
    headers: {
      Authorization: "",
    },
  };
  const EMPTY_HEADER = {
    headers: {
    },
  };

  console.log(accessToken);

  function handleLogin() {
    window.location.href = devBaseUrl+ "/security/oauth2/authorization/kakao";
  }

  function handleTest() {
    axios
      .get("http://localhost:8080/api/v1/members/test", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.response.data);
        const errorCode = error.response.data.results.errorCode;
        if (errorCode === EXPIRED_ERROR_CODE) {
          requestRefreshToken();
        }
      });
  }

  function requestRefreshToken() {
    axios
      .post(
        API_PREFIX + "/auth/re-issue",
        {
          refreshToken: refreshToken,
        },
        AUTHORIZATION_HEADER
      )
      .then(({ data }) => {
        console.log(data);
        const result = data.results;
        dispatch(
          memberLogin(result.memberId, result.accessToken, result.refreshToken)
        );
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  function handleLogout() {
    axios
      .post(
        API_PREFIX + "/auth/logout",
        {},
        AUTHORIZATION_HEADER
      )
      .then(({ data }) => {
        console.log(data);
        dispatch(
          memberLogout()
        );
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  function handleSamplePostAPI() {
    axios.post(
      API_PREFIX + "/sample",
      {}
    )
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.response.data);
    })
  }

  function handleSampleErrorAPI() {
    axios.get(
      API_PREFIX + "/sample/error",
    )
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.response.data);
    })
  }

  function handleAuthReqAPI() {
    axios.get(
      API_PREFIX + "/sample-auth",
      AUTHORIZATION_HEADER
    )
    .then((data) => {
      console.log(data);
    })
    .catch(({response}) => {
      console.log(response.data);
    })
  }

  function handleReIssueAPI() {
    axios.post(
      API_PREFIX + "/auth/reissue",
      {
        refreshToken: refreshToken,
      },
    )
    .then(({data}) => {
      console.log(data);
    })
    .catch(({response}) => {
      console.log(response.data);
    })
  }

  return (
    <div>
      <h1>Main Page 입니다.</h1>
      {memberName && <div>안녕하세요 {memberName}님</div>}
      {memberName ? (
        <div>
          <div onClick={handleLogout}>Logout</div>
          <div onClick={handleTest}>test</div>
        </div>
      ) : (
        <div onClick={handleLogin}>Login</div>
      )}
      <div onClick={handleSamplePostAPI}>testPostAPI</div>
      <div onClick={handleSampleErrorAPI}>testErrorAPI</div>
      <div onClick={handleAuthReqAPI}>testAuthReqAPI</div>
      <div onClick={handleReIssueAPI}>testReIssueAPI</div>
    </div>
  );
};

export default MainPage;
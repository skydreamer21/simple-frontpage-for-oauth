import { useState } from "react";
import rootReducer from "../reducers";
import { useSelector, useDispatch } from "react-redux";
import { memberLogin } from "../reducers/memberReducer";
import axios from "axios";

const MainPage = () => {
    const dispatch = useDispatch();
    const memberId = useSelector((state) => state.memberReducer.memberId);
    const accessToken = useSelector((state) => state.memberReducer.accessToken);
    const BASE_URL = "http://localhost:8080";
    const API_PREFIX = BASE_URL + "/api/v1";
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

    console.log(accessToken);

    function handleLogin() {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";
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
            .post(API_PREFIX + "/auth/re-issue", {}, AUTHORIZATION_HEADER)
            .then(({ data }) => {
                console.log(data);
                const result = data.results;
                dispatch(
                    memberLogin(
                        result.memberId,
                        result.accessToken,
                        result.refreshToken
                    )
                );
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    function handleLogout() {
        axios
            .post(
                "http://localhost:8080/api/v1/members/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then(({ data }) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Main Page 입니다.</h1>
            {memberId && <div>안녕하세요 {memberId}님</div>}
            {memberId ? (
                <div>
                    <div onClick={handleLogout}>Logout</div>
                    <div onClick={handleTest}>test</div>
                </div>
            ) : (
                <div onClick={handleLogin}>Login</div>
            )}
        </div>
    );
};

export default MainPage;

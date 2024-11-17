import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { memberLogin } from "../reducers/memberReducer";
import { useDispatch } from "react-redux";

// param navigate : https://songacoding.tistory.com/73

const LoginSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const authToken = searchParams.get("token");
  const provider = searchParams.get("provider");
  // console.log(searchParams);
  console.log(provider)

  const devBaseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .post(devBaseUrl+"/api/v1/auth", {
        authToken: authToken,
        oauthProvider: provider,
      })
      .then(({data}) => {
        console.log(data);
        const memberId = data.memberId
        if (data.isNewMember) {
          navigate("/", {
            state: {
              memberId: memberId,
            },
          });
        } else {
          const result = data;
          dispatch(
            memberLogin(
              result.memberId,
              result.memberName,
              result.accessToken,
              result.refreshToken
            )
          );
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div>
      <h1>소셜 로그인 중입니다.</h1>
      <p>{authToken ? authToken : "로그인 중이 아닙니다."}</p>
    </div>
  );
};

export default LoginSuccess;

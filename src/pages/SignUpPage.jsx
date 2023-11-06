import { useState } from "react";
import InputComp from "../components/InputComp";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { memberLogin } from "../reducers/memberReducer";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [birthYear, setBirthYear] = useState();
  const [height, setHeight] = useState(0);
  const [gender, setGender] = useState();
  const [weight, setWeight] = useState();

  const { state } = useLocation();
  console.log(state);
  const memberId = state.memberId;

  function handleSubmit() {
    axios
      .put("http://localhost:8080/api/v1/members/register", {
        memberId: memberId,
        birthYear: birthYear,
        gender: gender,
        height: height,
        weight: weight,
      })
      .then(({ data }) => {
        console.log(data);
        const result = data.results;
        dispatch(
          memberLogin(result.memberId, result.accessToken, result.refreshToken)
        );
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>SignUp Page 입니다.</h1>
      <h2>Birth Year</h2>
      <InputComp
        callback={(e) => {
          console.log(e.target.value);
          setBirthYear(e.target.value);
        }}
        placeholder="생년월일을 입력해주세요."
      />
      <h2>Gender</h2>
      <InputComp
        callback={(e) => setGender(e.target.value)}
        placeholder="성별을 M 또는 F로 입력해주세요."
      />
      <h2>Height</h2>
      <InputComp
        callback={(e) => setHeight(e.target.value)}
        placeholder="자신의 키를 입력해주세요."
      />
      <h2>Weight</h2>
      <InputComp
        callback={(e) => setWeight(e.target.value)}
        placeholder="자신의 몸무게를 입력해주세요."
      />
      <div onClick={handleSubmit}>submit</div>
    </div>
  );
};

export default SignUpPage;

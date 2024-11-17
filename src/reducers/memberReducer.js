// action Type 정의
const LOGIN = "MEMBER/LOGIN";
const LOGOUT = "MEMBER/LOGOUT";

// action 생성 함수 정의
const memberLogin = (memberId, memberName, accessToken, refreshToken) => ({
  type: LOGIN,
  memberId,
  memberName,
  accessToken,
  refreshToken,
});

const memberLogout = () => ({
  type: LOGOUT,
});

// 리덕스에서 관리할 상태 정의
const initialState = {
  isLogin: false,
  memberId: undefined,
  memberName: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

function memberReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        memberId: action.memberId,
        memberName: action.memberName,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        memberId: undefined,
        memberName: undefined,
        accessToken: undefined,
        refreshToken: undefined,
      };
    default:
      return state;
  }
}

export { LOGIN, LOGOUT, memberLogin, memberLogout, memberReducer };

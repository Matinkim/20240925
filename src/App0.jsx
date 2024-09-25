import { useEffect, useReducer } from "react";
import { SUCCESS, ERROR, LOADING } from "./const";
import "./App.css";

function App() {
  const initState = {
    //api를 호출 했을때 로딩 유무
    loading: false,
    //api를 호출 했을때 에러 확인
    error: null,
    //api를 호출 했을때 데이터 넣기
    data: null,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  useEffect(() => {
    //비동기함수 async
    async function getUSer() {
      dispatch({ type: LOADING });
      try {
        const response = await fetch("https://api.github.com/users/MatinKim", {
          headers: {
            Authorization: `token ${token}`,
            "User-Agent": "MatinKim",
          },
        });
        const data = await response.json();
        dispatch({ type: SUCCESS, data: data });
      } catch (e) {
        dispatch({ type: ERROR, error: e.message });
      }
    }
    getUSer();
  }, []);
  // 3가지 액션 생성
  // LOADING : 데이터를 가져오는 중
  // SUCCESS : 데이터를 가져오는데 성공
  // ERROR : 데이터를 가져오는데 실패
  function reducer(state, action) {
    switch (action.type) {
      case SUCCESS:
        return { ...state, loading: false, data: action.data };
      case LOADING:
        return { ...state, loading: true, error: null };
      case ERROR:
        return { ...state, error: action.error, loading: false };
      default:
        throw new Error("에러");
    }
  }

  return (
    <div>
      <h2>깃 허브 가져오기</h2>
      {/*현재 상태가 로딩 중일때 */}
      {state.loading && <p>로딩중...</p>}
      {/*에러가 존재 할때  */}
      {state.error && <p>{state.error}</p>}
      {/*로딩중이 아니고 에러도 존재하지 않고 데이터가 존재 할때  */}
      {!state.loading && !state.error && state.data && (
        <>
          <img src={state.data.avatar_url} alt="profile" />
          <p>이름 :{state.data.login}</p>
          <p>팔로워:{state.data.followers}</p>
          <p>팔로우:{state.data.following}</p>
          <p>레퍼지토리</p>
        </>
      )}
    </div>
  );
}

export default App;

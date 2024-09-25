import { useEffect, useReducer } from "react";
import { SUCCESS, ERROR, LOADING } from "./const";
import "./App.css";

function App() {
  const initState = {
    loading: false,
    error: null,
    data: null,
    repos: [], // 레포지토리 상태 추가
  };

  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    async function getUser() {
      dispatch({ type: LOADING });
      try {
        const token = import.meta.env.VITE_GITHUB_API_KEY;

        // 사용자 정보 가져오기
        const userResponse = await fetch(
          "https://api.github.com/users/MatinKim",
          {
            headers: {
              Authorization: `token ${token}`,
              "User-Agent": "MatinKim",
            },
          }
        );
        const userData = await userResponse.json();
        dispatch({ type: SUCCESS, data: userData });

        // 레포지토리 정보 가져오기
        const reposResponse = await fetch(
          "https://api.github.com/users/MatinKim/repos?sort=created",
          {
            headers: {
              Authorization: `token ${token}`,
              "User-Agent": "MatinKim",
            },
          }
        );
        const reposData = await reposResponse.json();
        dispatch({ type: SUCCESS, repos: reposData }); // 레포지토리 정보 디스패치
      } catch (e) {
        dispatch({ type: ERROR, error: e.message });
      }
    }

    getUser();
  }, []);

  function reducer(state, action) {
    switch (action.type) {
      case SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data || state.data,
          repos: action.repos ? action.repos : state.repos,
        };
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
      {state.loading && <p>로딩중...</p>}
      {state.error && <p>{state.error}</p>}
      {!state.loading && !state.error && state.data && (
        <>
          <img src={state.data.avatar_url} alt="profile" />
          <p>이름: {state.data.login}</p>
          <p>팔로워: {state.data.followers}</p>
          <p>팔로우: {state.data.following}</p>
          <h3>레포지토리</h3>
          <div className="hwan">
            {state.repos.map((repo) => (
              <button key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>{" "}
                {repo.description}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

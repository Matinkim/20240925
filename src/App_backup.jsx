import { useState, useReducer } from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);
  // 두개의 인수를 받음
  // 첫번째 : 상태변경을 처리하는 함수
  // 두번째 : 초기상태
  // state : 현재 상태
  // dispatch : 특정 액션을 실행해서 상태를 업데이트 하는 함수 ( 액션전달)
  const initState = { value: 0 };
  const [state, dispatch] = useReducer(reducer, initState);
  function reducer(state, action) {
    // 첫번째 parameter : 현재 상태
    // 두번째 parameter : 액션 객체
    switch (action.type) {
      case "INCREMENT":
        console.log(action.name);
        return { value: state.value + 1 };
      case "DECREMENT":
        console.log(action.xxx);
        return { value: state.value - 1 };
      default:
        throw new Error("정의 되지 않은 액션");
    }
  }
  return (
    <>
      <div>hello world</div>
      <h2>카운트 :{state.value}</h2>
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT", name: "park" });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch({ type: "DECREMENT", xxx: "김호나" });
        }}
      >
        -
      </button>
    </>
  );
}

export default App;

export const HIDE_ERROR = "에러 숨김";

export const hideError = () => {
  return { type: HIDE_ERROR };
};

const initialState = {
  error: null,
  isOpen: false,
};

// 페이로드에 error 가 포함되어있으면 해당 리덕스 error 상태에 그대로 전달
export function errorReducer(state = initialState, { error, type }) {
  if (error) {
    return {
      error,
      isOpen: true,
    };
  } else if (type === HIDE_ERROR) {
    return {
      error: null,
      isOpen: false,
    };
  }

  return state;
}

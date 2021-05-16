import axios from "axios";
const BASE_URL = "https://problem.comento.kr";

const FETCH_CATEGORY = "카테고리 정보 요청";
const FETCH_CATEGORY_SUCCESS = "카테고리 정보 요청 성공";
const FETCH_CATEGORY_FAILURE = "카테고리 정보 요청 실패";

export const fetchCategory = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORY });
  try {
    const res = await axios.get(`${BASE_URL}/api/category`);
    if (res.status === 200) {
      dispatch({ type: FETCH_CATEGORY_SUCCESS, category: res.data.category });
    } else {
      dispatch({
        type: FETCH_CATEGORY_FAILURE,
        error: res.message,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_CATEGORY_FAILURE,
      error: err.message || "카테고리 정보를 요청하는중 에러가 발생했습니다",
    });
  }
};

const initialState = {
  isLoading: false,
  error: null,
  category: null,
};

export const feedCategoryReducer = (
  state = initialState,
  { type, category, error }
) => {
  switch (type) {
    case FETCH_CATEGORY:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        category,
        isLoading: false,
      };

    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};

import axios from "axios";
const BASE_URL = "https://problem.comento.kr";

const FETCH_FEED = "피드 정보 요청";
const FETCH_FEED_SUCCESS = "피드 정보 요청 성공";
const FETCH_FEED_FAILURE = "피드 정보 요청 실패";

export const fetchFeed = () => async (dispatch) => {
  dispatch({ type: FETCH_FEED });
  try {
    const res = await axios.get(`${BASE_URL}/api/list`, {
      params: {
        page: 1,
        ord: "asc",
        limit: 10,
        category: [1, 2, 3],
      },
    });
    if (res.status === 200) {
      dispatch({ type: FETCH_FEED_SUCCESS, feeds: res.data });
    } else {
      dispatch({
        type: FETCH_FEED_FAILURE,
        error: res.message,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_FEED_FAILURE,
      error: err.message || "피드 정보를 요청하는중 에러가 발생했습니다",
    });
  }
};

const initialState = {
  feeds: null,
  isLoading: false,
  error: null,
};

export const feedAllReducer = (
  state = initialState,
  { type, feeds, error }
) => {
  switch (type) {
    case FETCH_FEED:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_FEED_SUCCESS:
      return {
        ...state,
        feeds,
        isLoading: false,
      };

    case FETCH_FEED_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};

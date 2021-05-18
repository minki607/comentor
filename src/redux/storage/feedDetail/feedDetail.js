import axios from "axios";
const BASE_URL = "https://problem.comento.kr";

const FETCH_FEED_DETAIL = "피드 상세 정보 요청";
const FETCH_FEED_DETAIL_SUCCESS = "피드 상세 정보 요청 성공";
const FETCH_FEED_DETAIL_FAILURE = "피드 상세 정보 요청 실패";

// 피드 상세 정보 요청
export const fetchFeedDetail = (id) => async (dispatch) => {
  dispatch({ type: FETCH_FEED_DETAIL });
  try {
    const res = await axios.get(`${BASE_URL}/api/view`, {
      params: {
        id,
      },
    });
    if (res.status === 200) {
      dispatch({ type: FETCH_FEED_DETAIL_SUCCESS, feed: res.data.data });
    } else {
      dispatch({
        type: FETCH_FEED_DETAIL_FAILURE,
        error: res.message,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_FEED_DETAIL_FAILURE,
      error: err.message || "피드 상세 정보를 요청하는중 에러가 발생했습니다",
    });
  }
};

const initialState = {
  feed: null,
  isLoading: false,
  error: null,
};

export const feedDetailReducer = (
  state = initialState,
  { type, feed, error }
) => {
  switch (type) {
    case FETCH_FEED_DETAIL:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_FEED_DETAIL_SUCCESS:
      return {
        ...state,
        feed,
        isLoading: false,
      };

    case FETCH_FEED_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};

import axios from "axios";
const BASE_URL = "https://problem.comento.kr";
const FETCH_FEED = "피드 정보 요청";
const FETCH_FEED_SUCCESS = "피드 정보 요청 성공";
const FETCH_FEED_FAILURE = "피드 정보 요청 실패";

const FETCH_MORE_FEED = "피드 정보 더 요청";
const FETCH_MORE_FEED_SUCCESS = "피드 정보 더 요청 성공";
const FETCH_MORE_FEED_FAILURE = "피드 정보 더 요청 실패";

// 피드 정보 요청
export const fetchFeed = () => async (dispatch, prevState) => {
  const { feedOption } = prevState();
  dispatch({ type: FETCH_FEED });
  try {
    const res = await axios.get(`${BASE_URL}/api/list`, {
      params: {
        page: 1,
        ord: feedOption.order,
        limit: 10,
        // 피드 옵션 정보의 선택된 카테고리를 정보가 있으면 아이디만 params로 전달 없으면 전체 카테고리 전달
        category: feedOption.selectedCategory
          ? feedOption.selectedCategory.map((category) => category.id)
          : [1, 2, 3],
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

// 피드 정보 더 요청
export const fetchMoreFeed = () => async (dispatch, prevState) => {
  const { feedAll, feedOption } = prevState();
  // 더 요청할 피드 정보가 없다면 아무작업도 하지 않음
  if (feedAll.feeds && !feedAll.feeds.next_page_url) return;
  dispatch({ type: FETCH_MORE_FEED });
  try {
    const res = await axios.get(`${BASE_URL}/api/list`, {
      params: {
        page: feedAll.page + 1,
        ord: feedOption.order,
        limit: 10,
        category: feedOption.selectedCategory
          ? feedOption.selectedCategory.map((category) => category.id)
          : [1, 2, 3],
      },
    });
    if (res.status === 200) {
      dispatch({ type: FETCH_MORE_FEED_SUCCESS, feeds: res.data });
    } else {
      dispatch({
        type: FETCH_MORE_FEED_FAILURE,
        error: res.message,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_MORE_FEED_FAILURE,
      error: err.message || "피드 정보를 더 요청하는중 에러가 발생했습니다",
    });
  }
};

const initialState = {
  feeds: null,
  isLoading: false,
  isLoadingMore: false,
  error: null,
  page: 1,
  limit: 10,
  category: null,
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
        page: 1,
      };

    case FETCH_FEED_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    case FETCH_MORE_FEED:
      return {
        ...state,
        isLoadingMore: true,
      };

    case FETCH_MORE_FEED_SUCCESS:
      return {
        ...state,
        isLoadingMore: false,
        feeds: {
          ...feeds,
          data: [...state.feeds.data, ...feeds.data],
        },
        page: state.page + 1,
      };

    case FETCH_MORE_FEED_FAILURE:
      return {
        ...state,
        isLoadingMore: false,
        error,
      };

    default:
      return state;
  }
};

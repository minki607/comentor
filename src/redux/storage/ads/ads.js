import axios from "axios";
const BASE_URL = "https://problem.comento.kr";

const FETCH_ADS = "광고 보기";
const FETCH_ADS_SUCCESS = "광고 정보 요청 성공";
const FETCH_ADS_FAILURE = "광고 정보 요청 실패";

const FETCH_MORE_ADS = "광고 정보 더 요청";
const FETCH_MORE_ADS_SUCCESS = "광고 정보 더 요청 성공";
const FETCH_MORE_ADS_FAILURE = "광고 정보 더 요청 실패";

export const fetchAds = () => async (dispatch) => {
  dispatch({ type: FETCH_ADS });
  try {
    const res = await axios.get(`${BASE_URL}/api/ads`, {
      params: {
        page: 1,
        limit: 3,
      },
    });
    if (res.status === 200) {
      dispatch({ type: FETCH_ADS_SUCCESS, ads: res.data });
    } else {
      dispatch({
        type: FETCH_ADS_FAILURE,
        error: res.message,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_ADS_FAILURE,
      error: err.message || "피드 정보를 요청하는중 에러가 발생했습니다",
    });
  }
};

export const fetchMoreAds = () => async (dispatch, prevState) => {
  const { feedAll, ads } = prevState();
  // 더 요청할 피드 정보가 없다면 광고를 더 불러올 필요가 없기 때문에 종료
  if (feedAll.feeds && !feedAll.feeds.next_page_url) return;
  dispatch({ type: FETCH_MORE_ADS });
  try {
    const res = await axios.get(`${BASE_URL}/api/ads`, {
      params: {
        page: ads.page + 1,
        limit: 3,
      },
    });
    if (res.status === 200) {
      dispatch({ type: FETCH_MORE_ADS_SUCCESS, ads: res.data });
    } else {
      dispatch({
        type: FETCH_MORE_ADS_FAILURE,
        error: res.message,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_MORE_ADS_FAILURE,
      error: err.message || "피드 정보를 더 요청하는중 에러가 발생했습니다",
    });
  }
};

const initialState = {
  ads: null,
  isLoading: false,
  isLoadingMore: false,
  error: null,
  page: 1,
};

export const adsReducer = (state = initialState, { type, ads, error }) => {
  switch (type) {
    case FETCH_ADS:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_ADS_SUCCESS:
      return {
        ...state,
        ads,
        isLoading: false,
        page: 1,
      };

    case FETCH_ADS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    case FETCH_MORE_ADS:
      return {
        ...state,
        isLoadingMore: true,
      };

    case FETCH_MORE_ADS_SUCCESS:
      return {
        ...state,
        isLoadingMore: false,
        ads: {
          ...ads,
          data: [...state.ads.data, ...ads.data],
        },
        page: state.page + 1,
      };

    case FETCH_MORE_ADS_FAILURE:
      return {
        ...state,
        isLoadingMore: false,
        error,
      };

    default:
      return state;
  }
};

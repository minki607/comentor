const CHANGE_PREVIEW_LINE = "미리 보기 줄 설정";
const CHANGE_SORT_METHOD = "정렬 방법 변경";
const HIDE_ADS = "광고 숨김 설정";

export const CHANGE_SELECTED_CATEGORY = "선택된 카테고리 변경";

// 미리보기, 정렬, 카테고리 상태는 로컬 스토리지에 저장

// 피드 미리보기 줄 설정
export const changePreviewLength = (line) => {
  window.localStorage.setItem("previewLine", line);
  return { type: CHANGE_PREVIEW_LINE, previewLine: line };
};

// 피드 정렬 변경
export const changeSortMethod = (method) => {
  window.localStorage.setItem("order", method);
  return { type: CHANGE_SORT_METHOD, order: method };
};

// 피드 선택된 카테고리 변경
export const changeSelectedCategory = (category) => {
  window.localStorage.setItem("category", window.JSON.stringify(category));
  return { type: CHANGE_SELECTED_CATEGORY, selectedCategory: category };
};

// 광고 숨김
export const hideAds = () => {
  return { type: HIDE_ADS };
};

// 초기값
const initialState = {
  previewLine: window.localStorage.getItem("previewLine") || 1,
  order: window.localStorage.getItem("order") || "asc",
  selectedCategory:
    window.JSON.parse(window.localStorage.getItem("category")) || null,
  isAdsVisible: true,
};

export const feedOptionReducer = (
  state = initialState,
  { type, previewLine, order, selectedCategory }
) => {
  switch (type) {
    case CHANGE_PREVIEW_LINE:
      return {
        ...state,
        previewLine,
      };
    case CHANGE_SORT_METHOD:
      return {
        ...state,
        order,
      };
    case CHANGE_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory,
      };
    case HIDE_ADS:
      return {
        ...state,
        isAdsVisible: false,
      };
    default:
      return state;
  }
};

const CHANGE_PREVIEW_LINE = "미리 보기 줄 설정";

export const changePreviewLength = (line) => {
  return { type: CHANGE_PREVIEW_LINE, previewLine: line };
};

const initialState = {
  previewLine: 1,
};

export const optionReducer = (state = initialState, { type, previewLine }) => {
  switch (type) {
    case CHANGE_PREVIEW_LINE:
      return {
        ...state,
        previewLine,
      };

    default:
      return state;
  }
};

// initialState
export const initialState = {
  agreement_type: [],
};

// filterReducer
export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return { ...state, [action.field]: action.value };
    case 'RESET_FILTERS':
      return initialState;
    default:
      return state;
  }
};
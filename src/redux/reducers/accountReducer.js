import {
  SET_USER,
  REMOVE_USER,
  SET_ERROR,
  SET_LOADING,
} from '../actions/accountActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case REMOVE_USER:
      return { ...state, user: null };

    case SET_LOADING:
      return { ...state, loading: true };

    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default accountReducer;

import { SET_USER, REMOVE_USER } from '../actions/accountActions';

const initialState = {
  user: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case REMOVE_USER:
      return { ...state, user: null };

    default:
      return state;
  }
};

export default accountReducer;

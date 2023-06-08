import { SET_LOADING } from '../actions/accountActions';
import {
  ADD_TODO,
  TOGGLE_TODO,
  ADD_LIST,
  SET_LISTS,
  SET_ERROR
} from '../actions/listActions';

// Reducers
const initialState = {
  lists: [],
  loading: false,
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const { listId, title } = action.payload;
      const updatedLists = state.lists.map((list) =>
        list.id === listId
          ? {
            ...list,
            todos: [
              ...list.todos,
              { id: Date.now(), title, completed: false },
            ],
          }
          : list,
      );
      return {
        ...state,
        lists: updatedLists,
      };
    case TOGGLE_TODO:
      const { todoId } = action.payload;
      const updatedListsWithToggle = state.lists.map((list) =>
        list.id === listId
          ? {
            ...list,
            todos: list.todos.map((todo) =>
              todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo,
            ),
          }
          : list,
      );
      return {
        ...state,
        lists: updatedListsWithToggle,
      };

    case SET_LOADING:
      return { ...state, loading: true }

    case SET_LISTS:
      return { ...state, lists: action.payload, loading: false, error: null };

    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ADD_LIST:
      const newList = {
        id: Date.now(),
        title: action.payload.title,
        todos: [],
      };
      return {
        ...state,
        lists: [...state.lists, newList],
      };
    default:
      return state;
  }
};

export default todoReducer;

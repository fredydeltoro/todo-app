import {
  ADD_TODO,
  TOGGLE_TODO,
  ADD_LIST,
  SET_LISTS,
  SET_ERROR,
  SET_LOADING,
  SET_TODOS
} from '../actions/listActions';

// Reducers
const initialState = {
  lists: [],
  loading: false,
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      const lists = state.lists.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            todos: action.payload.todos
          }
        }
        return list
      })

      return {
        ...state,
        lists
      }
    case ADD_TODO:
      const { listId, todo } = action.payload;
      const updatedLists = state.lists.map((list) =>
        list.id === listId
          ? {
            ...list,
            todos: [
              ...list.todos,
              todo
            ],
          }
          : list,
      );
      return {
        ...state,
        lists: updatedLists,
        error: null,
        loading: false
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
      return { ...state, loading: true };

    case SET_LISTS:
      return { ...state, lists: action.payload, loading: false, error: null };

    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ADD_LIST:
      const newList = {
        ...action.payload,
      };
      return {
        ...state,
        loading: false,
        error: null,
        lists: [...state.lists, newList],
      };
    default:
      return state;
  }
};

export default todoReducer;

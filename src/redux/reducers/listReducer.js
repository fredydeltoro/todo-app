import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  ADD_LIST,
  REMOVE_LIST,
  UPDATE_LIST,
  SET_LISTS,
  SET_ERROR,
  SET_LOADING,
  SET_TODOS,
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
            todos: action.payload.todos,
          };
        }
        return list;
      });

      return {
        ...state,
        lists,
      };
    case ADD_TODO:
      const updatedLists = state.lists.map((list) =>
        list.id === action.payload.listId
          ? {
              ...list,
              todos: [...list.todos, action.payload.todo],
            }
          : list,
      );
      return {
        ...state,
        lists: updatedLists,
        error: null,
        loading: false,
      };

    case REMOVE_TODO:
      let { listId, todoId } = action.payload;
      const newLists = state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            todos: list.todos.filter((t) => todoId !== t.id),
          };
        }

        return list;
      });

      return {
        ...state,
        lists: newLists,
        error: null,
        loading: false,
      };

    case REMOVE_LIST:
      return {
        ...state,
        lists: state.lists.filter((l) => l.id !== action.payload.listId),
        error: null,
        loading: false,
      };

    case UPDATE_TODO:
      const { upTodo } = action.payload;
      const updatedListsWithToggle = state.lists.map((list) =>
        list.id === action.payload.listId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === upTodo.id ? upTodo : todo,
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

    case UPDATE_LIST:
      const upLists = state.lists.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...action.payload.upList,
            itemscount: list.itemscount,
          };
        }
        return list;
      });

      return { ...state, lists: upLists, loading: false, error: null };

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

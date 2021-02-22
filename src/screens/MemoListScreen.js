import React, { useReducer } from 'react';
import { StyleSheet } from 'react-native';
import MemoList from '../components/MemoList';

const initialUserState = {
  todos_type: [{
    now: true,
    middle: false,
    long: false,
  }],
  todos: [{
    id: 0,
    isChecked: true,
    text: 'kommc',
    num: '0',
  }],
  todosMid: [{
    id: 0,
    isChecked: true,
    text: 'kommc',
    num: '0',
  }],
  todosLong: [{
    id: 0,
    isChecked: true,
    text: 'kommc',
    num: '0',
  }],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_TRUE':
      return {
        ...state,
        todos_type: state.todos_type.map((todoType) => {
          return {
            ...todoType,
            now: action.tab[0],
            middle: action.tab[1],
            long: action.tab[2],
          };
        }),
      };
    case 'ADD_Todo':
      return {
        ...state,
        todos: [...state.todos, action.newItem],
      };
    case 'CHECKED_BOX':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.actid) {
            return {
              ...todo,
              id: todo.id,
              isChecked: !todo.isChecked,
              text: todo.text,
              num: todo.num,
            };
          }
          return todo;
        }),
      };
    case 'SAVE_NUM':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.actid) {
            return {
              ...todo,
              id: todo.id,
              isChecked: todo.isChecked,
              text: todo.text,
              num: action.num,
            };
          }
          return todo;
        }),
      };
    case 'DELTE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.isChecked === false).map((todo, i) => {
          return {
            ...todo,
            id: i,
            isChecked: todo.isChecked,
            text: todo.text,
            num: todo.num,
          };
        }),
      };
    case 'SORT_UP＿TODO':
      return {
        ...state,
        todos: state.todos.sort((a, b) => parseInt(a.num, 10) - parseInt(b.num, 10)).map((todo, i) => {
          return {
            ...todo,
            id: i,
            isChecked: todo.isChecked,
            text: todo.text,
            num: todo.num,
          };
        }),
      };
    case 'SORT_DOWN＿TODO':
      return {
        ...state,
        todos: state.todos.sort((a, b) => parseInt(b.num, 10) - parseInt(a.num, 10)).map((todo, i) => {
          return {
            ...todo,
            id: i,
            isChecked: todo.isChecked,
            text: todo.text,
            num: todo.num,
          };
        }),
      };
    case 'UPDATE_TODO_Text':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.id1) {
            return {
              ...todo,
              id: todo.id,
              isChecked: todo.isChecked,
              text: action.text1,
              num: todo.num,
            };
          }
          return todo;
        }),
      };
    default:
      return state;
  }
}

export const MyContext = React.createContext();

// const MyContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialUserState);
//   return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>;
// };

export default function MemoListScreen() {
  const MyContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialUserState);
    return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>;
  };
  return (
    <MyContextProvider style={styles.container}>
      <MemoList />
    </MyContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

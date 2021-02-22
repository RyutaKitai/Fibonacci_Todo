import React, { useReducer } from 'react';
import { StyleSheet } from 'react-native';
import MemoList from '../components/MemoList';

const initialUserState = {
  todos: [{
    id: 0,
    isChecked: true,
    text: 'kommc',
    num: '0',
  }],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        text: action.payload,
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
    // sort(function (a, b) {
    //   return a[1] - b[1];
    // });
    case 'SORT_TODO':
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
    default:
      return state;
  }
}

export const MyContext = React.createContext();

const MyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);
  return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>;
};

export default function MemoListScreen() {
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

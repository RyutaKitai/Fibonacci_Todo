import React, { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import MemoList from '../components/MemoList';
// import CircleButton from '../elements/CircleButton';

const nowNumList = [1, 2, 3, 5, 8];
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

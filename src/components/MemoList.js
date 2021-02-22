import React, { useState, useContext } from 'react';
import {
  StyleSheet, View, Text, FlatList, Button,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DialogInput from 'react-native-dialog-input';
import { MyContext } from '../screens/MemoListScreen';
import Dropdown from '../elements/Dropdown';
import CheckBox from '../elements/CheckBox';
import CircleButton from '../elements/CircleButton';

function Item({
  text, isChecked, id, num1,
}) {
  return (
    <View style={styles.item}>
      {/* <Text>{console.log(JSON.stringify(isChecked))}</Text> */}
      <CheckBox style={styles.check} isChecked={isChecked} id={id} />
      <TextInput style={styles.title}>{text}</TextInput>
      <Dropdown id={id} num1={num1} />
    </View>
  );
}

export default function MemoList() {
  // const [id, setID] = useState(1);
  const [isPressedAdd, setAddPressed] = useState(false);
  const { state, dispatch } = useContext(MyContext);
  function delteAllTrue() {
    setAddPressed(isPressedAdd);
    dispatch({
      type: 'DELTE_TODO',
    });
  }

  function handleSort() {
    dispatch({
      type: 'SORT_TODO',
    });
  }

  return (
    <View style={styles.memoList}>
      {/* following for debuging */}
      {/* <Text>{console.log(JSON.stringify(state.todos))}</Text> */}
      <Text>{console.log(JSON.stringify(state.todos))}</Text>
      <Button title="sort" onPress={() => handleSort()} />
      <FlatList
        data={state.todos}
        renderItem={({ item }) => <Item text={item.text} isChecked={item.isChecked} id={item.id} num1={item.num} />}
        keyExtractor={(item) => item.id}
      />
      {isPressedAdd ? (
        <View style={styles.newinput}>
          <DialogInput
            isDialogVisible={isPressedAdd}
            title="NEW Todo"
            message="Enter your TOdolist in here "
            hintInput="Plz enter"
            submitInput={(inputText) => {
              setAddPressed(false);
              dispatch({
                type: 'ADD_Todo',
                newItem: {
                  id: state.todos.length, isChecked: false, text: inputText, num: 0,
                },
              });
              // setID(id + 1)
            }}
            closeDialog={() => {
              setAddPressed(false);
            }}
            onChange={
              (e) => dispatch({
                type: 'CHANGE_NAME',
                payload: e.target.inputText,
              })
            }
          />
        </View>
      )
        : (
          <View style={styles.footer}>
            <CircleButton
              style={{
                position: 'absolute',
                bottom: 30,
                right: 30,
              }}
              onPress={() => { setAddPressed(true); }}
              value
            >
              +
            </CircleButton>
            <CircleButton
              style={{
                position: 'absolute',
                bottom: 30,
                left: 30,
              }}
              onPress={() => { delteAllTrue(); }}
              value={false}
            />
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  memoList: {
    width: '100%',
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#a2a2a2',
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    width: '80%',
    fontSize: 25,
    paddingLeft: 10,
  },
  check: {
    paddingLeft: 20,
  },
  newinput: {
    flex: 1,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
});

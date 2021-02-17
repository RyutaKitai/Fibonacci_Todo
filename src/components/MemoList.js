import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DialogInput from 'react-native-dialog-input';
import Dropdown from './Dropdown';
import CheckBox from '../elements/CheckBox';
import CircleButton from '../elements/CircleButton';

function Item({ text }) {
  return (
    <View style={styles.item}>
      <CheckBox style={styles.check} />
      <TextInput style={styles.title}>{text}</TextInput>
      <Dropdown />
    </View>
  );
}

export default function MemoList() {
  const [text, onChangeText] = useState('');
  const [todos, setTodos] = useState([]);
  const [id, setID] = useState(1);
  const [isPressedAdd, setAddPressed] = useState(false);

  return (
    <View style={styles.memoList}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <Item text={item.text} />}
        keyExtractor={item => item.id}
      >
        <View style={styles.memoListItem}>
          <CheckBox style={styles.check} />
          <TextInput style={styles.memoListTitle} onChangeText={t => onChangeText(t)} value={text} />
          <Dropdown />
        </View>
      </FlatList>
      {isPressedAdd ? (
        <View style={styles.newinput}>
          <DialogInput
            isDialogVisible={isPressedAdd}
            title={'NEW Todo'}
            message={'Enter your TOdolist in here '}
            hintInput={'entere'}
            submitInput={(inputText) => {
              onChangeText('');
              setAddPressed(false);
              setTodos(oldTodos => [...oldTodos, { id: id, text: inputText }]);
              setID(id + 1);
            }}
            closeDialog={() => {
              setAddPressed(false);
            }}
          />
        </View>
      ) :
        (
          <CircleButton onPress={() => { setAddPressed(true); }}>+</CircleButton>
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
  memoListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#a2a2a2',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  check: {
    paddingLeft: 20,
  },
  memoListTitle: {
    fontSize: 18,
    margin: 10,
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  memoListDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: '#61C8FF',
  },
  pulldow: {
    flex: 1,
  },
  newinput: {
    flex: 1,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    bottom: 10,
  },
});

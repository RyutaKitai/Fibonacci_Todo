import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DialogInput from 'react-native-dialog-input';
import Dropdown from '../elements/Dropdown';
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
      />
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
          <View style={styles.footer}>
            {/* <View style={styles.footerButtons}> */}
            <CircleButton
              style={{
                position: 'absolute',
                bottom: 30,
                right: 30,
              }}
              onPress={() => { setAddPressed(true); }}
              value={true}
            >
              +
            </CircleButton>
            <CircleButton
              style={{
                position: 'absolute',
                bottom: 30,
                left: 30,
              }}
              onPress={() => { setAddPressed(true); }}
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

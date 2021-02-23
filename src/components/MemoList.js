import React, { useState, useContext, useLayoutEffect } from 'react';
import {
  StyleSheet, View, Text, FlatList, Button, TouchableOpacity, Image,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { TextInput } from 'react-native-gesture-handler';
import DialogInput from 'react-native-dialog-input';
import { MyContext } from '../screens/MemoListScreen';
import Dropdown from '../elements/Dropdown';
import CheckBox from '../elements/CheckBox';
import CircleButton from '../elements/CircleButton';

export default function MemoList() {
  // const [id, setID] = useState(1);
  const [isPressedAdd, setAddPressed] = useState(false);
  // const [changedtext, setChangedtext] = useState('');
  const { state, dispatch } = useContext(MyContext);

  function delteAllTrue() {
    setAddPressed(isPressedAdd);
    dispatch({
      type: 'DELTE_TODO',
    });
  }

  function handleUpSort() {
    dispatch({
      type: 'SORT_UP＿TODO',
    });
  }

  function handleDownSort() {
    dispatch({
      type: 'SORT_DOWN＿TODO',
    });
  }

  // ***
  // show selected tab's list and change data and state for it
  // ***
  function handleTab(tabname) {
    switch (tabname) {
      case 'now':
        dispatch({
          type: 'CHANGE_TRUE',
          tab: [true, false, false],
          useTodo: state.todos,
        });
        break;
      case '中期':
        dispatch({
          type: 'CHANGE_TRUE',
          tab: [false, true, false],
          useTodo: state.todosMid,
        });
        break;
      case '長期':
        dispatch({
          type: 'CHANGE_TRUE',
          tab: [false, false, true],
          useTodo: state.todosLong,
        });
        break;
      default:
        break;
    }
  }

  // ***
  // Database from here
  // ***
  const [items, setItems] = useState([]);
  const [lenTable, setLenTable] = useState(0);

  const db = SQLite.openDatabase('DB.db');

  const showAllData = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'select * from todoNow;',
          null,
          (_, resultSet) => {
            // SUCCESS
            const temp = [];
            for (let i = 0; i < resultSet.rows.length; i++) {
              temp.push(resultSet.rows.item(i));
            }
            setItems(temp);
            setLenTable(resultSet.rows.length);
            console.log('success_selectAll');
          },
          () => {
            console.log('fail');
            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
      },
      () => {
        console.log('fail');
      }, // 失敗時のコールバック関数
      () => {
        console.log('success');
      }, // 成功時のコールバック関数
    );
  };

  useLayoutEffect(() => {
    showAllData();
  }, []);

  function Item({
    text, isChecked, id, num1,
  }) {
    return (
      <View style={styles.item}>
        {/* <Text>{console.log(JSON.stringify(isChecked))}</Text> */}
        <CheckBox style={styles.check} iscahcke={isChecked} id={id} />
        <TextInput
          style={styles.title}
          multiline={true}
          onSubmitEditing={(event) => {
            dispatch({
              type: 'UPDATE_TODO_Text',
              id1: id,
              text1: event.nativeEvent.text,
            });
          }}
        >
          {text}
        </TextInput>
        <Dropdown id={id} num1={num1} />
      </View>
    );
  }

  return (
    <View style={styles.memoList}>
      {/* following for debuging */}
      {/* <Text>{console.log(JSON.stringify(state.todos_type[0].now))}</Text> */}
      {/* <View style={styles.tabcontainer}>
        <TouchableOpacity style={[styles.tab, state.todos_type[0].now ? styles.tabpressed : styles.tabUnpressed]} onPress={() => handleTab('now')}><Text style={styles.tabtext}>now</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tab, state.todos_type[0].middle ? styles.tabpressed : styles.tabUnpressed]} onPress={() => handleTab('中期')}><Text style={styles.tabtext}>中期</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tab, state.todos_type[0].long ? styles.tabpressed : styles.tabUnpressed]} onPress={() => handleTab('長期')}><Text style={styles.tabtext}>長期</Text></TouchableOpacity>
      </View>
      <Text>{console.log(JSON.stringify(state.todos))}</Text>
      <View style={styles.sort}>
        <TouchableOpacity onPress={() => handleUpSort()}><Image style={{ width: 30, height: 30 }} resizeMode="contain" source={require('../../assets/up.png')} /></TouchableOpacity>
        <TouchableOpacity onPress={() => handleDownSort()}><Image style={{ width: 30, height: 30 }} resizeMode="contain" source={require('../../assets/down.png')} /></TouchableOpacity>
      </View> */}
      <FlatList
        data={items}
        renderItem={({ item }) => <Item text={item.bodyText} isChecked={item.isChacked} id={item.id} num1={item.number} />}
        keyExtractor={(item) => item.id}
      />
      {/* {isPressedAdd ? (
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
            }}
            closeDialog={() => {
              setAddPressed(false);
            }}
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
        )} */}
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
    width: '75%',
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
  sort: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingRight: 20,
  },
  tabcontainer: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 1,
    textAlignVertical: 'center',
  },
  tab: {
    marginTop: 8,
    marginHorizontal: 13,
    borderWidth: 1,
    // alignSelf: 'stretch',
    flex: 1,
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',

  },
  tabtext: {
    fontSize: 18,
  },
  tabpressed: {
    borderColor: '#1E90FF',
    backgroundColor: '#B9DEED',
  },
  tabUnpressed: {

  },
});

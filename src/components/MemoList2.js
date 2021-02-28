import React, { useState, useLayoutEffect } from 'react';
import {
  StyleSheet, View, Text, FlatList, Button, TouchableOpacity, Image,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
// import * as FileSystem from 'expo-file-system';
import { TextInput } from 'react-native-gesture-handler';
import DialogInput from 'react-native-dialog-input';
import Dropdown from '../elements/Dropdown';
import CheckBox from '../elements/CheckBox';
import CircleButton from '../elements/CircleButton';

export default function MemoList2() {
  const [isPressedAdd, setAddPressed] = useState(false);

  // *** Database from her ***
  const [items, setItems] = useState([]);
  const [lenTable, setLenTable] = useState(0);

  const db = SQLite.openDatabase('DB.db');

  const showAllData = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'select * from todoLong;',
          null,
          (_, resultSet) => {
            // SUCCESS
            const temp = [];
            for (let i = 0; i < resultSet.rows.length; i++) {
              temp.push(resultSet.rows.item(i));
            }
            setItems(temp);
            setLenTable(resultSet.rows.length);
          },
          () => {
            // console.log('fail');
            return true;
          },
        );
      },
      () => {
        // console.log('fail');
      },
      () => {
        // console.log('success');
      },
    );
  };

  const updateData = (hereid, newText) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'update todoLong set bodyText=? where id=?;',
          [newText, hereid],
          () => {
            // console.log('success_updatetext');
          },
          () => {
            // console.log('fail_updatetext');
            return true;
          },
        );
      },
      () => {
        // console.log('fail');
      },
      () => {
        // console.log('success');
      },
    );
  };

  const insertDatabase = (newid, newtext) => {
    // DBの作成先を出力
    db.transaction(
      (tx) => {
        tx.executeSql(
          'insert into todoLong (id, order_id, isChacked, bodyText, number) values ((SELECT id FROM todoLong WHERE id=(SELECT max(id) FROM todoLong))+1, ?, ?, ?, ?);',
          [newid, 0, newtext, 0],
          () => {
            // console.log('success_insert');
          },
          () => {
            // console.log('fail_insert');

            return true;
          },
        );
      },
      () => {
        // console.log('fail all');
      },
      () => {
        // console.log('success');
      },
    );
  };

  const delteAllTrue = () => {
    // DBの作成先を出力
    db.transaction(
      (tx) => {
        tx.executeSql(
          'delete from todoLong where isChacked=?;',
          [1],
          () => {
            // console.log('success_deleteAll');
          }, // 成功時のコールバック関数
          () => {
            // console.log('fail_delete');
            return true;
          },
        );
      },
      () => {
        // console.log('fail all');
      },
      () => {
        // console.log('success');
      },
    );
  };
  const sortDataUp = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'select * from todoLong order by number ASC;',
          null,
          (_, resultSet) => {
            // SUCCESS
            const temp = [];
            for (let i = 0; i < resultSet.rows.length; i++) {
              temp.push(resultSet.rows.item(i));
            }
            setItems(temp);
            setLenTable(resultSet.rows.length);
          },
          () => {
            // console.log('fail');
            return true;
          },
        );
      },
      () => {
        // console.log('fail');
      },
      () => {
        // console.log('success');
      },
    );
  };

  const sortDataDown = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'select * from todoLong order by number DESC;',
          null,
          (_, resultSet) => {
            // SUCCESS
            const temp = [];
            for (let i = 0; i < resultSet.rows.length; i++) {
              temp.push(resultSet.rows.item(i));
            }
            setItems(temp);
            setLenTable(resultSet.rows.length);
          },
          () => {
            return true;
          },
        );
      },
      () => {
        // console.log('fail');
      },
      () => {
        // console.log('success');
      },
    );
  };

  useLayoutEffect(() => {
    // setUsedTable(currentTable);
    showAllData();
    // console.log(usedTable);
  }, []);

  function Item({
    text, isChecked, id, num1,
  }) {
    return (
      <View style={styles.item}>
        {/* <Text>{console.log(JSON.stringify(isChecked))}</Text> */}
        <CheckBox style={styles.check} iscahcke={isChecked} id={id} usedTable={[0, 0, 1]} />
        <TextInput
          style={styles.title}
          multiline={true}
          onSubmitEditing={(event) => {
            updateData(id, event.nativeEvent.text);
            showAllData();
          }}
        >
          {text}
        </TextInput>
        <Dropdown id={id} num1={num1} usedTable={[0, 0, 1]} numlist={[55, 89, 144]} colors={['#00cccc', '#009999', '#008080']} />
      </View>
    );
  }

  return (
    <View style={styles.memoList}>
      {/* following for debuging */}
      {/* <Text>{console.log(JSON.stringify(items.length))}</Text> */}
      <View style={styles.sort}>
        <TouchableOpacity onPress={() => sortDataUp()}><Image style={{ width: 30, height: 30 }} resizeMode="contain" source={require('../../assets/up.png')} /></TouchableOpacity>
        <TouchableOpacity onPress={() => sortDataDown()}><Image style={{ width: 30, height: 30 }} resizeMode="contain" source={require('../../assets/down.png')} /></TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => <Item text={item.bodyText} isChecked={item.isChacked} id={item.id} num1={item.number} />}
        keyExtractor={(item) => item.id}
      />
      {isPressedAdd ? (
        <View style={styles.newinput}>
          <DialogInput
            isDialogVisible={isPressedAdd}
            title="Add NEW Todo"
            message="Enter your TOdolist in here "
            hintInput="Plz enter"
            submitInput={(inputText) => {
              setAddPressed(false);
              insertDatabase(items.length + 1, inputText);
              showAllData();
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
              onPress={() => {
                setAddPressed(true);
                showAllData();
              }}
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
              onPress={() => {
                delteAllTrue();
                showAllData();
              }}
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
    marginTop: 10,
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

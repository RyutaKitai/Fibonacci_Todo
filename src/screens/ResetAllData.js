import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Text, Button, View, FlatList,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { TextInput } from 'react-native-gesture-handler';

export default function ResetAllData() {
  const [items, setItems] = useState([]);
  const [lenTable, setLenTable] = useState(0);

  const db = SQLite.openDatabase('DB.db');

  // const initializeDatabase = () => {
  //   // DBの作成先を出力
  //   console.log(FileSystem.documentDirectory + 'SQLite/');
  //   db.transaction(
  //     tx => {
  //       tx.executeSql(
  //         'create table if not exists todoNow (id integer primary key not null, name text);', // 実行したいSQL文
  //         null,
  //         () => {
  //           console.log('success_create');
  //         }, // 成功時のコールバック関数
  //         () => {
  //           console.log('fail_create');

  //           return true; // ロールバックする場合はtrueを返す
  //         }, // 失敗時のコールバック関数
  //       );
  //       tx.executeSql(
  //         'insert into todoNow (id, name) values (?, ?);',
  //         [1, 'yamada'],
  //         () => {
  //           console.log('success_insert');
  //         }, // 成功時のコールバック関数
  //         () => {
  //           console.log('fail_insert');

  //           return true; // ロールバックする場合はtrueを返す
  //         }, // 失敗時のコールバック関数
  //       );
  //     },
  //     () => {
  //       console.log('fail all');
  //     }, // 失敗時のコールバック関数
  //     () => {
  //       console.log('success');
  //     }, // 成功時のコールバック関数
  //   );
  // };

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
  // テーブル初期化 in the development
  const deleteAllTable = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'drop table todoNow;',
          null,
          () => {
            console.log('success');
          }, // 成功時のコールバック関数
          () => {
            console.log('fail');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
        tx.executeSql(
          'drop table todoMid;',
          null,
          () => {
            console.log('success');
          }, // 成功時のコールバック関数
          () => {
            console.log('fail');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
        tx.executeSql(
          'drop table todoLong;',
          null,
          () => {
            console.log('success');
          }, // 成功時のコールバック関数
          () => {
            console.log('fail');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
        tx.executeSql(
          'drop table useTable;',
          null,
          () => {
            console.log('success');
          }, // 成功時のコールバック関数
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
        console.log('success_del');
      }, // 成功時のコールバック関数
    );
  };

  // const insertData = (id, name) => {
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql(
  //         'insert into todoNow (id, name) values (?, ?);',
  //         [id, name],
  //         () => {
  //           console.log('success_insert');
  //         }, // 成功時のコールバック関数
  //         () => {
  //           console.log('fail_insert');

  //           return true; // ロールバックする場合はtrueを返す
  //         }, // 失敗時のコールバック関数
  //       );
  //     },
  //     () => {
  //       console.log('fail');
  //     }, // 失敗時のコールバック関数
  //     () => {
  //       console.log('success_del');
  //     }, // 成功時のコールバック関数
  //   );
  // };

  // const updateData = (id, name) => {
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql(
  //         'update todoNow set name=? where id=?;',
  //         [name, id],
  //         () => {
  //           console.log('success_insert');
  //         }, // 成功時のコールバック関数
  //         () => {
  //           console.log('fail_insert');

  //           return true; // ロールバックする場合はtrueを返す
  //         }, // 失敗時のコールバック関数
  //       );
  //     },
  //     () => {
  //       console.log('fail');
  //     }, // 失敗時のコールバック関数
  //     () => {
  //       console.log('success_del');
  //     }, // 成功時のコールバック関数
  //   );
  // };

  // useLayoutEffect(() => {
  // initializeDatabase();
  // showAllData();
  // }, []);

  // useEffect(() => {
  //   initializeDatabase();
  //   // showData();
  // }, []);

  function Item({
    id, checked, text, num,
  }) {
    return (
      <View>
        <Text>{id}</Text>
        <Text>{checked}</Text>
        <Text>{text}</Text>
        <Text>{num}</Text>
      </View>
    );
  }

  useLayoutEffect(() => {
    showAllData();
  }, []);

  return (
    <View>
      <Text>{console.log(items)}</Text>
      <Text>{lenTable}</Text>
      <Button title="press" onPress={() => { deleteAllTable(); }} />
      {/* <Text>{items.length > 0 && items[0].name}</Text> */}
      <FlatList
        data={items}
        renderItem={({ item }) => <Item id={item.id} text={item.bodyText} checked={item.isChacked} num={item.number} />}
        keyExtractor={(item) => item.id}
      />
      {/* <Button title="Delete" onPress={() => { deleteAllData(); }} /> */}
      {/* <View>
        <Text style={{ alignSelf: 'center' }}>New Insert</Text>
        <TextInput
          style={{ borderWidth: 1, width: '80%', alignSelf: 'center' }}
          onSubmitEditing={(event) => {
            insertData(lenTable + 1, event.nativeEvent.text);
          }}
        />
      </View>
      <View>
        <Text style={{ alignSelf: 'center' }}>Update</Text>
        <TextInput
          style={{ borderWidth: 1, width: '80%', alignSelf: 'center' }}
          onSubmitEditing={(event) => {
            updateData(1, event.nativeEvent.text);
          }}
        />
      </View> */}
    </View>
  );
}

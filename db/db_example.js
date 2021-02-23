import React, { useState } from 'react';
import { Text, Button, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

export default function SQLiteData() {
  const [items, setItems] = useState<SQLite.SQLResultSet>();

  const initializeDatabase = () => {
    // DBの作成先を出力
    console.log(FileSystem.documentDirectory + 'SQLite/');

    // DBのオープン
    const db = SQLite.openDatabase('DB.db');

    db.transaction(
      tx => {
        tx.executeSql(
          'create table if not exists todoNow (id integer primary key not null, name text);', // 実行したいSQL文
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
          'insert into players (id, name) values (?, ?),(?, ?);',
          [1, 'yamada', 2, 'sato'],
          () => {
            console.log('success');
          }, // 成功時のコールバック関数
          () => {
            console.log('fail');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );

        tx.executeSql(
          'select * from players where id = ?;',
          [2],
          (_, resultSet) => {
            // SUCCESS
            setItems(resultSet);
          },
          () => {
            console.log('fail');

            return false; // 何もしない
          }, // 失敗時のコールバック関数
        );
      },
      () => {
        console.log('fail all');
      }, // 失敗時のコールバック関数
      () => {
        console.log('success');
      }, // 成功時のコールバック関数
    );
  };

  const showData = () => {
    for (let i = 0; i < items.rows.length; i++) {
      const id = items.rows.item(i).id;
      const name = items.rows.item(i).name;
      console.log(`${id}:${name}`);
    }
  };

  const deleteData = () => {
    const db = SQLite.openDatabase('DB.db');

    db.transaction(
      tx => {
        tx.executeSql(
          'delete from players;',
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
        console.log('success');
      }, // 成功時のコールバック関数
    );
  };

  return (
    <>
      <Button onPress={() => initializeDatabase()}>
        <Text>Initialize database</Text>
      </Button>
      <Button onPress={() => showData()}>
        <Text>Show data</Text>
      </Button>
      <Button onPress={() => deleteData()}>
        <Text>Delete data</Text>
      </Button>
    </>
  );
}

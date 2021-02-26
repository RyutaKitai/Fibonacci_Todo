import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Text, Button, View, FlatList,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function ResetAllData() {
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
            // console.log('success_selectAll');
          },
          () => {
            // console.log('fail');
            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
      },
      () => {
        // console.log('fail');
      }, // 失敗時のコールバック関数
      () => {
        // console.log('success');
      }, // 成功時のコールバック関数
    );
  };

  // tableの中身だけ消す
  const deleteTableData = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'TRUNCATE table todoNow;',
          null,
          () => {
            // console.log('success');
          }, // 成功時のコールバック関数
          () => {
            // console.log('fail');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
        tx.executeSql(
          'TRUNCATE table todoMid;',
          null,
          () => {
            // console.log('success');
          }, // 成功時のコールバック関数
          () => {
            // console.log('fail');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
        tx.executeSql(
          'TRUNCATE table todoLong;',
          null,
          () => {
            // console.log('success');
          }, // 成功時のコールバック関数
          () => {
            // console.log('fail');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
      },
      () => {
        // console.log('fail');
      }, // 失敗時のコールバック関数
      () => {
        // console.log('success_del');
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
            // console.log('success');
          }, // 成功時のコールバック関数
          () => {
            // console.log('fail');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
        tx.executeSql(
          'drop table todoMid;',
          null,
          () => {
            // console.log('success');
          }, // 成功時のコールバック関数
          () => {
            // console.log('fail');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
        tx.executeSql(
          'drop table todoLong;',
          null,
          () => {
            // console.log('success');
          }, // 成功時のコールバック関数
          () => {
            // console.log('fail');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
        tx.executeSql(
          'drop table useTable;',
          null,
          () => {
            // console.log('success');
          }, // 成功時のコールバック関数
          () => {
            // console.log('fail');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
      },
      () => {
        // console.log('fail');
      }, // 失敗時のコールバック関数
      () => {
        // console.log('success_del');
      }, // 成功時のコールバック関数
    );
  };

  // useLayoutEffect(() => {
  //   showAllData();
  // }, []);

  return (
    <View>
      {/* <Text>{console.log(items)}</Text> */}
      <Button title="reset all data" onPress={() => { deleteTableData(); }} />
    </View>
  );
}

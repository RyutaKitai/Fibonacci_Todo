import React, { useState } from 'react';
import {
  Text, Button, View,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as RootNavigation from '../../route';

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

  // tableの中身だけ消す
  const deleteTableData = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'Drop table todoNow;',
          null,
          () => {
            // console.log('success');
          },
          () => {
            // console.log('fail');
            return true;
          },
        );
        tx.executeSql(
          'Drop table todoMid;',
          null,
          () => {
            // console.log('success');
          },
          () => {
            // console.log('fail');
            return true;
          },
        );
        tx.executeSql(
          'Drop table todoLong;',
          null,
          () => {
            // console.log('success');
          },
          () => {
            // console.log('fail');
            return true;
          },
        );
        tx.executeSql(
          'create table if not exists todoNow (id integer primary key not null, order_id integer, isChacked BIT, bodyText text, number integer);',
          null,
          () => {
            // console.log('success_create1');
          },
          () => {
            // console.log('fail_create1');
            return true;
          },
        );
        tx.executeSql(
          'create table if not exists todoMid (id integer primary key not null, order_id integer, isChacked BIT, bodyText text, number integer);',
          null,
          () => {
            // console.log('success_create2');
          },
          () => {
            // console.log('fail_create2');
            return true;
          },
        );
        tx.executeSql(
          'create table if not exists todoLong (id integer primary key not null, order_id integer, isChacked BIT, bodyText text, number integer);',
          null,
          () => {
            // console.log('success_create3');
          },
          () => {
            // console.log('fail_create3');
            return true;
          },
        );
      },
      () => {
        // console.log('fail');
      },
      () => {
        // console.log('success_del');
      },
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
          },
          () => {
            // console.log('fail');
            return true;
          },
        );
        tx.executeSql(
          'drop table todoMid;',
          null,
          () => {
            // console.log('success');
          },
          () => {
            // console.log('fail');
            return true;
          },
        );
        tx.executeSql(
          'drop table todoLong;',
          null,
          () => {
            // console.log('success');
          }, // 成功時のコールバック関数
          () => {
            // console.log('fail');
            return true;
          },
        );
        tx.executeSql(
          'drop table useTable;',
          null,
          () => {
            // console.log('success');
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
        // console.log('success_del');
      },
    );
  };

  return (
    <View>
      {/* <Text>{console.log(items)}</Text> */}
      <Button title="reset all data" onPress={() => { deleteTableData(); }} />
      <Button title="Privacy Policy" onPress={() => RootNavigation.navigate('PrivacyPolicy')} />
    </View>
  );
}

import React, { useLayoutEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
// import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MemoListScreen from './src/screens/MemoListScreen';
import MemoToppage from './src/screens/MemoToppage';
import ResetAllData from './src/screens/ResetAllData';

const Stack = createStackNavigator();

export default function App() {
  const db = SQLite.openDatabase('DB.db');

  const initializeDatabase = () => {
    // DBの作成先を出力
    console.log(FileSystem.documentDirectory + 'SQLite/');
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists useTable (id integer primary key not null, useTodoNow BIT, useTodoMid BIT, useTodoLong BIT);',
          null,
          () => {
            console.log('success_create_usetable');
          },
          () => {
            console.log('fail_create_usetable');

            return true;
          },
        );
        tx.executeSql(
          'create table if not exists todoNow (id integer primary key not null, order_id integer, isChacked BIT, bodyText text, number integer);',
          null,
          () => {
            console.log('success_create1');
          },
          () => {
            console.log('fail_create1');

            return true;
          },
        );
        tx.executeSql(
          'create table if not exists todoMid (id integer primary key not null, order_id integer, isChacked BIT, bodyText text, number integer);',
          null,
          () => {
            console.log('success_create2');
          },
          () => {
            console.log('fail_create2');

            return true;
          },
        );
        tx.executeSql(
          'create table if not exists todoLong (id integer primary key not null, order_id integer, isChacked BIT, bodyText text, number integer);',
          null,
          () => {
            console.log('success_create3');
          },
          () => {
            console.log('fail_create3');

            return true;
          },
        );
        tx.executeSql(
          'insert into useTable (id, useTodoNow, useTodoMid, useTodoLong) values (?, ?, ?, ?)',
          [1, 1, 0, 0],
          () => {
            console.log('success_insert_usetable');
          }, // 成功時のコールバック関数
          () => {
            console.log('fail_insert_usetable');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
        tx.executeSql(
          'insert into todoNow (id, order_id, isChacked, bodyText, number) values (?, ?, ?, ?, ?)',
          [1, 1, 0, 'Todo', 0],
          () => {
            console.log('success_insert1');
          }, // 成功時のコールバック関数
          () => {
            console.log('fail_insert1');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
        tx.executeSql(
          'insert into todoMid (id, order_id, isChacked, bodyText, number) values (?, ?, ?, ?, ?);',
          [1, 1, 0, 'Todo', 0],
          () => {
            console.log('success_insert2');
          }, // 成功時のコールバック関数
          () => {
            console.log('fail_insert2');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
        tx.executeSql(
          'insert into todoLong (id, order_id, isChacked, bodyText, number) values (?, ?, ?, ?, ?);',
          [1, 1, 0, 'Todo', 0],
          () => {
            console.log('success_insert3');
          }, // 成功時のコールバック関数
          () => {
            console.log('fail_insert3');

            return true; // ロールバックする場合はtrueを返す
          }, // 失敗時のコールバック関数
        );
      },
      () => {
        console.log('fail initialize tables');
      }, // 失敗時のコールバック関数
      () => {
        console.log('success initialize tables');
      }, // 成功時のコールバック関数
    );
  };
  useLayoutEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MemoSignin"
        screenOptions={{
          headerStyle: { backgroundColor: '#61C8FF' },
          headerTitleStyle: { color: 'white', fontSize: 18 },
          headerTitle: 'Fibonacci Todo',
        }}
      >
        <Stack.Screen name="Memolist" component={MemoListScreen} />
        <Stack.Screen name="MemoSignin" component={MemoToppage} />
        <Stack.Screen name="ResetAllData" component={ResetAllData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

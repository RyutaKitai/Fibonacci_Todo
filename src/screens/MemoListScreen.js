import React, { useState, useLayoutEffect } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import MemoList from '../components/MemoList';
import MemoList1 from '../components/MemoList1';
import MemoList2 from '../components/MemoList2';

export default function MemoListScreen() {
  const [state, setState] = useState([1, 0, 0]);
  // const [tableName, setTableName] = useState('todoNow');dd

  const db = SQLite.openDatabase('DB.db');

  const updateTableData = (pState) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'update useTable set useTodoNow=?, useTodoMid=?, useTodoLong=?;',
          [pState[0], pState[1], pState[2]],
          () => {
            // SUCCESS
            // clickState(false);
            // setNumber(number);
            setState([pState[0], pState[1], pState[2]]);
            // console.log('success_updatetext');
          },
          () => {
            // console.log('fail_updatetext');
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

  // ***
  // show selected tab's list and change data and state for it
  // ***
  function handleTab(tabname) {
    switch (tabname) {
      case 'now':
        updateTableData([1, 0, 0]);
        break;
      case '中期':
        updateTableData([0, 1, 0]);
        break;
      case '長期':
        updateTableData([0, 0, 1]);
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabcontainer}>
        <TouchableOpacity style={[styles.tab, state[0] ? styles.tabpressed : styles.tabUnpressed]} onPress={() => handleTab('now')}>
          <Text style={styles.tabtext}>now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, state[1] ? styles.tabpressed : styles.tabUnpressed]} onPress={() => handleTab('中期')}>
          <Text style={styles.tabtext}>中期</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, state[2] ? styles.tabpressed : styles.tabUnpressed]} onPress={() => handleTab('長期')}>
          <Text style={styles.tabtext}>長期</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.memoList}>
        {state[0] === 1 ? <MemoList /> : null}
        {state[1] === 1 ? <MemoList1 /> : null}
        {state[2] === 1 ? <MemoList2 /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  tabcontainer: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 0.2,
    textAlignVertical: 'center',
  },
  tab: {
    borderRadius: 4,
    marginTop: 8,
    marginHorizontal: 13,
    borderWidth: 0.2,
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
    borderWidth: 1,
    borderColor: '#1E90FF',
    backgroundColor: '#B9DEED',
    borderRadius: 4,
  },
  tabUnpressed: {

  },
  memoList: {
    flex: 1,
    borderWidth: 0.2,
    marginHorizontal: 4,
    marginBottom: 8,
    marginTop: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    borderRadius: 4,
  },
});

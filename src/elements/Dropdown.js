import React, { useState, useLayoutEffect } from 'react';
import {
  TouchableOpacity, View, StyleSheet, Text, ScrollView,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function Dropdown(props) {
  const db = SQLite.openDatabase('DB.db');

  const [isChecked, clickState] = useState(false);
  const { id, num1 } = props;
  const [currentNum, setNumber] = useState(num1);
  const numlist = ['1', '2', '3', '5', '8'];
  const [currentTableState, setCurrentTableState] = useState([]);

  const selectTable = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'select * from useTable where id=1;',
          null,
          (_, resultSet) => {
            // SUCCESS
            const temp = [];
            for (let i = 0; i < resultSet.rows.length; i++) {
              temp.push(resultSet.rows.item(i));
            }
            setCurrentTableState(temp);
            console.log(resultSet);
            console.log('success_selectTable');
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

  const handlePopup = () => {
    clickState(true);
  };

  const updateData = (hereid, number) => {
    db.transaction(
      (tx) => {
        if (currentTableState[0].useTodoNow === 1) {
          tx.executeSql(
            'update todoNow set number=? where id=?;',
            [number, hereid],
            () => {
              // SUCCESS
              clickState(false);
              setNumber(number);
              console.log('success_update');
            },
            () => {
              console.log('fail_update');
              return true; // ロールバックする場合はtrueを返す
            }, // 失敗時のコールバック関数
          );
        } else if (currentTableState[0].useTodoMid === 1) {
          tx.executeSql(
            'update todoMid set number=? where id=?;',
            [number, hereid],
            () => {
              // SUCCESS
              clickState(false);
              setNumber(number);
              console.log('success_update');
            },
            () => {
              console.log('fail_update');
              return true; // ロールバックする場合はtrueを返す
            }, // 失敗時のコールバック関数
          );
        } else {
          tx.executeSql(
            'update todoLong set number=? where id=?;',
            [number, hereid],
            () => {
              // SUCCESS
              clickState(false);
              setNumber(number);
              console.log('success_update');
            },
            () => {
              console.log('fail_update');
              return true; // ロールバックする場合はtrueを返す
            }, // 失敗時のコールバック関数
          );
        }
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
    selectTable();
  }, []);

  return (
    <View style={styles.pulldown}>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => handlePopup()}
      >
        <Text style={styles.title}>
          {currentNum}
        </Text>
        {isChecked ? (
          <View hidden={isChecked}>
            <ScrollView style={styles.numbers}>
              {numlist.map((num) => (
                <TouchableOpacity onPress={() => updateData(id, num)} key={num} style={styles.textTouch}>
                  <Text style={styles.text}>{num}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )
          : (
            <View />
          )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
  },
  textTouch: {
    borderTopWidth: 1,
  },
  text: {
    fontSize: 28,
  },
  numbers: {
    height: 120,
  },
  checkBox: {
    borderWidth: 1,
    borderColor: '#00CED1',
    paddingHorizontal: 10,
  },
});

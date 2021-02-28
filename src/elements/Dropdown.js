import React, { useState, useLayoutEffect } from 'react';
import {
  TouchableOpacity, View, StyleSheet, Text, ScrollView,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function Dropdown(props) {
  const db = SQLite.openDatabase('DB.db');
  const { id, num1, usedTable } = props;

  const [isChecked, clickState] = useState(false);
  const [currentNum, setNumber] = useState(num1);
  const numlist = [1, 2, 3, 5, 8];
  const [currentTableState, setCurrentTableState] = useState(usedTable);

  const handlePopup = () => {
    clickState(true);
  };

  const updateData = (hereid, number) => {
    db.transaction(
      (tx) => {
        if (currentTableState[0] === 1) {
          tx.executeSql(
            'update todoNow set number=? where id=?;',
            [number, hereid],
            () => {
              clickState(false);
              setNumber(number);
              // console.log('success_update');
            },
            () => true,
          );
        } else if (currentTableState[1] === 1) {
          tx.executeSql(
            'update todoMid set number=? where id=?;',
            [number, hereid],
            () => {
              // SUCCESS
              clickState(false);
              setNumber(number);
              // console.log('success_update');
            },
            () => true,
          );
        } else {
          tx.executeSql(
            'update todoLong set number=? where id=?;',
            [number, hereid],
            () => {
              // SUCCESS
              clickState(false);
              setNumber(number);
              // console.log('success_update');
            },
            () => true,
          );
        }
      },
      () => {
        // console.log('fail');
      },
      () => {
        // console.log('success');
      },
    );
  };

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
    borderWidth: 1.0,
    borderColor: '#00CED1',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});

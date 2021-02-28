import React, { useState, useLayoutEffect } from 'react';
import {
  TouchableOpacity, View, StyleSheet, Text, ScrollView,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function Dropdown(props) {
  const db = SQLite.openDatabase('DB.db');
  const {
    id, num1, usedTable, numlist, colors,
  } = props;

  const [isChecked, clickState] = useState(false);
  const [currentNum, setNumber] = useState(num1);
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
  // colors = { [0, 255, 255, 0.1, 0.2, 0.3, 0.5, 0.8]}

  return (
    <View style={styles.pulldown}>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => handlePopup()}
      >
        <Text style={jewelStyle(numlist, colors, currentNum)}>
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

const jewelStyle = (numlist, colors, currentNum) => {
  const indexOfNum = numlist.indexOf(currentNum);
  return {
    color: colors[indexOfNum],
    fontSize: 28,
  };
};

const styles = StyleSheet.create({
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

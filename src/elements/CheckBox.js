import React, { useState, useLayoutEffect } from 'react';
import {
  TouchableOpacity, StyleSheet, View, Image,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function CheckBox(props) {
  // const { dispatch } = useContext(MyContext);
  const { iscahcke, id, usedTable } = props;
  const db = SQLite.openDatabase('DB.db');
  const [isChecked, setisChecked] = useState(iscahcke);
  const [currentTableState, setCurrentTableState] = useState(usedTable);

  // const selectTable = () => {
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql(
  //         'select * from useTable where id=1;',
  //         null,
  //         (_, resultSet) => {
  //           // SUCCESS
  //           const temp = [];
  //           for (let i = 0; i < resultSet.rows.length; i++) {
  //             temp.push(resultSet.rows.item(i));
  //           }
  //           setCurrentTableState(temp);
  //         },
  //         () => true,
  //       );
  //     },
  //     () => {
  //       // console.log('fail');
  //     },
  //     () => {
  //       // console.log('success');
  //     },
  //   );
  // };

  const updateData = (hereid, ischecked) => {
    let newIsChecked = 0;
    if (ischecked === 0) {
      newIsChecked = 1;
    } else {
      newIsChecked = 0;
    }
    console.log(currentTableState[0]);
    db.transaction(
      (tx) => {
        if (currentTableState[0] === 1) {
          tx.executeSql(
            'update todoNow set isChacked=? where id=?;',
            [newIsChecked, hereid],
            () => {
              // console.log(newIsChecked);
              setisChecked(newIsChecked);
              // console.log('success_update');
            },
            () => true,
          );
        } else if (currentTableState[1] === 1) {
          tx.executeSql(
            'update todoMid set isChacked=? where id=?;',
            [newIsChecked, hereid],
            () => {
              // SUCCESS
              // console.log(newIsChecked);
              setisChecked(newIsChecked);
              // console.log('success_update');
            },
            () => true,
          );
        } else {
          tx.executeSql(
            'update todoLong set isChacked=? where id=?;',
            [newIsChecked, hereid],
            () => {
              // SUCCESS
              // console.log(newIsChecked);
              setisChecked(newIsChecked);
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

  // useLayoutEffect(() => {
  //   let isCancelled = false;
  //   selectTable();
  //   return () => {
  //     isCancelled = true;
  //   };
  // }, []);

  return (
    <View>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={
          () => updateData(id, isChecked)
        }
      >
        {isChecked === 1 ? (
          <View>
            <View>
              <Image
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
                // eslint-disable-next-line global-require
                source={require('../../assets/check_right.png')}
              />
            </View>
          </View>
        )
          : (
            <View>
              <Image
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
                // eslint-disable-next-line global-require
                source={require('../../assets/check_no.png')}
              />
            </View>
          )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: '#61C8FF',
  },
});

import React, { useState, useLayoutEffect } from 'react';
import {
  TouchableOpacity, StyleSheet, View, Image,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { MyContext } from '../screens/MemoListScreen';

export default function CheckBox(props) {
  // const { dispatch } = useContext(MyContext);
  const { iscahcke, id } = props;
  const db = SQLite.openDatabase('DB.db');
  const [isChecked, setisChecked] = useState(iscahcke);
  const selectChacked = (hereid) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'select isChacked from todoNow where id=? ;',
          [hereid],
          (_, resultSet) => {
            // SUCCESS
            setisChecked(resultSet.rows.item(0).isChacked);
            console.log(resultSet);
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

  const updateData = (hereid, ischecked) => {
    let newIsChecked = 0;
    if (ischecked === 0) {
      newIsChecked = 1;
    } else {
      newIsChecked = 0;
    }
    db.transaction(
      (tx) => {
        tx.executeSql(
          'update todoNow set isChacked=? where id=?;',
          [newIsChecked, hereid],
          () => {
            // SUCCESS
            console.log(newIsChecked);
            setisChecked(newIsChecked);
            console.log('success_update');
          },
          () => {
            console.log('fail_update');
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

  useLayoutEffect(() => {
    selectChacked(id);
  }, []);

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

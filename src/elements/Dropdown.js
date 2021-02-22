import React, { useState, useContext } from 'react';
import {
  TouchableOpacity, View, StyleSheet, Text, ScrollView,
} from 'react-native';
import { MyContext } from '../screens/MemoListScreen';

export default function Dropdown(props) {
  const { dispatch } = useContext(MyContext);
  const [isChecked, clickState] = useState(false);
  const { id, num1 } = props;

  const numlist = ['1', '2', '3', '5', '8'];

  const handleClick = (text) => {
    dispatch({
      type: 'SAVE_NUM',
      actid: id,
      num: text,
    });
    clickState(false);
  };

  const handlePopup = () => {
    clickState(true);
  };

  return (
    <View style={styles.pulldown}>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => handlePopup()}
      >
        <Text style={styles.title}>
          {num1}
        </Text>
        {isChecked ? (
          <View hidden={isChecked}>
            <ScrollView style={styles.numbers}>
              {numlist.map((num) => (
                <TouchableOpacity onPress={() => handleClick(num)} key={num} style={styles.textTouch}>
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

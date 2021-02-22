import React, { useState, useContext } from 'react';
import {
  TouchableOpacity, View, StyleSheet, Text, ScrollView,
} from 'react-native';
import { MyContext } from '../screens/MemoListScreen';

export default function Dropdown(props) {
  const { state, dispatch } = useContext(MyContext);

  const [isChecked, clickState] = useState(false);
  const [ChangedText, pressedText] = useState('--');
  const { id, num1 } = props;

  const numlist = ['1', '2', '3', '5', '8'];

  const handleClick = (text, state1) => {
    dispatch({
      type: 'SAVE_NUM',
      actid: id,
      num: text,
    });
    clickState(false);
    pressedText(num1);
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
                <TouchableOpacity onPress={() => handleClick(num, state)} key={num}>
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
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
  },
  text: {
    fontSize: 28,
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
  },
  numbers: {
    height: 140,
  },
});

import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ScrollView } from 'react-native';
import { MyContext } from '../screens/MemoListScreen';

export default function Dropdown(props) {
  const { state, dispatch } = useContext(MyContext);

  const [isChecked, clickState] = useState(false);
  const [ChangedText, pressedText] = useState('--');
  const [isModal, serModal] = useState(false);
  const { id } = props;

  const numlist = ['1', '2', '3', '5', '8'];

  const handleClick = (text) => {
    pressedText(text);
    dispatch({
      type: 'SAVE_NUM',
      actid: id,
      num: parseInt(text),
    });
    clickState(false);
    serModal(false);
  };

  const handlePopup = () => {
    clickState(true);
    serModal(true);
  };

  return (
    <View style={styles.pulldown}>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => handlePopup()}
      >
        <Text style={styles.title}>
          {ChangedText}
        </Text>
        {isChecked ? (
          <View hidden={isChecked}>
            <ScrollView style={styles.numbers}>
              {numlist.map((num) => (
                <TouchableOpacity onPress={() => handleClick(num)}><Text style={styles.text}>{num}</Text></TouchableOpacity>
              ))}
              {/* <TouchableOpacity onPress={() => handleClick('1')}><Text style={styles.text}>1</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleClick('2')}><Text style={styles.text}>2</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleClick('3')}><Text style={styles.text}>3</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleClick('5')}><Text style={styles.text}>5</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleClick('8')}><Text style={styles.text}>8</Text></TouchableOpacity> */}
            </ScrollView>
          </View>
        ) :
          (
            <View />
          )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dropDownMenu: {
    position: 'relative',
  },
  menuButton: {
    padding: 3,
  },
  menuBox: {
    position: 'absolute',
    top: 23,
    width: 120,
  },
  menuContent: {
    padding: 5,
  },
  lastMenuContent: {
    padding: 5,
  },
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

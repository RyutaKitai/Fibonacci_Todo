import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Dropdown from './Dropdown';
import CheckBox from '../elements/CheckBox';
// state = {
//   checkedId: -1,
//   checkboxes: [{ id: "yes", title: "Yes" }, { id: "no", title: "No" }]
// }

// handleCheck = (checkedId) => {
//   this.setState({ checkedId })
// }

// render() {
//   const { checkboxes, checkedId } = this.state
//   return (
//     <View>
//       {checkboxes.map(checkbox => (
//         <CheckBox
//           center
//           key={checkbox.id}
//           title={checkbox.title}
//           checked={checkbox.id == checkedId}
//           onPress={() => this.handleCheck(checkbox.id)}
//         />
//       )}
//       <View>
//    )
//       }

class MemoList extends React.Component {
  render() {
    return (
      <View style={styles.memoList}>
        <View style={styles.memoListItem}>
          <CheckBox style={styles.check} />
          <TextInput style={styles.memoListTitle} />
          <Dropdown />
        </View>
        <View style={styles.memoListItem}>
          <CheckBox style={styles.check} />
          <TextInput style={styles.memoListTitle} />
          <Dropdown />
        </View>
        <View style={styles.memoListItem}>
          <CheckBox style={styles.check} />
          <TextInput style={styles.memoListTitle} />
          <Dropdown />
        </View>
        <View style={styles.memoListItem}>
          <CheckBox style={styles.check} />
          <TextInput style={styles.memoListTitle} />
          <Dropdown />
        </View>
        <View style={styles.memoListItem}>
          <CheckBox style={styles.check} />
          <TextInput style={styles.memoListTitle} />
          <Dropdown />
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  memoList: {
    width: '100%',
    flex: 1,
  },
  memoListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#a2a2a2',
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
  },
  check: {
  },
  memoListTitle: {
    fontSize: 18,
    margin: 10,
    width: '70%',
  },
  memoListDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: '#61C8FF',
  },
  pulldown: {
    flex: 1,
  },
});

export default MemoList;

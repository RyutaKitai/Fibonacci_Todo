import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CheckBox from '../elements/CheckBox';

class MemoList extends React.Component {
  render() {
    return (
      <View style={styles.memoList}>
        <View style={styles.memoListItem}>
          <CheckBox>◯</CheckBox>
          <Text style={styles.memoListTitle}>今日の天気</Text>
        </View>
        <View style={styles.memoListItem}>
          <Text style={styles.memoListTitle}>アイテム</Text>
        </View>
        <View style={styles.memoListItem}>
          <Text style={styles.memoListTitle}>アイテム</Text>
        </View>
        <View style={styles.memoListItem}>
          <Text style={styles.memoListTitle}>アイテム</Text>
        </View>
        <View style={styles.memoListItem}>
          <Text style={styles.memoListTitle}>アイテム</Text>
        </View>
      </View>
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
  },
  memoListTitle: {
    fontSize: 18,
    marginBottom: 4,
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
});

export default MemoList;

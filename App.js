import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.appbar}>
        <View>
          <Text style={styles.appbarTitle}>Todolist</Text>
        </View>
      </View>
      <View style={styles.memoList}>
        <View style={styles.memoListItem}>
          <Text style={styles.memoListTitle}>アイテム</Text>
          <Text style={styles.memoListDate}>2020/12/19</Text>
        </View>
        <View style={styles.memoListItem}>
          <Text style={styles.memoListTitle}>アイテム</Text>
          <Text style={styles.memoListDate}>2020/12/19</Text>
        </View>
        <View style={styles.memoListItem}>
          <Text style={styles.memoListTitle}>アイテム</Text>
          <Text style={styles.memoListDate}>2020/12/19</Text>
        </View>
        <View style={styles.memoListItem}>
          <Text style={styles.memoListTitle}>アイテム</Text>
          <Text style={styles.memoListDate}>2020/12/19</Text>
        </View>
        <View style={styles.memoListItem}>
          <Text style={styles.memoListTitle}>アイテム</Text>
          <Text style={styles.memoListDate}>2020/12/19</Text>
        </View>
      </View>
      <View style={styles.memoAddButton}>
        <Text style={styles.memoButtonText}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 90,
  },
  appbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    paddingTop: 30,
    backgroundColor: '#61C8FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    zIndex: 10,
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 25,
  },
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
  memoAddButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 48,
    height: 48,
    backgroundColor: '#000',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 10,
  },
  memoButtonText: {
    fontSize: 40,
    lineHeight: 40,
    color: '#fff',
  },
});

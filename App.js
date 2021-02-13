import React from 'react';
import { StyleSheet, View } from 'react-native';
import MemoListScreen from './src/screens/MemoListScreen';
// import MemoListLogin from './src/screens/MemoListLogin';
// import MemoSignUp from './src/screens/MemoSignUp';
import AppBar from './src/components/AppBar';

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <MemoListScreen />
      {/* <MemoListLogin /> */}
      {/* <MemoSignUp /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEFFFF',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 90,
  },

});

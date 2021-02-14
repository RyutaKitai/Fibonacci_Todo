import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MemoDetail from '../components/MemoDetail';

class MemoListDetail extends React.Component {
  render() {
    return (
      <View>
        <MemoDetail />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txt: {
    color: 'black',
  },
});

export default MemoListDetail;

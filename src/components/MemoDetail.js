import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class MemoDetail extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.above}>
          <Text style={styles.title}>今日の天気</Text>
          <Text style={styles.date}>2020/2/14</Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.txt}>天気いいね〜</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txt: {
    color: 'black',
  },
});

export default MemoDetail;

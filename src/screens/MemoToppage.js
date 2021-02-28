import React from 'react';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import Button from '../elements/Button';
// import SQLiteData from '../../db/db';

class MemoToppage extends React.Component {
  render() {
    // const db = SQLiteData();
    // const data = SQLiteShow();
    return (
      <View style={styles.whole}>
        <View style={styles.container}>
          <Text style={styles.title}>Top画面</Text>
          <Image
            style={{ width: 200, height: 200, marginVertical: 30 }}
            resizeMode="contain"
            // eslint-disable-next-line global-require
            source={require('../../assets/fibo-todo2.png')}
          />
          <Button onPress={() => { this.props.navigation.navigate('Memolist'); }}>
            メモする
          </Button>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            広告
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  whole: {
    height: '100%',
    width: '100%',
  },
  container: {
    margin: 30,
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    backgroundColor: '#61C8FF',
    color: '#FFFFFF',
    padding: 20,
    paddingHorizontal: 120,
    fontSize: 20,
    marginVertical: 40,
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 30,
    borderWidth: 1,
    // paddingHorizontal: 210,
  },
  footerText: {
    padding: 10,
    paddingHorizontal: 210,
    paddingVertical: 20,
    fontSize: 20,
  },
});

export default MemoToppage;

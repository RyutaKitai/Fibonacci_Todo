import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Button from '../elements/Button';

class MemoListLogin extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>ログイン画面</Text>
          <View style={styles.box}>
            <TextInput value="ユーザーネーム" />
          </View>
          <View style={styles.box}>
            <TextInput value="パスワード" />
          </View>
        </View>
        <Button onPress={() => { this.props.navigation.navigate('Memolist'); }}>ログインする</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 30,
    marginTop: 10,
  },
  box: {
    borderWidth: 5,
    borderColor: '#61C8FF',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 15,
    width: 270,
    marginBottom: 20,
    borderRadius: 5,
  },
  title: {
    backgroundColor: '#61C8FF',
    // fontWeight: '500',
    color: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    borderWidth: 4,
    borderColor: '#61C8FF',
    alignItems: 'center',
    width: 200,
    padding: 15,
    alignSelf: 'center',
    backgroundColor: 'skyblue',
  },
  buttonTxt: {
    color: '#FFFFFF',
  },
});

export default MemoListLogin;
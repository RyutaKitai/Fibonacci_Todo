import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, TextInput, Button } from 'react-native';

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
          {/* <Button title="ログインする" style={styles.button} /> */}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text style={styles.buttonTxt}> ログインする </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    marginTop: 160,
  },
  box: {
    borderWidth: 4,
    borderColor: '#61C8FF',
    alignItems: 'center',
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
    fontSize: 30,
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

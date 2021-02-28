import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function PrivacyPolicy() {
  return (
    <View style={styles.privacyCon}>
      <View style={styles.header}>
        <Text style={styles.title}>プライバシーポリシー</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.subTitle}>ストレージ</Text>
        <Text style={styles.text}> ー 追加したTodoリスト情報をユーザーのスマートフォンストレージに追加するために使用しています。</Text>
        <Text style={styles.subTitle}>その他</Text>
        <Text style={styles.text}> ー 広告のためのインターネット接続</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  privacyCon: {
    flex: 1,
    alignContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  body: {
    paddingTop: 30,
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 40,
  },
  subTitle: {
    paddingTop: 30,
    fontSize: 30,
  },
  text: {
    paddingTop: 30,
    fontSize: 20,
  },
});

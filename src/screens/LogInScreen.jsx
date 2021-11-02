import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';

export default function LogInScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 画面の表示時に一度だけ実行される処理
  useEffect(() => {
    // ユーザがログインしているか監視するメソッド
    // 帰り値として、このメソッドを停止するメソッドを返す
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // 一度ログインしている場合
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
      }
    });
    // useEffectの標準機能として、returnされたメソッドを画面が消えたタイミングで実行する
    // 結果としてログイン監視のメソッドを停止してくれる
    // アンマウントと呼ばれる
    return unsubscribe;
  }, []);

  const handlePress = () => {
    // ログインメソッド(EmailとPassword)
    firebase.auth().signInWithEmailAndPassword(email, password)
      // ログイン成功
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
      })
      // ログイン失敗
      .catch((error) => {
        console.log(error.code);
        Alert.alert(error.code);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text); }}
          // 頭文字を小文字にする（デフォルトは大文字が入る）
          autoCapitalize="none"
          // 端末のキーボードタイプを指定する
          keyboardType="email-address"
          // ユーザが入力するまで薄く文字が表示され、ナビゲーションする
          placeholder="Email Address"
          // iOSキーチェーンを有効にする
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text); }}
          autoCapitalize="none"
          placeholder="Password"
          // パスワードマスク（falseに指定することで表示)
          secureTextEntry
          // iOSキーチェーンを有効にする
          textContentType="password"
        />
        <Button
          label="Log In"
          onPress={handlePress}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not register?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'SingUp' }],
              });
            }}
          >
            <Text style={styles.footerLink}>Sing up here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderColor: '#dddddd',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  buttonCantainer: {
    backgroundColor: '#A43F3F',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: '#ffffff',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#A43F3F',
  },
  footer: {
    flexDirection: 'row',
  },
});

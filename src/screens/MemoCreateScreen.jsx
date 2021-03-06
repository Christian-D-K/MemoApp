import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  // Keyboard,
} from 'react-native';

import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';
import Loading from '../components/Loading';

export default function MemoCreatecreen(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    // ログイン中のユーザ情報を取得
    const { currentUser } = firebase.auth();
    // DB接続
    const db = firebase.firestore();
    // 参照先を設定、なけりゃ作ってくれる
    const ref = db.collection(`users/${currentUser.uid}/memos`);
    // 参照先(collection)へ以下の値を追加（add）
    // KeyとValueが同じ場合は、一つ書けばいい
    ref.add({
      bodyText,
      updatedAt: new Date(),
    })
      // 参照先(document)の諸データが「docRefに格納されてくる」
      .then(() => {
        // 端末標準の戻るボタンを表示
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('メモの作成に失敗しました ¥n', error.code);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardSafeView style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          // 複数行入力設定
          multiline
          style={styles.input}
          // returnキーを押すとキーボードが閉じる
          // （複数行テキスト、multiline)が設定されているとゴミ機能になるので注意
          // onSubmitEditing={Keyboard.dismiss}
          onChangeText={(text) => { setBodyText(text); }}
          // 勝手にキーボードが出てくる
          // falseに設定した場合、テキストフォールドのタップで登場
          autoFocus
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
      />
    </KeyboardSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 27,
    paddingVertical: 32,
  },
  input: {
    flex: 1,
    fontSize: 16,
    // Androidはデフォルトでセンターになってしまうので、調整
    textAlignVertical: 'top',
    lineHeight: 24,
  },
});

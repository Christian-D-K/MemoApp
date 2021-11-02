import React, { useState } from 'react';
import { shape, string } from 'prop-types';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';

export default function MemoEditScreen(props) {
  const { navigation, route } = props;
  const { id, bodyText } = route.params;
  const [body, setBody] = useState(bodyText);

  const handlePress = () => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      // アップデート処理
      // 書き込むデータを特定する
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      // 指定したオブジェクト情報で上書き（第一引数: 上書きするデータ, 第二引数: アップデートオプション）
      // オプション{ marge: true }を指定することで、第一引数にわたしたデータ以外は何もしない（作成日などがあった場合、これを上書きしない）
      ref.set({
        bodyText: body,
        updatedAt: new Date(),
      }, { marge: true })
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert(error.code);
        });
    }
  };

  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          multiline
          style={styles.input}
          onChangeText={(text) => setBody(text)}
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
      />
    </KeyboardSafeView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({ id: string, bodyText: string }),
  }).isRequired,
};

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

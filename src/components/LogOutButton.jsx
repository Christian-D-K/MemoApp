import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import firebase from 'firebase';

// 通常、navigationはpropsとしてメソッドを取得した場合は、jsx内でしか使用できない
// そのため、jsx外で使用する場合は一度以下のようにインポートする必要がある
import { useNavigation } from '@react-navigation/native';

export default function LogOutButton() {
  // navigationを有効化
  const navigation = useNavigation();

  // 関数代入を使っているのは、ES Lintの制約に「jsx内で関数を呼び出すな」というものがあるため
  // 一度、変数として定義しなくてはES Lintエラーになるからだ
  const handlePress = () => {
    // サインアウト
    firebase.auth().signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      })
      .catch(() => {
        Alert.alert('ログアウトに失敗しました');
      });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.label}>Log out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

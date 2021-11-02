import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
// memosはオブジェクト配列なので、shapeで受け取り
// shape内で型を指定するので、stringも定義
// Date型はinstanceOfというメソッドで型定義する
import {
  shape,
  string,
  instanceOf,
  arrayOf,
} from 'prop-types';
import firebase from 'firebase';

// Date型のフォーマッター
import { dateToString } from '../utils';

export default function MemoList(props) {
  const { memos } = props;
  const navigation = useNavigation();

  const deleteMemo = (id) => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      // 選択肢つきアラートを設定（セオリーとして、ネガティヴオプション、ポジティブオプションの順番で作成する
      Alert.alert('メモを削除します', 'よろしですか？', [
        {
          // ボタンのメッセージ
          text: 'キャンセル',
          // ボタンの押下処理
          onPress: () => {},
        },
        {
          text: '削除する',
          // ボタンスタイル（destructiveは文字が赤くなる）
          style: 'destructive',
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert('削除に失敗しました');
            });
          },
        },
      ]);
    }
  };

  // Flatlistに渡すレンダリングコンポーネント
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.memoListItem}
      // 情報を詳細画面で取得するためにnavigationに遷移先情報と、IDを渡す
      onPress={() => { navigation.navigate('MemoDetail', { id: item.id }); }}
    >
      <View>
        <Text
          style={styles.memoListItemTitle}
          // 表示する行数指定（これがないとタイトル表示だけでなく、コンテンツも表示される）
          numberOfLines={1}
        >
          {item.bodyText}
        </Text>
        {/* 最終更新日付をフォーマットして表示 */}
        <Text style={styles.memoListItemDate}>{dateToString(item.updatedAt)}</Text>
      </View>
      <TouchableOpacity
        style={styles.memoDelete}
        onPress={() => deleteMemo(item.id)}
      >
        <Feather name="x" size={22} color="#B0B0B0" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    // スクロールが発生すると、スクロールバーの左に空白ができる場合があるので、スタイルで余白を詰める
    <View style={styles.container}>
      {/* 表示されている部分だけをレンダリングする便利コンポーネント */}
      <FlatList
        // Propsから渡ってきたデータを取得する
        data={memos}
        // コンポーネントを返す関数を設定
        renderItem={renderItem}
        // Mapの場合は、Map内でKeyを設定するが、Flatの場合ここでKeyを設定する
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

MemoList.propTypes = {
  memos: arrayOf(shape({
    id: string,
    bodyText: string,
    // Dateの指定は以下の方法
    updatedAt: instanceOf(Date),
  })).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  memoDelete: {
    padding: 8,
  },
});

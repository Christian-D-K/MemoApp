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

import { dateToString } from '../utils';

export default function MemoList(props) {
  const { memos } = props;
  const navigation = useNavigation();

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
        <Text style={styles.memoListItemDate}>{dateToString(item.updatedAt)}</Text>
      </View>
      <TouchableOpacity
        style={styles.memoDelete}
        onPress={() => {
          Alert.alert('マジで消すんやがええのか？');
        }}
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

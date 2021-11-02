import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
} from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function MemoListScreen(props) {
  const { navigation } = props;
  // firestoreから取得したデータをコンポーネントに渡すためのステートを定義
  const [memos, setMemos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // navigationの右側にコンポーネントを渡すことで、ヘッダーにコンポーネントを表示してくれる
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  // firebaseの仕組みとして、ストア内のデータが書き変わるたびに更新される
  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    // unsubscribeが条件分岐の中で定義されると、アンマウントメソッドが動かなくなるので、一旦外で空メソッドとして定義しておく
    let unsubscribe = () => {};
    // currentUserが存在しない場合もあるので、条件分岐で担保する
    if (currentUser) {
      setLoading(true);
      // 並び替えを行う（今回は最終更新日） asc = 昇順 desc = 降順
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc');
      // 接続したコレクションのデータを取得する（snapshot)内に入ってくる
      // コレクションの監視をストップするメソッド（unsubscribeに入ってくる）の取得も忘れずに行う
      unsubscribe = ref.onSnapshot((snapshot) => {
        // コレクションデータ全てを格納する配列
        const userMemos = [];
        // snapshotは配列なので、全てのデータを取り出すためにforEachを使用
        snapshot.forEach((doc) => {
          // idにデータID、data()に実際のデータがオブジェクトで入ってくる
          // 取得データを格納
          const data = doc.data();
          // forEachで取得データを全て以下の形式で格納
          userMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            // fireStoreではTimeStampで格納されてくるので、Date型に切り替えるのも忘れずに
            updatedAt: data.updatedAt.toDate(),
          });
        });
        // Stateのmemosに取得した配列をセット
        setMemos(userMemos);
        setLoading(false);
      // onSnapshotの第二引数にはerrorが入ってくる
      }, (error) => {
        setLoading(false);
        Alert.alert('メモの取得に失敗しました', error.code);
      });
    }
    // アンマウントメソッド（監視の終了）
    // userが存在しない場合は、空メソッドが呼ばれる（letで定義ずみ）
    return unsubscribe;
  }, []);

  // メモの内容が0件の場合のレンダリング
  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading} />
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>最初のメモを作成しよう！</Text>
          <Button
            label="最初のメモを作成"
            style={emptyStyles.button}
            onPress={() => { navigation.navigate('MemoCreate'); }}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    alignSelf: 'center',
  },
});

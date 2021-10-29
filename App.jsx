import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.appbar}>
        {/* Header items */}
        <View style={styles.appberInner}>
          <Text style={styles.appbarTitle}>Memo App</Text>
          <Text style={styles.appberRight}>Log out</Text>
        </View>
      </View>
      {/* Memo list */}
      <View>
        {/* Memo list items */}
        <View style={styles.memoListItem}>
          {/* Contents */}
          <View>
            <Text style={styles.memoListItemTitle}>買い物リスト</Text>
            <Text style={styles.memoListItemDate}>2020/12/24 10:00</Text>
          </View>
          {/* Delete button */}
          <View>
            <Text>X</Text>
          </View>
        </View>
        <View style={styles.memoListItem}>
          {/* Contents */}
          <View>
            <Text style={styles.memoListItemTitle}>買い物リスト</Text>
            <Text style={styles.memoListItemDate}>2020/12/24 10:00</Text>
          </View>
          {/* Delete button */}
          <View>
            <Text>X</Text>
          </View>
        </View>
        <View style={styles.memoListItem}>
          {/* Contents */}
          <View>
            <Text style={styles.memoListItemTitle}>買い物リスト</Text>
            <Text style={styles.memoListItemDate}>2020/12/24 10:00</Text>
          </View>
          {/* Delete button */}
          <View>
            <Text>X</Text>
          </View>
        </View>
      </View>
      {/* Add button */}
      <View style={styles.circleButton}>
        <Text style={styles.circleButtonLabel}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  appbar: {
    width: '100%',
    height: 104,
    backgroundColor: '#A43F3F',
    justifyContent: 'flex-end',
  },
  appberInner: {
    alignItems: 'center',
  },
  appberRight: {
    position: 'absolute',
    right: 19,
    bottom: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  appbarTitle: {
    marginBottom: 8,
    fontSize: 22,
    lineHeight: 32,
    color: '#ffffff',
    fontWeight: 'bold',
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
  circleButton: {
    backgroundColor: '#A43F3F',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    bottom: 40,
    // iOSのみ対応しているstyleプロパティ
    shadowColor: '#4F1B1B',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Androidのみ対応しているstyleプロパティ
    elevation: 8,
  },
  circleButtonLabel: {
    color: '#ffffff',
    fontSize: 40,
    lineHeight: 40,
  },

});

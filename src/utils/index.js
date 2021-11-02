import { format } from 'date-fns';

export function dateToString(date) {
  if (!date) { return ''; }
  return format(date, 'yyyy年M月d日 HH:mm');
}

export function transLateErrors(code) {
  const error = { title: '不明なエラー', description: '時間をおいてお試しください' };
  switch (code) {
    case 'auth/invalid-email':
      error.title = '不正なメールアドレス';
      error.description = 'メールアドレスの形式をお確かめください';
      break;
    case 'auth/user-disabled':
      error.title = '無効なアカウント';
      error.description = '既に削除済みのアカウントの可能性があります。再度会員登録をしてください';
      break;
    case 'auth/user-not-found':
      error.title = 'ユーザーが見つけられません';
      error.description = 'ログインページ中央の Sign Up here から会員登録をしてください';
      break;
    case 'auth/wrong-password':
      error.title = '謝ったパスワード';
      error.description = '正しいパスワードをお確かめの上、再度ログインをお試しください';
      break;
    case 'auth/email-already-in-use':
      error.title = 'このEメールアドレスは既に使用されています';
      error.description = '別のメールアドレスをご利用いただく又は、このページ中央の Log In からログインしてください';
      break;
    case 'auth/operation-not-allowed':
      error.title = '不正な操作';
      error.description = '開発者にお問い合わせください';
      break;
    case 'auth/weak-password':
      error.title = '推測が容易なパスワード';
      error.description = 'より複雑なパスワードで再度お試しください';
      break;
    default:
  }

  return error;
}

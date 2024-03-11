/* 引入jsencrypt实现数据RSA加密 */
import JSEncrypt from 'jsencrypt'; // 处理长文本数据时报错 jsencrypt.js Message too long for RSA
/* 引入encryptlong实现数据RSA加密 */
import Encrypt from 'encryptlong'; // encryptlong是基于jsencrypt扩展的长文本分段加解密功能。

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKeyBack =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCw8q+iJ3WUfybDNOwzUHsU4rD0T7KrTchfc8WCmrM14Kfylji9IPN5EwgxZe7J/N1+9k4JYgwsgoP+xTgrQHFj5VFXzrbpNILwCk9dUntJWU5M+nIJr494Nr7hgw117OdNAzDHlfTBOLX3RB3Esew1aKwc3KrnepexXYEkTdM4KQIDAQAB';
// 公钥key
const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRwlGxIDfFImjcr8kPhRrlTMoI93xNBwp2YwLGfpHfY/DkdicErraDtT/hDlGfCQnv8TUCXQhrZYA6URRCvmuja29tx0jkcq8rgNPO/4/9ZlxEsAM9C/IL72+52pVuIdskQrhwWtp0h0KjD/KPJvR6d9kyujNNGofina+NfeVcmwIDAQAB';
// 私钥key
const privateKey = `MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBANHCUbEgN8UiaNyv
yQ+FGuVMygj3fE0HCnZjAsZ+kd9j8OR2JwSutoO1P+EOUZ8JCe/xNQJdCGtlgDpR
FEK+a6Nrb23HSORyryuA087/j/1mXESwAz0L8gvvb7nalW4h2yRCuHBa2nSHQqMP
8o8m9Hp32TK6M00ah+Kdr4195VybAgMBAAECgYBqo2WwrPZtbE7vUxbeowbHaECW
SmuRJXE2OqPgkdxLO53uJ/syMDhtwSmWmxb3yTqaF4ChkPaE0vdbrnikbfZ+FDH/
QpsLLUdTcTB/IHwWWnHGpdt8QjwCzuhmaHxxIgoc2Fpz2ivTveQRt2F6DHaw1WfR
frcHtIsvzncwMfxUUQJBAPd1YowiB2oByqpQylsZFWLKgvjJIfXXcML8vQ5jEoxN
QsUE9q2sTGttAOwbUh6MRwRvXRGRoWA14tsRNN/gkn8CQQDY/8+KbZ11NgRHMvAa
wDdVrLO/+EW7a7iMZFEzv7T8cUqRRMzSqb1Df5Suw+k4p2lADTnJVCAXLTkVAlWo
Yy/lAkB+dBvh5FnJkBTSp+pgVxcYnsgC/jU+fdN/sMujmHkX/TtLlte/tDZxBwjb
nrJ+Lcz0tTvoCHVgxuigbdCJPyddAkB76T9qzYMfPjQdMAIZVG+ElbSixzOSfUWJ
rXMM+MhxaoPpBf9rwA9aLs0JKsfPWRFpyOOZilc0xNcWnxmoqNLdAkBgQcSpNeS5
ZK0nfN3Z6Z9H9x1Ba9sTLv1Le5bTPMI1+/Cc9Ua27XjUl7tmTW1YyL7/0YItM9wS
WGUe14GM4iyY`;

export default {
  /* JSEncrypt加密 */
  rsaPublicData(data) {
    var jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(publicKey);
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = jsencrypt.encrypt(data);
    return result;
  },
  /* JSEncrypt解密 */
  rsaPrivateData(data) {
    var jsencrypt = new JSEncrypt();
    jsencrypt.setPrivateKey(privateKey);
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = jsencrypt.encrypt(data);
    return result;
  },
  /* 加密 */
  encrypt(data) {
    const PUBLIC_KEY = publicKeyBack;
    var encryptor = new Encrypt();
    encryptor.setPublicKey(PUBLIC_KEY);
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    const result = encryptor.encryptLong(data);
    return result;
  },
  /* 解密 - PRIVATE_KEY - 验证 */
  decrypt(data) {
    const PRIVATE_KEY = privateKey;
    var encryptor = new Encrypt();
    encryptor.setPrivateKey(PRIVATE_KEY);
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = encryptor.decryptLong(data);
    return result;
  }
};

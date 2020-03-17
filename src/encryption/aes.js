/**
 * 工具类(aes加密)
 */
import Vue from 'vue'
import CryptoJS from 'crypto-js'
//加密
let str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']



export function encrypt(word, keyStr) {
  let randomKeyStr = "";
  for (let i = 0; i < 16; i++) {
    let num = Math.floor(Math.random() * str.length);
    randomKeyStr += str[num];
  }
  keyStr = keyStr ? keyStr : randomKeyStr;
  var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return {
    value: encrypted.toString(),
    key: keyStr
  };
}
//解密
// export function decrypt(word, keyStr) {
//   keyStr = keyStr ? keyStr : randomKeyStr;
//   var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
//   var decrypt = CryptoJS.AES.decrypt(word, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
//   });
//   return CryptoJS.enc.Utf8.stringify(decrypt).toString();
// }

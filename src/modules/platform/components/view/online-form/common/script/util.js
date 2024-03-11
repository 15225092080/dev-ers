import http from '@/common/script/http.js';
export async function getDic(url, typeId) {
  let systemId = sessionStorage.getItem('systemId') || 'systemId';
  let result = [];
  if (!sessionStorage[systemId + '_' + typeId]) {
    const res = await http.apiGet(url, { params: { typeId, systemId } });
    if (res.data && JSON.stringify(res.data) !== '{}') {
      for (let key in res.data) {
        result.push({ label: res.data[key], value: key });
      }
    }
    sessionStorage[systemId + '_' + typeId] = JSON.stringify(result);
  } else {
    result = JSON.parse(sessionStorage[systemId + '_' + typeId]);
  }
  return arrayUnique(result, 'value');
}
export function deleteDic(dicArr) {
  let systemId = sessionStorage.getItem('systemId') || 'systemId';
  dicArr.forEach(item => {
    sessionStorage.removeItem(systemId + '_' + item);
  });
}
export function arrayUnique(arr, name) {
  // 去重
  var hash = {};
  return arr.reduce(function(item, next) {
    hash[next[name]] ? (hash[next[name]] = '') : (hash[next[name]] = true && item.push(next));
    return item;
  }, []);
}
export function getCurrentDate(isTime) {
  const date = new Date();
  const sep1 = '-';
  const year = date.getFullYear();
  var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  if (isTime) {
    const h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    const i = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    const s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    return year + sep1 + month + sep1 + day + ' ' + h + ':' + i + ':' + s;
  } else {
    return year + sep1 + month + sep1 + day;
  }
}
// 判断是不是空数组对象
export function isNullArray(array) {
  if (!array || array.length === 0) {
    return true;
  }
  if (array.length === 1) {
    let obj = array[0];
    if (!obj.field || obj.val === null || obj.val === '' || !obj.rule) {
      return true;
    }
  }
  return false;
}
// 去掉数组中的空对象
export function removeEmptyObject(array, hasOptions = true) {
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (item === null || Object.keys(item).length <= 0) {
      array.splice(i--, 1);
    } else {
      if (!hasOptions && Array.isArray(item.options)) {
        delete item.options;
      }
    }
  }
  return array;
}
/**
 * 过滤对象中为空的属性
 * @param {object} obj
 * @returns {object} {*}
 */
export function filterObj(obj) {
  if (!(typeof obj == 'object')) {
    return obj;
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === undefined || obj[key] === '')) {
      delete obj[key];
    }
  }
  return obj;
}
export function uidGenerator() {
  return '-' + parseInt(Math.random() * 10000 + 1, 10);
}
export function getFileName(path) {
  if (path.lastIndexOf('\\') >= 0) {
    let reg = new RegExp('\\\\', 'g');
    path = path.replace(reg, '/');
  }
  return path.substring(path.lastIndexOf('/') + 1);
}
/**
 * 获取文件服务访问路径
 * @param {stirng} avatar
 * @param {stirng} subStr
 * @returns {stirng} {*}
 */
export function getFileUrl(avatar, subStr) {
  if (!subStr) subStr = 'http';
  if (avatar && avatar.startsWith(subStr)) {
    return avatar;
  } else if (avatar && avatar.length > 0) {
    const pre = process.env.API_ROOT_PLATFORM;
    return pre + 'sys/common/static/' + avatar;
  } else {
    return '';
  }
}
/**
 * 字典值替换文本通用方法
 * @param {object} dictOptions  字典数组
 * @param {stirng} text  字典值
 * @return {string} String
 */
export function filterDictText(dictOptions, text) {
  if (text !== null && Array.isArray(dictOptions)) {
    let result = [];
    // 允许多个逗号分隔，允许传数组对象
    let splitText;
    if (Array.isArray(text)) {
      splitText = text;
    } else {
      splitText = text
        .toString()
        .trim()
        .split(',');
    }
    for (let txt of splitText) {
      let dictText = txt;
      for (let dictItem of dictOptions) {
        if (txt.toString() === dictItem.value.toString()) {
          dictText = dictItem.text || dictItem.title || dictItem.label;
          break;
        }
      }
      result.push(dictText);
    }
    return result.join(',');
  }
  return text;
}
/**
 * 字典值替换文本通用方法(多选)
 * @param {object} dictOptions  字典数组
 * @param {stirng} text  字典值
 * @return {string} String
 */
export function filterMultiDictText(dictOptions, text) {
  // js “!text” 认为0为空，所以做提前处理
  if (text === 0 || text === '0') {
    if (dictOptions) {
      for (let dictItem of dictOptions) {
        if (text == dictItem.value) {
          return dictItem.text || dictItem.label;
        }
      }
    }
  }

  if (!text || text == 'null' || !dictOptions || dictOptions.length == 0) {
    return '';
  }
  let re = '';
  text = text.toString();
  let arr = text.split(',');
  dictOptions.forEach(function(option) {
    if (option) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == option.value.toString()) {
          re += (option.text || option.label) + ',';
          break;
        }
      }
    }
  });
  if (re == '') {
    return text;
  }
  return re.substring(0, re.length - 1);
}

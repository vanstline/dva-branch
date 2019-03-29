/*
 * @Author: yangws 
 * @Date: 2018-11-12 11:41:50 
 * @Last Modified by: yangws
 * @Last Modified time: 2019-01-02 20:11:50
 */
import moment from 'moment';
import { getAuthority } from '@/utils/authority.js';
import md5 from 'js-md5';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact,
    };
  });
  return renderRoutes;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}
// let token = obj.access_token;
// let key = obj.key;
function objStringify(obj) {
  let str = '';
  for (var k in obj) {
    str += `&${k}=${obj[k]}`;
  }
  return str.slice(1);
}
export function sign(obj, simple) {
  let token = getAuthority('access_token');
  let key = getAuthority('key');
  // token = token ? token.slice(7, token.length) : undefined;

  obj.timestamp = Date.parse(new Date()) / 1000;

  if (!simple) {
    obj.access_token = token;
  }

  let keys = Object.keys(obj);
  keys.sort();
  let newObj = {};
  keys.forEach(item => {
    if (obj[item] || obj[item] === 0) {
      newObj[item] = obj[item];
    }
  });

  let stringA = objStringify(newObj);
  let stringSignTemp = `${stringA}&key=${key}`;
  let sign = md5(stringSignTemp).toUpperCase();
  newObj.signature = sign;
  return newObj;
}
const type = obj => {
  const types = Object.prototype.toString.call(obj).split(' ');
  return types.length >= 2 ? types[1].slice(0, types[1].length - 1) : '';
};

const buildParams = (prefix, obj, add) => {
  var name;

  if (Array.isArray(obj)) {
    // Serialize array item.
    obj.forEach((i, v) => {
      // Item is non-scalar (array or object), encode its numeric index.
      buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, add);
    });
  } else if (type(obj) === 'Object') {
    // Serialize object item.
    for (name in obj) {
      buildParams(prefix + '[' + name + ']', obj[name], add);
    }
  } else {
    // Serialize scalar item.
    add(prefix, obj);
  }
};

// key/values into a query string
export const enCodeChar = data => {
  const r20 = /%20/g;
  let prefix;
  let s = [];
  let add = (key, value) => {
    // If value is a function, invoke it and return its value
    value = type(value) === 'function' ? value() : value;
    if (value === null || value === undefined) return;
    s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  };
  for (prefix in data) {
    buildParams(prefix, data[prefix], add);
  }
  // Return the resulting serialization
  return s.join('&').replace(r20, '+');
};
export const getParams = url => {
  const params = url.split('?')[1];
  const paramsArr = params.split('&');
  let obj = {};
  paramsArr.map(item => {
    const items = item.split('=');
    obj[items[0]] = items[1];
  });
  return obj;
};

// 两个浮点数求和
export const accAdd = (num1, num2) => {
  var r1, r2, m;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  // return (num1*m+num2*m)/m;
  return Math.round(num1 * m + num2 * m) / m;
};

// 两个浮点数相减
export const accSub = (num1, num2) => {
  var r1, r2, m, n;
  if (isNaN(num1)) {
    num1 = 0;
  }
  if (isNaN(num2)) {
    num2 = 0;
  }
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
};
// 两数相除
export const accDiv = (num1, num2) => {
  var t1, t2, r1, r2;
  try {
    t1 = num1.toString().split('.')[1].length;
  } catch (e) {
    t1 = 0;
  }
  try {
    t2 = num2.toString().split('.')[1].length;
  } catch (e) {
    t2 = 0;
  }
  r1 = Number(num1.toString().replace('.', ''));
  r2 = Number(num2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
};
//两个相乘
export const accMul = (num1, num2) => {
  var m = 0,
    s1 = num1.toString(),
    s2 = num2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
};
/**
 * Function formatMoney 数值转或货币格式
 *  -@param {Number} number 要转换的数值
 *  -@param {Number} places 保留小数点位数
 *  -@param {String} symbol 货币符号
 *  -@param {String} thousand 间隔符
 *  -@param {String} decimal 小数位符号
 * Return {String}
 */
export const formatMoney = (num, places, symbol, thousand = ',', decimal = '.') => {
  num = num || 0;
  places = !isNaN((places = Math.abs(places))) ? places : 2;
  symbol = symbol !== undefined ? symbol : '￥';

  var negative = num < 0 ? '-' : '',
    i = parseInt((num = Math.abs(+num || 0).toFixed(places)), 10) + '',
    j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
    (places
      ? decimal +
        Math.abs(num - i)
          .toFixed(places)
          .slice(2)
      : '')
  );
};
//判断是否是微信浏览器的函数
export const isWeiXin = () => {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
};

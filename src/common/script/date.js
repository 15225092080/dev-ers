// import {
//   version
// } from 'punycode';
const tickDate = {
  tickToLong(tick) {
    let seconds = tick / 1000;
    let h = Math.floor(seconds / 60 / 60);
    let m = Math.floor((seconds - 60 * 60 * h) / 60);
    let s = Math.floor(seconds - 60 * 60 * h - 60 * m);
    return h + ':' + m + ':' + s;
  },
  tickToTime(tick) {
    let date = new Date(tick);
    let h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    let i = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    let s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    return h + ':' + i + ':' + s;
  }
};

const install = function (vm) { // 插件必须有这样一个install方法。
  vm.prototype._date = tickDate;
};
export default { install };

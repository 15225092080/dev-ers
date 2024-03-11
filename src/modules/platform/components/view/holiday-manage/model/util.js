/**
 * 获取指定时间年月
 * @returns {string} 格式：202112
 */
export function getYearMonth(val){
    let date = new Date(val);
    let curYear = date.getFullYear();
    let curMonth = date.getMonth()+1;
    return curYear + "" + appendzero(curMonth);
}
/**
 * 格式化年月日
 * @param day
 * @returns {string}
 */
export function formatYearMonthDay(day){
    return day.replaceAll("-", "");
}
/**
 * 获取周几
 * @param day
 * @returns {number}
 */
export function getWeek(day){
    let dateSplit = day.split("-");
    let date = new Date(dateSplit[0], parseInt(dateSplit[1] - 1), dateSplit[2]);
    return date.getDay();
}
// 月份补零
function appendzero(obj){
    if(obj<10) return "0" + obj;
    else return obj;
}

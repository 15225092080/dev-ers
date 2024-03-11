let filterObj = {
    filterDic(val, format) {
        if (!val) {
            return '';
        }
        if (typeof(format) === 'function') {
            return format(val);
        } else {
            // console.log(JSON.parse(sessionStorage[sessionStorage.getItem('systemId')+'_'+format.type])[val])
            return JSON.parse(sessionStorage[sessionStorage.getItem('systemId') + '_' + format.type])[val];
        }
    }
};
export default filterObj;
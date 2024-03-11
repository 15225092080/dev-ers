let obj = {};
export const recursion = (parent, formItem) => {
    if (parent.$el.className.includes('querypage')) {
        parent.form = formItem;
        parent.queryPage();
    } else {
        parent = parent.$parent;
        recursion(parent, formItem);
    }
};
export const closeDialog = (parent) => {
    if (parent.$children[0].$el.className.includes('el-dialog__wrapper')) {
        parent.$emit('update:vis', false);
        // 关闭方法应该需要两个，一个刷新，一个不刷新
        // 当dataTable存在时，执行刷新方法
        if (parent.$parent.$refs.dataTable) {
            parent.$parent.$refs.dataTable.getTableData();
        }
    } else {
        parent = parent.$parent;
        closeDialog(parent);
    }
};
export const filterArray = (array) => {
    return array.filter(item => item);
};
export const changeDic = (data) => {
    data.map((item) => {
        if (item.children) {
            changeDic(item.children);
        }
        if (item.code && item.value) {
            obj[item.code] = item.value;
        } else {
            obj[item.params.resourceId] = item.params.resourceName;
        }
    });
    return obj;
};
export const getTree = async (i, _this) => {
    let response = await _this.http.apiGet(i.treeurl);
    sessionStorage[sessionStorage.getItem('systemId') + '_' + i.name] = JSON.stringify(changeDic(response.data || response));
    _this.search_IN_org = i.name;
    setTimeout(() => {
        _this.search_IN_orgId_fake = JSON.parse(sessionStorage[sessionStorage.getItem('systemId') + '_' + i.name])[_this.formItem[i.name]];
    }, 200);
};
export const upload = async (file, _this) => {
    if (file.length > 0) {
        _this.$refs.upload[0].active = true;
    }

    // if(file.length)
};
export const deepcopyArr = (arr) => {
    var outarr = [],
        len = arr.length;
    for (var i = 0; i < len; i++) {
        outarr[i] = [];
        for (var j = 0; j < arr[i].length; j++) {
            outarr[i][j] = arr[i][j];
        }
    }
    return outarr;
};

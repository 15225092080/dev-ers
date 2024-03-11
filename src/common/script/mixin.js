import Bus from './bus';
export default {
    data() {
        return {

        };
    },
    created() {},
    mounted() {},
    methods: {
        /* 详情页数据 */
        archiveInfo(num, row) {
            let paramData = {};
            paramData[this.detailUrl.paramDataId] = this.detailUrl.resId;
            this.http
                .apiPost(this.detailUrl.url, paramData)
                .then(res => {
                    if (res.code == '00000001') {
                        this.$message.error(res.msg);
                        this.endLoading();
                    } else {
                        if (row) {
                            this.paramDetail.id = row.id;
                        }
                        // 上传文件相关
                        if (res.id && this.detailUrl.status) {
                            setTimeout(() => {
                                setTimeout(() => {
                                    this.selectArchive(res.id);
                                }, 100);
                            }, 100);
                        }
                        // 判断是否需要调取请求授权信息的接口
                        if (this.detailUrl.flag && res[this.detailUrl.archiveId]) {
                            // 请求授权信息
                            let data = {};
                            data.id = res[this.detailUrl.archiveId];
                            this.http
                                .apiPost(this.detailUrl.authorizeUrl, data)
                                .then(resBack => {
                                    this.endLoading();
                                    res = Object.assign(resBack, res);
                                    this.visible = true;
                                    res.startDate = res.startDate.substring(0, res.startDate.length - 9);
                                    res.expireDate = res.expireDate.substring(0, res.expireDate.length - 9);
                                    this.paramDetail.form = res;
                                    if (this.detailUrl.isPreview && !this.detailUrl.status) {
                                        setTimeout(() => {
                                            // this.$refs.checkFiles.$refs.childInit.init();
                                            Bus.$emit('filesInit');
                                        }, 100);
                                    }
                                });
                        } else {
                            this.endLoading();
                            // num区分详情或编辑，0为详情，1为编辑
                            if (num == 1) {
                                this.visibleEdit = true;
                                this.paramEdit.form = res;
                            } else {
                                this.visible = true;
                                this.paramDetail.form = res;
                                // 上传文件页面返回数据文件渲染
                                if (this.detailUrl.isPreview && !this.detailUrl.status) {
                                    setTimeout(() => {
                                        // this.$refs.checkFiles.$refs.childInit.init();
                                        Bus.$emit('filesInit');
                                    }, 100);
                                }
                            }
                        }
                    }
                });
        },
        /**
         * 删除数据
         */
        delete() {
            let paramData = {};
            paramData[this.detailUrl.paramDataId] = this.detailUrl.resId;
            this.http
                .apiPost(this.detailUrl.delUrl, paramData, { showLoading: true })
                .then(res => {
                    this.common.submitMsg(res, this);
                    // if ("00000000" == res.code) {
                    //     this.$message({
                    //         message: "操作成功",
                    //         type: "success",
                    //         duration: "2000"
                    //     });
                    //     // this.closeDialog("form");
                    //     this.$refs.dataTable.getTableData();
                    // } else {
                    //     this.$message.error(res.msg);
                    // }
                });
        },
        /**
         * 编辑
         */
        updateModal() {
            // 获取表格选中行
            // console.log(this.$refs.dataTable.selectRow,this.$refs.dataTable.selectRow)
            if (this.$refs.dataTable.selectRow && this.$refs.dataTable.selectRow.length == 1) {
                this.startLoading();
                let id = this.detailUrl.id;
                this.detailUrl.resId = this.$refs.dataTable.selectRow[0][id];
                this.paramEdit.title = '编辑';
                this.archiveInfo(1);
            } else {
                this.$message({
                    showClose: true,
                    message: '请选择一条进行操作',
                    type: 'warning',
                    duration: '800'
                });
            }
            // 刷新表格数据
            // this.$refs.dataTable.getTableData();
        },
        // 清空
        reset(num) {
            if (this.search_IN_orgId_fake || this.search_EQ_operOrg_fake || this.search_EQ_deptcode_fake || this.search_EQ_operateDept_fake) {
                this.search_IN_orgId_fake = '';
                this.search_EQ_operOrg_fake = '';
                this.search_EQ_deptcode_fake = '';
                this.search_EQ_operateDept_fake = '';
            }
            if (num) {
                for (let i = 0; i < num; i++) {
                    this.$refs['child' + i].empty();
                }
            }
            if (this.form) {
                this.form = this.form;
                this.$refs.form.resetFields();
            } else if (this.formItem) {
                this.formItem = this.formItem;
                this.$refs.formItem.resetFields();
            }
            for (let i in this.form) {
                if (i != 'search_EQ_formReport') {
                    this.form[i] = '';
                }
            }
            return true;
        },
        /**
         * 新增
         */
        addFun() {
            // 改变vuex中弹框状态
            this.$store.commit('SET_OPERATSTATE', 'add');
            this.visibleEdit = true;
            this.paramEdit.title = '新增';
        },
        // 编辑
        editFun() {
            // 获取表格选中行
            if (this.$refs.dataTable.selectRow && this.$refs.dataTable.selectRow.length == 1) {
                let id = this.detailUrl.id;
                this.detailUrl.resId = this.$refs.dataTable.selectRow[0][id];
                this.paramEdit.title = '-编辑';
                // 改变vuex中弹框状态
                this.$store.dispatch('user/setOperatState', 'edit');
                // 显示弹出框
                this.visibleEdit = true;
            } else {
                this.$message({
                    showClose: true,
                    message: '请选择一条进行操作',
                    type: 'warning',
                    duration: '800'
                });
            }
            // 刷新表格数据
            this.$refs.dataTable.getTableData();
        },
        // 弹窗-详情方法
        detailFuns(row) {
            setTimeout(() => {
                this.visible = true;
                this.paramDetail.title = '-详情页'; // 标题
                let id = this.detailUrl.id;
                this.detailUrl.resId = row[id];
                let paramData = {
                    id: this.detailUrl.resId
                };
                this.http
                    .apiPost(this.detailUrl.url, paramData)
                    .then(res => {
                        this.$refs.childDetails.$refs.formItem.formItem = res;
                    });
            }, 10);
        },

        deleteFun() {
            let selectRow = this.$refs.dataTable.selectRow;
            let idArr = [];
            let id = this.detailUrl.id;

            if (selectRow.length > 0) {
                if (selectRow.length == 1) {
                    this.detailUrl.resId = selectRow[0][id];
                } else {
                    for (var i = 0; i < selectRow.length; i++) {
                        idArr.push(selectRow[i][id]);
                    }
                    this.detailUrl.resId = idArr.join(',');
                }
                this.$confirm('确认此项操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this['delete']();
                });
                // this.delete();
            } else {
                this.$message({
                    showClose: true,
                    message: '请选择1条以上进行操作！',
                    type: 'warning',
                    duration: '800'
                });
            }
        },
        // 时间格式化
        timeFormat(dateArr) {
            if (dateArr && dateArr.length == 2) {
                if(sessionStorage['systemId'] == 'DCP '){
                    return dateArr[0] + ' ~ ' + dateArr[1];
                }else{
                    return dateArr[0] + ' - ' + dateArr[1];
                }
            } else {
                return dateArr;
            }
        },
        /**
         * 查询
         */
        queryPage() {
            let dataForm = JSON.parse(JSON.stringify(this.form))
            if (this.detailUrl && this.detailUrl.isTime) {
                dataForm[this.detailUrl.isTime] = this.timeFormat(
                    dataForm[this.detailUrl.isTime]
                );
            }
            if (dataForm[this.detailUrl.startDate] && dataForm[this.detailUrl.expireDate]) {
                if (Date.parse(new Date(dataForm[this.detailUrl.startDate])) > Date.parse(new Date(dataForm[this.detailUrl.expireDate]))) {
                    this.$message.error('开始时间不能大于结束时间');
                } else {
                    this.$refs.dataTable.param.form = dataForm;
                    this.$refs.dataTable.curPage = 1;
                    this.$refs.dataTable.getTableData();
                }
            } else {
                this.$refs.dataTable.param.form = dataForm;
                this.$refs.dataTable.curPage = 1;
                this.$refs.dataTable.getTableData();
            }
        },
        detailFun(row) {
            setTimeout(() => {
                this.startLoading();
                let id = this.detailUrl.id;
                this.detailUrl.resId = row[id];
                this.archiveInfo(0, row);
            }, 10);
        },
        exportBtn(url, flag) { // 导出 flag参数作用于不需要传ID的导出
            let form = JSON.parse(JSON.stringify(this.$refs.filter.$refs.formItem.formItem));
            if (this.detailUrl && this.detailUrl.isTime) {
                form[this.detailUrl.isTime] = this.timeFormat(form[this.detailUrl.isTime]);
            }
            var arr = [];
            var paramData;
            //   if (flag !== 'undefined') {
            if (flag) {
                // for (let item in form) {
                //     str += item + "=" + form[item] + "&";
                // }
                // window.location.href = url + "?" + str;
                this.common.downLoad(url, form);
            } else {
                this.selected_row = this.$refs.dataTable.selectRow;
                if (this.selected_row && this.selected_row.length == 1) {
                    paramData = this.selected_row[0][this.detailUrl.id];
                } else if (this.selected_row.length > 1) {
                    for (var i = 0; i < this.selected_row.length; i++) {
                        arr.push(this.selected_row[i][this.detailUrl.id]);
                    }
                    paramData = arr.join();
                } else if (this.$refs.dataTable.tableData === null || this.$refs.dataTable.tableData.length == 0) {
                    this.$message.error('无数据可导出');
                    return;
                } else {
                    paramData = '';
                }
                // for (let item in form) {
                //     str += item + "=" + form[item] + "&";
                // }
                form.ids = paramData;
                if (form.search_GTE_LTE_bussDate_DATE_RANGE === null) {
                    form.search_GTE_LTE_bussDate_DATE_RANGE = '';
                }
                this.common.downLoad(url, form);
                // window.location.href = url + "?" + str + "ids=" + paramData;
            }
        },
        // 关闭弹框页面
        closeDialog() {
            this.$parent.visibleEdit = false;
            this.$parent.visible = false;
        },
        // 分割线
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // 分割线
        // 平台3.0新增
        addModal(routepath) { // 临时简易可配置跳转方式
            // 改变vuex中弹框状态
            if (window.top.location.href.indexOf('iframe') != -1) {
                window.top.eventBus.$emit('tagShow', false);
            }
            this.$store.dispatch('user/setOperatState', 'add');
            if (typeof routepath == 'string' && routepath) {
                this.$router.push({
                    path: routepath
                });
            } else {
                this.visibleEdit = true;
                this.paramEdit.title = '-创建';
            }
        },
        // 平台3.0弹窗编辑  行内的编辑按钮不需选中勾选框
        editModal(row, routepath) {
            if (window.top.location.href.indexOf('iframe') != -1) {
                window.top.eventBus.$emit('tagShow', false);
            }
            this.$store.dispatch('user/setOperatState', 'edit');
            let id = this.detailUrl.id; // 所谓的value吧
            let param = this.detailUrl.paramDataId;
            if (routepath) {
                // 改变vuex中弹框状态
                this.$router.push({
                    path: routepath,
                    query: {
                        [param]: row[id]
                    }
                });
            } else {
                this.detailUrl.resId = row[id];
                this.detailUrl.userId = row.userId;
                this.detailUrl.resCode = row.orgCode;
                this.paramEdit.title = '-编辑';
                this.visibleEdit = true;
                // 显示弹出框
            }
        },
        // 返回按钮
        goBack(obj) {
            if (window.top.location.href.indexOf('iframe') != -1) {
                window.top.eventBus.$emit('tagShow', true);
                this.$router.push({ path: obj.path });
                return;
            }
            this.$store.dispatch('user/setOperatState', '');
            this.$router.push({ path: obj.path });
        },
        // 详情页面显示
        showdetailDialog(row, routepath) {
            if (window.top.location.href.indexOf('iframe') != -1) {
                window.top.eventBus.$emit('tagShow', false);
            }
            this.$store.dispatch('user/setOperatState', '');
            let id = this.detailUrl.id;
            let param = this.detailUrl.paramDataId;
            if (routepath) {
                this.$router.push({
                    path: routepath,
                    query: {
                        [param]: row[id]
                    }
                });
            } else {
                setTimeout(() => {
                    this.detailUrl.resId = row[id];
                    // 显示详情页
                    this.visible = true;
                    this.paramEdit.title = '-详情';
                }, 10);
            }
        },
        deleted(row) {
            let that = this;
            if (row.userId && row.userId == localStorage.getItem('ms_userId')) {
                that.common.message(true, '用户仅可操作本人部分信息', 'error', '2000');
            } else {
                let key = that.detailUrl.paramDataId;
                let value = row[that.detailUrl.id];
                this.common.MessageBoxconfirm('确定删除？', '', '确定', '取消', 'warning', true, function(action) {
                    if (action == 'confirm') {
                        that.http.apiGet(that.detailUrl.delUrl, {
                            params: {
                                [key]: value
                            }
                        }).then(res => {
                            that.common.submitMsg(res, that);
                        });
                    }
                });
            }
        },
        callback(formItem, name, param) {
            let that = this;
            let formData = this.$refs[formItem];
            if (this.$store.getters.arrListFormData[name] && this.paramEdit.id) {
                let formItemData = {};
                for (let k in formData.formItem) {
                    if (formData.formItem[k]) {
                        formItemData[k] = formData.formItem[k];
                    } else if (formData.formItem[k] === null) {
                        formItemData[k] = '';
                    }
                }
                param = Object.assign(this.$store.getters.arrListFormData[name], formItemData);
            } else {
                for (let k in formData.formItem) {
                    if (!formData.formItem[k]) {
                        formData.formItem[k] = '';
                    }
                }
            }
            // param = Object.assign(this.$refs[formItem].formItem, {'bussNum': this.$store.getters.arrListFormItem.bussNum, deptCode: this.$store.getters.arrListFormItem.deptCode});
            this.$refs[formItem].$refs[formItem].validate(valid => {
                if (valid) {
                this.http.apiPost(this.url, param).then(res => {
                    this.$store.dispatch('user/setModaltState', '');
                    that.common.submitMsg(res).then(() => {
                    Bus.$emit(name);
                    this.$refs.formItem.close();
                    });
                });
                } else {
                this.common.message(true, '验证不通过，提交失败', 'warning', '800', function () {
                    return false;
                });
                }
            });
        }
    }
};

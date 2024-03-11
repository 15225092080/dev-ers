const getters = {
roles: state => state.user.roles, // 拥有权限
permission_routes: state => state.permission.routes,
operatState: state => state.user.operatState, // 当前操作状态 ‘创建’：add‘编辑’：edit
modelState: state => state.user.modelState, // 当前操作状态 ‘创建’：add‘编辑’：edit 这个是在编辑中的新增
tipStatus: state => state.user.tipStatus,
arrListFormItem: state => state.user.arrListFormItem, // 当前操作状态 ‘创建’：add‘编辑’：edit 这个是在编辑中的新增
arrListFormData: state => state.user.arrListFormData, // 当前页面所有表单数据
getLoginStatus: state => {
    if (state.user.login_router_status === null) {
        state.user.login_router_status = sessionStorage.getItem('login_router_status');
    }
    return JSON.stringify(state.user.login_router_status);
  },
  buttons: state => state.user.buttons,
  tagsList: state => state.user.tagsList,
  tableData: state => state.table.tableData,
  tagStatus: state => state.table.tagStatus,
  reloadList: state => state.table.reloadList,
  token: state => state.user.token
};
export default getters;

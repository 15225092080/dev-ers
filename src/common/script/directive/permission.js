import store from '@/store';
import Vue from 'vue';
// 注册全局指令
Vue.directive('permission', {
    // bind声明周期, 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
    bind() {},
    // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
    inserted(el, binding) {
        const { value } = binding;
        const buttons = store.getters && store.getters.buttons;
        // 代码未写自定义指令时，权限控制不生效
        if ( !value || !value[0]) {
            return;
        }
        if (value && value instanceof Array && value.length > 0) {
            const permissionRoles = value;
            const hasPermission = Object.keys(buttons).some(role => {
                return permissionRoles.includes(role);
            });
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    },
    // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
    update() {},
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated() {},
    unbind() {}
});

Vue.directive('dicFilter', {
    // bind声明周期, 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
    //   bind(el, binding, vnode, oldVnode) {
    //   },
    // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
    update(el, binding) {
        const val = binding.value.val;
        const format = binding.value.format;
        const that = binding.value.that;
        const systemId = sessionStorage.getItem('systemId');
        if (format.dicFun) {
            format.dicFun(el, val, format);
            return;
        }
        const param = format.type + val[format.followName];
        if (typeof format.dicUrl != 'undefined' && !sessionStorage.getItem(systemId + '_' + param)) {
            that.http.apiGet(format.dicUrl, { params: { type: param } }).then((res) => {
                sessionStorage[systemId + '_' + param] = JSON.stringify(res);
                el.innerText = JSON.parse(sessionStorage[systemId + '_' + format.type + val[format.followName]])[val[format.changeName]];
            });
        } else {
            el.innerText = JSON.parse(sessionStorage[systemId + '_' + format.type + val[format.followName]])[val[format.changeName]];
        }
    },
    bind(el, binding) {
        const val = binding.value.val;
        const format = binding.value.format;
        const that = binding.value.that;
        const systemId = sessionStorage.getItem('systemId');
        if (format.dicFun) {
            format.dicFun(el, val, format);
            return;
        }
        const param = format.type + val[format.followName];
        if (typeof format.dicUrl != 'undefined' && !sessionStorage.getItem(systemId + '_' + param)) {
            that.http.apiGet(format.dicUrl, { params: { type: param } }).then((res) => {
                sessionStorage[systemId + '_' + param] = JSON.stringify(res);
                el.innerText = JSON.parse(sessionStorage[systemId + '_' + format.type + val[format.followName]])[val[format.changeName]];
            });
        } else {
            el.innerText = JSON.parse(sessionStorage[systemId + '_' + format.type + val[format.followName]])[val[format.changeName]];
        }
    }
});
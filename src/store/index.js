import Vue from 'vue';
import 'babel-polyfill';
import vuex from 'vuex';
import getters from './getters';
import createPersistedState from 'vuex-persistedstate';
Vue.use(vuex);
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((module, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    module[moduleName] = value['default'];
    return module;
}, {});
export default new vuex.Store({
    modules,
    getters,
    plugins: [
        createPersistedState()
    ]
});
// 2019/12/19vuex仓库整理
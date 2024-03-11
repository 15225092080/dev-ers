const state = {
  tableData: [],
  tagStatus: true,
  reloadList: true
};
const mutations = {
  SET_TABLEDATA(statestatus, payload) {
    statestatus.tableData = payload;
  },
  SET_TAG_STATUS(statestatus, payload) {
    statestatus.tagStatus = payload;
  },
  SET_RELOAD_LIST(statestatus, payload) {
    statestatus.reloadList = payload;
  }
};
const actions = {
  setTableData({ commit }, Status) {
    // 这里的state是参数 并不是store里的状态
    return new Promise(resolve => {
      commit('SET_TABLEDATA', Status);
      resolve();
    });
  },
  setTagStatus({ commit }, Status) {
    // 这里的state是参数 并不是store里的状态
    return new Promise(resolve => {
      commit('SET_TAG_STATUS', Status);
      resolve();
    });
  },
  setReloadList({ commit }, Status) {
    // 这里的state是参数 并不是store里的状态
    return new Promise(resolve => {
      commit('SET_RELOAD_LIST', Status);
      resolve();
    });
  }
};
export default {
    namespaced: true, // 命名空间，不建议删
    state,
    mutations,
    actions
};
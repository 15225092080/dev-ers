import url from '@/common/api/url';
import axios from 'axios';
const state = {
  systemId: sessionStorage.systemId,
  login_router_status: {},
  operatState: '',
  modelState: '',
  arrListFormItem: '',
  arrListFormData: {},
  roles: [],
  buttons: [],
  token: '',
  tagsList: [],
  tipStatus:false
};
const mutations = {
  SET_OPERATSTATE(statestatus, payload) {
      statestatus.operatState = payload;
  },
  SET_TAGSLIST(statestatus, payload) {
    statestatus.tagsList = payload;
  },
  SET_MODALSTATE(statestatus, payload) {
      statestatus.modelState = payload;
  },
  LOGIN_ROUTER_STATUS(statestatus, payload) {
      sessionStorage.setItem('login_router_status', JSON.stringify(payload));
      statestatus.login_router_status = payload;
  },
  SET_ROLES: (statestatus, roles) => {
      statestatus.roles = roles;
  },
  SET_BUTTON_PERMISSION(statestatus, btnpermission) {
      statestatus.buttons = btnpermission;
  },
  SET_FORM_ITEM(statestatus, payload) {
      statestatus.arrListFormItem = payload;
  },
  SET_FORM_DATA(statestatus, payload) {
      statestatus.arrListFormData = payload;
  },
  SET_TOKEN(statestatus, token) {
      statestatus.token = token;
  },
  SET_TIP_STATUS(statestatus, payload) {
  statestatus.tipStatus = payload;
}
};
const actions = {
  setOperatState({ commit }, Status) {
      return new Promise(resolve => {
          commit('SET_OPERATSTATE', Status);
    resolve();
  });
},
setTagsList({commit}, Status) {
  return new Promise(resolve => {
    commit('SET_TAGSLIST', Status);
    resolve();
  });
},
setTipStatus({commit}, Status) {
  return new Promise(resolve => {
    commit('SET_TIP_STATUS', Status);
          resolve();
      });
  },
  setModaltState({ commit }, Status) { // 这里的state是参数 并不是store里的状态
      return new Promise(resolve => {
          commit('SET_MODALSTATE', Status);
          resolve();
      });
  },
  setFormItem({ commit }, Status) {
      return new Promise(resolve => {
          commit('SET_FORM_ITEM', Status);
          resolve();
      });
  },
  setFormData({ commit }, Status) {
      return new Promise(resolve => {
          commit('SET_FORM_DATA', Status);
          resolve();
      });
  },
  setToken({ commit }, Status) {
      return new Promise(resolve => {
          commit('SET_TOKEN', Status);
          resolve();
      });
  },
  setLoginStatus({ commit }, Status) {
      return new Promise(resolve => {
          commit('LOGIN_ROUTER_STATUS', Status);
          resolve();
      });
  },
  // get user info
  getInfo({ commit }) {
      return new Promise((resolve, reject) => {
          axios.get(url.common.menu, {
              params: {
                  systemId: sessionStorage.systemId
              }
          }).then((response) => {
              if (!response.data) {
                  // reject('Verification failed, please Login again.');
              }
              const {
                  data
              } = response.data;
              // if (!data || data.length <= 0) {


                // }
                commit('SET_ROLES', data);
                resolve(response.data);
            }, (response) => {
                reject(response);
            });
        });
    },
    getbuttonInfo({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get(url.common.getButtonPermissions, {
                params: {
                    systemId: sessionStorage.systemId
                }
            }).then((response) => {
                if (!response.data) {
                    // reject('Verification failed, please Login again.');
                }
                const { data } = response.data;
                if (!data || data.length <= 0) {
                    // reject('getInfo: roles must be a non-null array!');
                }
                commit('SET_BUTTON_PERMISSION', data);
                resolve(response.data);
            }, (response) => {
                reject(response);
            });
        });
    },
    // remove token
    resetRoles({ commit }) {
        return new Promise(resolve => {
            commit('SET_ROLES', []);
            localStorage.removeItem('ms_username');
            resolve();
        });
    },
    // 权限变更调用
    changeRoles({ dispatch }) {
        return new Promise(async resolve => {
            dispatch('getInfo');
            dispatch('getbuttonInfo');
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

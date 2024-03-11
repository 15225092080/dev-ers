import { constantRoutes } from '@//modules/platform/router';

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role));
    } else {
        return true;
    }
}

export function filterAsyncRoutes(routes, roles) {
    const res = [];

    routes.forEach(route => {
        const tmp = {...route };
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles);
            }
            res.push(tmp);
        }
    });

    return res;
}

const state = {
    routes: [],
    addRoutes: []
};

const mutations = {
    SET_ROUTES: (statestatus, routes) => {
        // state.addRoutes = routes
        // state.routes = constantRoutes.concat(routes)
        statestatus.routes = routes;
    }
};

const actions = {
    generateRoutes({ commit }) {
        return new Promise(resolve => {
            let accessedRoutes;
            accessedRoutes = constantRoutes;
            //   if (roles.includes('admin')) {
            //     accessedRoutes = asyncRoutes || []
            //   } else {
            //     accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            //   }
            commit('SET_ROUTES', constantRoutes);
            resolve(accessedRoutes);
        });
    }
};

export default {
    namespaced: true, // 命名空间，不建议删
    state,
    mutations,
    actions
};
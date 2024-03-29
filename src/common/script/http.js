import "babel-polyfill";
import promise from "es6-promise";
import axios from "axios";
import store from "../../store"; // 引用vuex
import { Loading } from "element-ui";
promise.polyfill();
let loading; // 定义loading变量
function startLoading() {
    // 使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: "加载中……",
        background: "rgba(0, 0, 0, 0.7)"
    });
}

function endLoading() {
    // 使用Element loading-close 方法
    loading.close();
}
// 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) {
        return;
    }
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
}

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (config.method == "post") {
            if (!(config.data instanceof FormData)) {
                config.data = {
                    ...config.data,
                    _t: Date.parse(new Date()) / 1000
                };
            }
            if (store.getters.token) {
                config.headers.Authorization = store.getters.token; // post放在请求中
            }
            if (config.showLoading) {
                showFullScreenLoading();
            }
        } else if (config.method == "get") {
            config.params = {
                _t: Date.parse(new Date()) / 1000,
                ...config.params
            };
            if (store.getters.token) {
                config.headers.Authorization = store.getters.token; // get放在请求头中
            }
            if (config.showLoading) {
                showFullScreenLoading(); // 为什么get请求配置config不生效呢？所以get请求没有办法像post请求那样可配置所以没办法像post那样判断if (config.showLoading)
            }
        }
        return config;
    },
    error => {
        tryHideFullScreenLoading();
        return Promise.reject(error);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // if (response.config.showLoading) {
        //     tryHideFullScreenLoading()
        // }
        if (response) {
            tryHideFullScreenLoading();
        }
        return response;
    },
    error => {
        tryHideFullScreenLoading();
        return Promise.reject(error);
    }
);
export default {
    // get请求
    apiGet: function(url, data, config) {
        return new Promise((resolve, reject) => {
            axios.get(url, data, config).then(
                response => {
                    resolve(response.data);
                },
                response => {
                    reject(response);
                }
            );
        });
    },
    apiPost: function(url, data, config) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, data, config)
                .then(response => {
                    resolve(response.data);
                })
                ["catch"](response => {
                    reject(response);
                });
        });
    },
    apiDelete: function(url, id) {
        return new Promise((resolve, reject) => {
            axios.post(url + id).then(
                response => {
                    resolve(response.data);
                },
                response => {
                    reject(response);
                }
            );
        });
    },
    apiPut: function(url, id, obj) {
        return new Promise((resolve, reject) => {
            axios.put(url + id, obj).then(
                response => {
                    resolve(response.data);
                },
                response => {
                    reject(response);
                }
            );
        });
    }
};

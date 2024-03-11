import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export const asyncRoutes = [
  {
    path: '/iframe',
    component: resolve => require(['../components/common/iframe.vue'], resolve),
    meta: { title: 'iframe' }
  },
  {
    path: '/blank',
    component: resolve => require(['../components/common/blank.vue'], resolve)
  },
  {
    path: '/platform',
    component: resolve => require(['@/modules/platform/components/view/home/index.vue'], resolve),
    meta: { title: '系统首页' }
  },
  {
    path: '/system-user',
    component: resolve => require(['@/modules/platform/components/view/user-manage/index.vue'], resolve),
    meta: {
      title: '用户管理',
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/system-user-edit',
    component: resolve => require(['@/modules/platform/components/view/user-manage/model/edit.vue'], resolve),
    meta: {
      icon: 'yonghuguanli',
      noShowTag: true
    }
  },
  {
    path: '/system-user-detail',
    component: resolve => require(['@/modules/platform/components/view/user-manage/model/detail.vue'], resolve),
    meta: { noShowTag: true }
  },
  {
    path: '/system-role',
    component: resolve => require(['@/modules/platform/components/view/role-manage/index.vue'], resolve),
    meta: { title: '角色管理', keepAlive: true }
  },
  {
    path: '/system-resource',
    component: resolve => require(['@/modules/platform/components/view/menu-manage/index.vue'], resolve),
    meta: { title: '资源管理', keepAlive: true }
  },
  {
    path: 'security-audit',
    component: () => import('@/modules/platform/components/view/security-audit/index'),
    meta: { title: '安全审计', icon: 'table' },
    children: [
      {
        path: '/actionLog',
        component: resolve => require(['@/modules/platform/components/view/security-audit/user-operation-log/index.vue'], resolve),
        meta: { title: '用户操作日志', keepAlive: true }
      },
      {
        path: '/loginLog',
        component: resolve => require(['@/modules/platform/components/view/security-audit/user-access-log/index.vue'], resolve),
        meta: { title: '用户访问日志', keepAlive: true }
      }
    ]
  },
  {
    path: '/system-notice',
    component: resolve => require(['@/modules/platform/components/view/system-message/index.vue'], resolve),
    meta: { title: '公告管理', keepAlive: true }
  },
  {
    path: '/system-configBase',
    component: resolve => require(['@/modules/platform/components/view/system-param/index.vue'], resolve),
    meta: { title: '系统参数', keepAlive: true }
  },
  {
    path: '/system-configBussiness',
    component: resolve => require(['@/modules/platform/components/view/service-param/index.vue'], resolve),
    meta: { title: '业务参数', keepAlive: true }
  },
  {
    path: '/system-dic',
    component: resolve => require(['@/modules/platform/components/view/data-dictionary-manage/index.vue'], resolve),
    meta: { title: '数据字典', keepAlive: true }
  },
  {
    path: '/system-org',
    component: resolve => require(['@/modules/platform/components/view/org-manage/index.vue'], resolve),
    meta: { title: '机构管理', keepAlive: true }
  },
  {
    path: '/system-org-detail',
    component: resolve => require(['@/modules/platform/components/view/org-manage/model/detail.vue'], resolve),
    meta: { noShowTag: true }
  },
  {
    path: '/system-org-edit',
    component: resolve => require(['@/modules/platform/components/view/org-manage/model/edit.vue'], resolve),
    meta: { icon: 'jigouguanli', noShowTag: true }
  },
  {
    path: '/system-corporationOrg',
    component: resolve => require(['@/modules/platform/components/view/corporation-org/index.vue'], resolve),
    meta: { title: '法人机构管理', keepAlive: true }
  },
  {
    path: '/system-corporationUser',
    component: resolve => require(['@/modules/platform/components/view/corporation-user/index.vue'], resolve),
    meta: { title: '法人及系统用户管理' }
  },
  {
    path: '/holiday-manage',
    component: resolve => require(['@/modules/platform/components/view/holiday-manage/index.vue'], resolve),
    meta: { title: '节假日管理' }
  },
  {
    path: '/online-data-dictionary',
    component: resolve => require(['@/modules/platform/components/view/online-form/data-dictionary/index.vue'], resolve),
    meta: { title: 'Online数据字典', keepAlive: true }
  },
  {
    path: '/online-form',
    component: resolve => require(['@/modules/platform/components/view/online-form/config/index.vue'], resolve),
    meta: { title: 'Online表单开发' }
  },
  {
    path: '/online-form-copy',
    component: resolve => require(['@/modules/platform/components/view/online-form/config/copy/index.vue'], resolve),
    meta: { title: '复制表单' }
  },
  {
    path: '/online-form-view',
    name: 'online-form-view',
    component: resolve => require(['@/modules/platform/components/view/online-form/templateView/index.vue'], resolve),
    meta: { title: 'AUTO在线表单', hasPageKey: true }
  },
  {
    path: '/404',
    component: resolve => require(['@/common/components/404.vue'], resolve),
    meta: { title: '404' }
  },
  {
    path: '/403',
    component: resolve => require(['@/common/components/403.vue'], resolve),
    meta: { title: '403' }
  }
];
export const constantRoutes = [
  {
    path: '/',
    redirect: '/platform'
  },
  {
    path: '/',
    component: resolve => require(['@/modules/platform/components/common/index.vue'], resolve),
    meta: { title: '首页' },
    children: asyncRoutes
  },
  {
    path: '/login',
    component: resolve => require(['@/modules/platform/components/common/login.vue'], resolve)
  },
  {
    path: '/notice',
    component: resolve => require(['@/modules/platform/components/common/notice.vue'], resolve)
  },
  {
    path: '/homePage',
    component: resolve => require(['@/modules/platform/components/common/homePage.vue'], resolve)
  },
  {
    path: '/checkFingerprint',
    component: resolve => require(['@/modules/platform/components/common/checkFingerprint.vue'], resolve)
  },
  {
    path: '/changePwd',
    component: resolve => require(['@/modules/platform/components/common/changePwd.vue'], resolve)
  },
  {
    path: '/userInfoDetail',
    component: resolve => require(['@/modules/platform/components/common/userInfoDetail.vue'], resolve)
  }
];
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

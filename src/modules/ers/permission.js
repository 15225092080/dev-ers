import router from './router';
import store from '../../store'; // 引用vuex
import '@/common/script/directive/permission';
import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css'; // 进度条style
NProgress.configure({ showSpinner: false });
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const role = localStorage.getItem('ms_username');
  const total = from.path.split('/').length - 1;
  const str = to.redirectedFrom;
  if (str && total > 1 && (str.indexOf('system') > -1)) {
    const nextTo = str.split('/');
    next('/' + nextTo[nextTo.length - 1]);
  }
  if (role) {
    if (to.path === '/login') {
      next('/');
      NProgress.done();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) { // 如果已经有权限就跳转路由
        next();
      } else {
        try {
        //   const {data} = await store.dispatch('user/getInfo');
        //   const button = await store.dispatch('user/getbuttonInfo');
          store.dispatch('user/getInfo');
          //   store.dispatch('user/getbuttonInfo');
          // const accessRoutes = await store.dispatch('permission/generateRoutes', data) 2019/12/18目前还没做到这一步,暂时没有实现动态路由
          next();
        //   next({
        //     ...to,
        //     replace: true
        //   });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetRoles');
          next('/login');
          NProgress.done();
        }
      }
    }
  } else {
    next();
    NProgress.done();
  }
});
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
})
;

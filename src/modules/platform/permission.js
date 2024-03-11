import '../../assets/style/theme-dh/index.css'; // 深蓝主题
import '../../assets/style/main.css';
import '../../assets/style/tree.css';
import '../../assets/style/icon.css';
import '../../assets/iconfont/iconfont.css'; // 字体图标
import router from './router';
import store from '../../store'; // 引用vuex
import '@/common/script/directive/permission';
import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css'; // 进度条style
NProgress.configure({
  showSpinner: false
});
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const role = localStorage.getItem('ms_username');
  if (role) {
    if (to.path === '/login') {
      // 进入登录页时判断当前是否处于登录状态，如已登录直接跳转到选项目界面；
      let userId = localStorage.getItem('ms_userId');
      //  判断跳转如果跳转首页 用路由跳转
      if (userId) {
        router.push('/homePage');
      } else {
        next();
      }
      NProgress.done();
    } else if (to.path == '/changePwd') {
      next();
      NProgress.done();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        // 如果已经有权限就跳转路由
        next();
      } else {
        try {
          next();
          await store.dispatch('user/getInfo');
          await store.dispatch('user/getbuttonInfo');
          // if(to.path == '/changePwd'){
          //     next();
          // }else{
          // const {data} = await store.dispatch('user/getInfo')
          // const button = await store.dispatch('user/getbuttonInfo')
          // const accessRoutes = await store.dispatch('permission/generateRoutes', data) 2019/12/18目前还没做到这一步,暂时没有实现动态路由
          // next({
          //     ...to,
          //     replace: true
          // })
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
});

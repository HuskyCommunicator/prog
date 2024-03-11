import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import MainBox from "@/views/MainBox.vue";
import routesConfig from "./config.js";
import store from "@/stores/index.js";
import notFound from "@/views/notFound/index.vue";

// 创建一个新的路由器实例
const router = createRouter({
  // 使用 hash 模式的路由历史
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 定义路由规则
  routes: [
    { path: "/login", name: "login", component: Login },
    { path: "/mainbox", name: "mainbox", component: MainBox },
    { path: "/:pathMatch(.*)*", component: notFound },
  ],
});

// 在每次路由跳转前都会调用此拦截器
router.beforeEach((to, from, next) => {
  // 检查用户是否已登录
  const isLogin = localStorage.getItem("token");
  // 检查路由是否已配置
  const isRouterConfigured = store.state.isGetterRouter;

  // 如果用户正在尝试访问登录页面，或者用户已登录并且路由已配置，则无条件放行
  if (to.name === "login" || (isLogin && isRouterConfigured)) {
    next();
  }
  // 如果用户已登录但路由未配置，则需要先配置路由
  else if (isLogin && !isRouterConfigured) {
    configRouter();
    next({ path: to.fullPath });
  }
  // 如果用户未登录，则重定向到登录页面
  else {
    next({ path: "/login" });
  }
});

// 配置路由的函数
const configRouter = () => {
  // 如果 mainbox 路由尚未添加，则添加它
  if (!router.hasRoute("main")) {
    router.addRoute({
      path: "/mainbox",
      name: "mainbox",
      component: MainBox,
      // 只添加用户有权限访问的路由
      children: routesConfig.filter(checkPermission),
    });
  }
  // 将路由配置状态改为 true，表示路由已经配置
  store.commit("changeGetterRouter", true);
};

// 检查用户是否有权限访问某个路由的函数
const checkPermission = (item) => {
  // 如果路由需要管理员权限，则只有当用户角色为 1 时才返回 true
  // 如果路由不需要管理员权限，则无条件返回 true
  return !item.requireAdmin || store.state.userInfo.role === 1;
};

export default router;

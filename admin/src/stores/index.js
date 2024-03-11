import { createStore } from "vuex";

import createPersistedState from "vuex-persistedstate";
const store = createStore({
  state: {
    //应用的状态数据
    //是否配置路由
    isGetterRouter: false,
    //是否折叠
    isCollapsed: true,
    //用户信息
    userInfo: {},
  },
  getters: {
    //基于状态的计算属性
  },
  mutations: {
    //更改状态的方法
    //控制路由的配置
    changeGetterRouter(state, value) {
      state.isGetterRouter = value;
    },
    //控制侧边栏的展开
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    //改变用户信息
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value,
      };
    },
    clearUserInfo(state, value) {
      state.userInfo = {};
    },
  },
  actions: {
    //触发状态改变的方法
  },

  plugins: [
    createPersistedState({
      paths: ["isCollapsed", "userInfo"], // 只持久化存储isCollapsed状态
    }),
  ],
});
export default store;

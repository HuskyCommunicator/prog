<script setup>
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Reading,
  Pointer,
  ReadingLamp,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
const vAdmin = {
  mounted(el) {
    if (store.state.userInfo.role !== 1) {
      el.parentNode.removeChild(el);
    }
  },
};
//前往首页
const goToNews = () => {
  window.location.href = "http://localhost:5173/#/";
};
</script>
<template>
  <el-aside :width="store.state.isCollapsed ? '64px' : '240px'">
    <el-menu
      :collapse="store.state.isCollapsed"
      :collapse-transition="false"
      :router="true"
      :default-active="route.fullPath"
    >
      <el-menu-item index="/index">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="/center">
        <el-icon><Avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <!-- 用户栏 -->
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <!-- 新闻栏 -->
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon><MessageBox /></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news-manage/newsadd">添加新闻</el-menu-item>
        <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
      </el-sub-menu>
      <!-- 产品栏 -->
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon><Reading /></el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product-manage/productadd">添加产品</el-menu-item>
        <el-menu-item index="/product-manage/productlist">
          产品列表
        </el-menu-item>
      </el-sub-menu>
      <!--  -->

      <el-menu-item @click="goToNews">官网首页</el-menu-item>
      <!--  -->
    </el-menu>
  </el-aside>
</template>
<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  .el-menu {
    height: 100vh;
  }
}
</style>

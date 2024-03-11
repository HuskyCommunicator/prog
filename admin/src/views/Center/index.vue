<script setup>
import { useStore } from "vuex";
import { computed, ref, reactive } from "vue";
import Form from "./components/Form.vue";

// 使用 Vuex 的 store
const store = useStore();

// 计算属性，获取用户头像的 URL
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://127.0.0.1:3000" + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);
</script>

<template>
  <div>
    <el-page-header icon="" title="企业门户管理系统" content="个人中心" />
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>
            {{ store.state.userInfo.username }}
          </h3>
          <h3>
            {{ store.state.userInfo.role === 1 ? "管理员" : "编辑" }}
          </h3>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <!-- 表单组件 -->
          <Form />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.row {
  margin-top: 20px;
  .box-card {
    text-align: center;
  }
}
</style>

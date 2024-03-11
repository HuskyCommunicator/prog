<script setup>
// 导入所需的库和Vue功能
import { ref, reactive } from "vue";
import Upload from "@/components/upload/Upload.vue";
import { ElMessage } from "element-plus";
import upload from "@/util/upload";
import store from "@/stores";
import { useRouter } from "vue-router";

// 初始化路由
const router = useRouter();

// 初始化表单引用和表单数据
const userFormRef = ref();
const userForm = reactive({
  username: "",
  password: "",
  role: 2, // 1代表管理员，2代表编辑
  gender: 0, // 性别选择，0保密，1男，2女
  introduction: "",
  avatar: "", // 头像URL
  file: null, // 上传的文件
});

// 定义表单规则
const userFormRules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
  role: [
    {
      required: true,
      message: "请设置权限",
      trigger: "blur",
    },
  ],
  gender: [
    {
      required: true,
      message: "请选择性别",
      trigger: "blur",
    },
  ],
  introduction: [
    {
      required: true,
      message: "请输入个人介绍",
      trigger: "blur",
    },
  ],
  avatar: [
    {
      required: true,
      message: "请选择头像",
      trigger: "blur",
    },
  ],
};

// 权限选择选项
const role = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "编辑",
    value: 2,
  },
];

// 性别选择选项
const options = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

// 当文件被选择后，更新 userForm 的 avatar 和 file 属性
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};

// 提交表单方法
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      // 上传表单数据
      const res = await upload("/adminapi/user/add", userForm);
      // 如果上传成功，跳转到用户列表页面并显示成功消息
      if (res.ActionType === "OK") {
        router.push(`/user-manage/userlist`);
        ElMessage.success("添加成功");
      }
    }
  });
};
</script>
<template>
  <el-page-header icon="" title="用户管理" content="添加用户" />
  <el-form
    ref="userFormRef"
    :model="userForm"
    :rules="userFormRules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <!-- 用户名 -->
    <el-form-item label="用户名" prop="username">
      <el-input v-model="userForm.username" />
    </el-form-item>
    <!-- 密码 -->
    <el-form-item label="密码" prop="password">
      <el-input v-model="userForm.password" />
    </el-form-item>
    <!-- 权限 -->
    <el-form-item label="权限" prop="role">
      <el-select
        v-model="userForm.role"
        class="m-2"
        placeholder="Select"
        style="width: 100%"
      >
        <el-option
          v-for="item in role"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- 性别 -->
    <el-form-item label="性别" prop="gender">
      <el-select
        v-model="userForm.gender"
        class="m-2"
        placeholder="Select"
        style="width: 100%"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- 介绍 -->
    <el-form-item label="介绍" prop="introduction">
      <el-input v-model="userForm.introduction" />
    </el-form-item>
    <!-- 头像上传 -->
    <el-form-item label="头像" prop="avatar">
      <Upload :avatar="userForm.avatar" @kerwinChange="handleChange" />
    </el-form-item>
    <!-- 提交 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm()">添加用户</el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
.el-form {
  margin-top: 20px;
}
</style>

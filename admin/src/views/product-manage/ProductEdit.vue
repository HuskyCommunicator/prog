<script setup>
// 导入 Vue 的 ref 和 reactive 函数
import { ref, reactive, onMounted } from "vue";
// 导入 editor 和 Upload 组件
import Upload from "@/components/upload/Upload.vue";
// 导入 upload 工具
import upload from "@/util/upload";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const route = useRoute();
// 创建一个 ref 对象来引用表单
const productFormRef = ref();
// 创建一个响应式对象来存储表单数据
const productForm = reactive({
  title: "",
  author: store.state.userInfo.username,
  introduction: "", //介绍
  detail: "", //详细描述
  cover: "", //封面
  file: null,
  editTime: "",
});

// 表单验证规则
const productFormRules = reactive({
  title: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入产品的简要描述", trigger: "blur" },
  ],
  detail: [
    { required: true, message: "请输入产品的详细描述", trigger: "blur" },
  ],
  cover: [{ required: true, message: "请选择产品封面", trigger: "blur" }],
});

// 当文件被选择后，更新 newsForm 的 cover 和 file 属性
const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file); // 更新封面图片
  productForm.file = file; // 更新文件
};

// 提交表单方法
const submitForm = () => {
  // 验证表单
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/adminapi/product/list", productForm);
      router.back(`/product-manage/productlist`);
    }
  });
};
//跳转回上一路由
const handleBack = () => {
  router.back(`/product-manage/productlist`);
};
onMounted(async () => {
  const res = await axios.get(`/adminapi/product/list/${route.params.id}`);

  Object.assign(productForm, res.data.data[0]);
});
</script>
<template>
  <div>
    <!-- 页面头部 -->
    <el-page-header content="编辑新闻" @back="handleBack()" title="新闻管理" />
    <!-- 表单开始 -->
    <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="productFormRules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <!-- 标题输入框 -->
      <el-form-item label="产品标题" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>

      <!-- 提示作者 -->
      <el-form-item label="作者" prop="author">
        {{ productForm.author }}
      </el-form-item>
      <!-- 产品介绍 -->
      <el-form-item label="产品介绍" prop="introduction">
        <el-input v-model="productForm.introduction" />
      </el-form-item>
      <!-- 产品介绍 -->
      <el-form-item label="详细介绍" prop="detail">
        <el-input v-model="productForm.detail" />
      </el-form-item>
      <!-- 封面上传组件 -->
      <el-form-item label="产品封面" prop="cover">
        <Upload :avatar="productForm.cover" @kerwinChange="handleChange" />
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">更新产品</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单结束 -->
  </div>
</template>

<style lang="scss" scoped>
.el-form {
  margin-top: 50px; // 表单顶部外边距
}
</style>

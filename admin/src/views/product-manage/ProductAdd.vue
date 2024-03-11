<script setup>
import upload from "@/util/upload";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const productForm = reactive({
  title: "",
  introduction: "", //介绍
  detail: "", //详细描述
  cover: "", //封面
  file: null,
  editTime: "",
  author: store.state.userInfo.username,
});
const productFormRef = ref();
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
// 当文件被选择后，更新 ProductForm 的 cover 和 file 属性
const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file); // 更新封面图片
  productForm.file = file; // 更新文件
};
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("adminapi/product/add", productForm);
      router.push("/product-manage/productlist");
    }
  });
};
</script>

<template>
  <div>
    <!-- 页面头部 -->
    <el-page-header content="添加产品" icon="" title="产品管理" />
    <!-- 表单开始 -->
    <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="productFormRules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <!-- 产品名称 -->
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>
      <!-- 简要描述 -->
      <el-form-item label="产品简要描述" prop="introduction">
        <el-input
          v-model="productForm.introduction"
          autosize
          type="textarea"
          placeholder="产品的简要描述"
        />
      </el-form-item>
      <!-- 详细描述 -->
      <el-form-item label="详细描述" prop="detail">
        <el-input
          v-model="productForm.detail"
          autosize
          type="textarea"
          placeholder="产品的详细描述"
        />
      </el-form-item>
      <!-- 封面上传组件 -->
      <el-form-item label="产品封面" prop="cover">
        <Upload :avatar="productForm.cover" @kerwinChange="handleChange" />
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加产品</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单结束 -->
  </div>
</template>
<style lang="scss" scoped>
.el-form {
  margin-top: 50px;
}
</style>

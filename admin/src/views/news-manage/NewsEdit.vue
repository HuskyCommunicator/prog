<script setup>
// 导入 Vue 的 ref 和 reactive 函数
import { ref, reactive, onMounted } from "vue";
// 导入 editor 和 Upload 组件
import editor from "@/components/editor/editor.vue";
import Upload from "@/components/upload/Upload.vue";
// 导入 upload 工具
import upload from "@/util/upload";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const route = useRoute();
const isFinshed = ref(false);
// 创建一个 ref 对象来引用表单
const newsFormRef = ref();
// 创建一个响应式对象来存储表单数据
const newsForm = reactive({
  title: "", // 标题
  content: "", // 内容
  category: 1, // 类别：1最新动态 2典型案例 3通知公告
  cover: "", // 封面图片
  file: null, // 文件
  isPublish: 0, // 发布状态：0未发布 1已发布
  author: store.state.userInfo.username,
});

// 类别选择选项
const options = [
  {
    label: "最新动态",
    value: 1,
  },
  {
    label: "典型案例",
    value: 2,
  },
  {
    label: "通知公告",
    value: 3,
  },
];

// 表单验证规则
const newsFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  category: [{ required: true, message: "请选择分类", trigger: "blur" }],
  cover: [{ required: true, message: "请选择图片", trigger: "blur" }],
});

// editor 内容改变时的回调函数
const editorChange = (data) => {
  newsForm.content = data; // 更新内容
};

// 当文件被选择后，更新 newsForm 的 cover 和 file 属性
const handleChange = (file) => {
  newsForm.cover = URL.createObjectURL(file); // 更新封面图片
  newsForm.file = file; // 更新文件
};

// 提交表单方法
const submitForm = () => {
  // 验证表单
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upload("/adminapi/news/list", newsForm);
      router.back(`/news-manage/newslist`);
    }
  });
};
//跳转回上一路由
const handleBack = () => {
  router.back(`/news-manage/newslist`);
};
onMounted(async () => {
  const res = await axios.get(`/adminapi/news/list/${route.params.id}`);
  Object.assign(newsForm, res.data.data[0]);
  isFinshed.value = true;
});
</script>
<template>
  <div>
    <!-- 页面头部 -->
    <el-page-header content="编辑新闻" @back="handleBack()" title="新闻管理" />
    <!-- 表单开始 -->
    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="newsFormRules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <!-- 标题输入框 -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <!-- 内容编辑器 -->
      <el-form-item label="内容" prop="content">
        <editor
          @event="editorChange"
          :content="newsForm.content"
          v-if="isFinshed"
        />
      </el-form-item>
      <!-- 提示作者 -->
      <el-form-item label="作者" prop="author">
        {{ newsForm.author }}
      </el-form-item>
      <!-- 类别选择器 -->
      <el-form-item label="类别" prop="category">
        <el-select
          v-model="newsForm.category"
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
      <!-- 封面上传组件 -->
      <el-form-item label="封面" prop="cover">
        <Upload :avatar="newsForm.cover" @kerwinChange="handleChange" />
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">更新新闻</el-button>
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

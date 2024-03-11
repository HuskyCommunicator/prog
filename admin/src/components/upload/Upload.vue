<script setup>
import { Plus } from "@element-plus/icons-vue";
import { computed } from "vue";

// 定义组件的 props
const props = defineProps({
  avatar: String,
});

// 定义组件的 emits
const emit = defineEmits(["kerwinChange"]);

// 定义 handleChange 函数，每次选择完图片后的回调
// 当文件被选择后，触发 kerwinChange 事件，并传递原始文件对象
const handleChange = (file) => {
  emit("kerwinChange", file.raw);
};

// 计算属性 uploadAvatar，根据 props.avatar 的值来决定上传的头像 URL
// 如果 props.avatar 包含 "blob"，则直接使用 props.avatar
// 否则，将 props.avatar 添加到 "http://localhost:3000" 后面
const uploadAvatar = computed(() =>
  props.avatar.includes("blob")
    ? props.avatar
    : "http://localhost:3000" + props.avatar
);
</script>

<template>
  <!-- 使用 el-upload 组件上传头像 -->
  <!-- 设置 action 为 mock API 地址 -->
  <!-- 设置 show-file-list 为 false，不显示文件列表 -->
  <!-- 设置 auto-upload 为 false，不自动上传 -->
  <!-- 设置 on-change 为 handleChange，当文件改变时触发 -->
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChange"
  >
    <!-- 如果 props.avatar 存在，显示头像图片 -->
    <!-- 否则，显示 Plus 图标 -->
    <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<style lang="scss" scoped>
/* 设置上传组件的样式 */
:deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

/* 设置上传组件鼠标悬停时的样式 */
:deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

/* 设置上传图标的样式 */
:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

/* 设置头像图片的样式 */
.avatar {
  width: 178px;
  height: 178px;
}
</style>

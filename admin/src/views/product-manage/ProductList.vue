<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import formatTime from "@/util/formatTime.js";
import { Star, Edit, Delete, StarFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const tableData = ref([]);
const previewData = ref({});
const dialogVisible = ref(false);
//获取新闻列表数据的函数
const getTableData = async () => {
  const res = await axios.get(
    `/adminapi/product/list/author/${store.state.userInfo.username}`
  );
  tableData.value = res.data.data;
};
//加载数据
onMounted(() => getTableData());

//预览产品按钮
const handlePreview = (data) => {
  previewData.value = data;
  dialogVisible.value = true;
};
//删除产品按钮
const handleDelete = async (data) => {
  await axios.delete(`/adminapi/product/list/${data._id}`);
  getTableData();
};
//编辑产品按钮
const handleEdit = (item) => {
  // router.push("/product-manage/productedit");
  router.push(`/product-manage/productedit/${item._id}`);
};
</script>
<template>
  <div>
    <el-card>
      <!-- 页面头部 -->
      <el-page-header content="产品列表" icon="" title="产品管理" />
      <!-- 产品名称 -->
      <el-table :data="tableData">
        <el-table-column prop="title" label="产品名称" />
        <!-- 产品介绍 -->
        <el-table-column prop="introduction" label="产品介绍">
        </el-table-column>
        <!-- 编辑时间 -->
        <el-table-column label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <!-- 预览按钮 -->
          <template #default="scope">
            <el-button
              circle
              :icon="Star"
              type="success"
              @click="handlePreview(scope.row)"
            />
            <!-- 编辑按钮 -->
            <el-button circle :icon="Edit" @click="handleEdit(scope.row)" />
            <!-- 删除按钮 -->
            <el-popconfirm
              title="你确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button circle :icon="Delete" type="danger"> </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <!--  -->
      </el-table>
    </el-card>
    <!-- 对话框 -->
    <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
      <div>
        <h2>{{ previewData.title }}</h2>
        <h4>作者:{{ previewData.author }}</h4>
        <div style="font-size: 12px; color: gray">
          {{ formatTime.getTime(previewData.editTime) }}
        </div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="previewData.content" class="htmlContent"></div>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
:deep(.htmlContent) {
  img {
    max-width: 100%;
  }
}
</style>

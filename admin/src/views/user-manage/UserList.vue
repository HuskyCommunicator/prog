<script setup>
// 导入所需的库和Vue功能
import axios from "axios";
import { onMounted, ref } from "vue";

// 定义响应式引用
const tableData = ref([]);
const dialogVisible = ref(false);
const userFormRef = ref();
const userForm = ref({
  username: "",
  password: "",
  role: 2, // 1代表管理员，2代表编辑
  introduction: "",
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
  introduction: [
    {
      required: true,
      message: "请输入个人介绍",
      trigger: "blur",
    },
  ],
};

// 定义权限选择
const roleOptions = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "编辑",
    value: 2,
  },
];

// 获取角色列表数据的函数
const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list");
  tableData.value = res.data.data;
};

// 在组件挂载后立即执行获取角色列表数据的函数
onMounted(() => {
  getTableData();
});

// 编辑用户列表的函数
const handleEdit = async (data) => {
  dialogVisible.value = true;
  const res = await axios.get(`/adminapi/user/list/${data._id}`);
  userForm.value = res.data.data[0];
};

// 删除用户列表的函数
const handleDelete = async (data) => {
  await axios.delete(`/adminapi/user/list/${data._id}`);
  getTableData();
};

// 提交用户信息的函数
const handleEditConfirm = async () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      await axios.put(`/adminapi/user/list/${userForm.value._id}`, userForm);
      getTableData();
      dialogVisible.value = false;
    }
  });
};
</script>

<template>
  <div>
    <el-card>
      <el-page-header icon="" title="用户管理" content="用户列表" />
      <el-table :data="tableData">
        <!-- 头像 -->
        <el-table-column label="头像">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              />
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </div>
          </template>
        </el-table-column>
        <!-- 用户名 -->
        <el-table-column prop="username" label="用户名" />
        <!-- 权限 -->
        <el-table-column label="权限">
          <template #default="scope">
            <el-tag type="danger" v-if="scope.row.role === 1">管理员</el-tag>
            <el-tag type="success" v-else>编辑</el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="你确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <!--  -->

        <!--  -->
      </el-table>
    </el-card>
  </div>
  <!-- 弹出框 -->
  <el-dialog v-model="dialogVisible" title="Tips" width="50%">
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
            v-for="item in roleOptions"
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
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!--  -->
</template>
<style lang="scss" scope>
.el-table {
  margin-top: 40px;
}
</style>

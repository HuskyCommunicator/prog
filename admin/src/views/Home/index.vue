<script setup>
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";
import axios from "axios";

const store = useStore();
const loopList = ref([]);

const avatarUrl = computed(() => {
  const defaultAvatar = `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`;
  const userAvatar = store.state.userInfo.avatar;
  return userAvatar ? `http://127.0.0.1:3000${userAvatar}` : defaultAvatar;
});

const welcomeText = computed(() => {
  const currentHour = new Date().getHours();
  return currentHour < 12 ? "要开心每一天" : "喝杯咖啡提提神吧";
});

const getData = async () => {
  const res = await axios.get("/adminapi/product/list");
  loopList.value = res.data.data;
};

onMounted(getData);
</script>

<template>
  <div>
    <el-page-header icon="" title="企业门户管理系统" content="首页" />
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h3 style="line-height: 100px">
            欢迎回来 {{ store.state.userInfo.username }},{{ welcomeText }}
          </h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel
        :interval="2300"
        type="card"
        height="200px"
        v-if="loopList.length"
      >
        <el-carousel-item v-for="item in loopList" :key="item._id">
          <div
            :style="{
              backgroundImage: `url(http://localhost:3000${item.cover})`,
              backgroundSize: 'cover',
            }"
          >
            <h3 text="2xl" justify="center">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.box-card {
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #ffffff;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

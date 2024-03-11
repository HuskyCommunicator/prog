<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const loopList = ref([])
onMounted(async () => {
  const res = await axios.get('webapi/product/list?limit=4')

  loopList.value = res.data.data
  console.log(loopList.value)
})
</script>
<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel
      height="calc(100vh - 60px)"
      direction="vertical"
      :autoplay="false"
      v-if="loopList.length"
    >
      <!-- :src=`http://localhost:3000${item.cover}` -->
      <el-carousel-item v-for="item in loopList" :key="item._id">
        <div class="item" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
          <!--  -->
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <h2>{{ item.title }}</h2>
              </div>
            </template>
            <div>{{ item.introduction }}</div>
            <div class="detail">{{ item.detail }}</div>
            <div class="more">
              更多信息，请访问 <br />
              http://erha:8080
            </div>
          </el-card>
          <!--  -->
        </div>
      </el-carousel-item>
    </el-carousel>
    <!--  -->
    <!--  -->
    <el-empty description="暂无产品" v-else />
  </div>
</template>
<style scoped lang="scss">
.item {
  widows: 100%;
  height: 100%;
  background-size: cover;
}
.box-card {
  width: 50%;
  height: 100%;
  background-color: rgba($color: #ffffff, $alpha: 0.7);
  .detail,
  .more {
    margin-top: 20px;
  }
}
</style>

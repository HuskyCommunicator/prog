<script setup>
import axios from 'axios'
import { onBeforeUnmount, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import formatTime from '@/util/formatTime.js'
import { StarFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const currentNews = ref([])
const topNews = ref({})
const handleChange = (id) => {
  router.push(`/news/${id}`)
}
const stop = watchEffect(async () => {
  if (!route.params.id) return
  const res1 = await axios.get(`/webapi/news/list/${route.params.id}`)
  const res2 = await axios.get(`/webapi/news/toplist?limit=4`)
  currentNews.value = res1.data.data[0]
  topNews.value = res2.data.data
})
onBeforeUnmount(() => {
  stop()
})
</script>
<template>
  <el-row>
    <!-- 左侧 -->
    <el-col :span="17" :offset="1">
      <div>
        <!-- 标题 -->
        <h2>
          {{ currentNews.title }}
        </h2>
        <!-- 时间 -->
        <div class="time">{{ formatTime.getTime(currentNews.editTime) }}</div>
        <!-- 分割线 -->
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <!-- 内容 -->
        <div v-html="currentNews.content"></div>
        <!--  -->
      </div>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="4" :offset="1" :pull="1">
      <el-card style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span style="font-size: 16px; font-weight: bold">最近新闻</span>
          </div>
        </template>
        <div
          v-for="item in topNews"
          :key="item._id"
          class="text item"
          style="padding: 14px; cursor: pointer"
          @click="handleChange(item._id)"
        >
          <span>{{ item.title }}</span>
          <div class="bottom">
            <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
    <!--  -->
  </el-row>
</template>
<style scoped lang="scss">
.el-row {
  margin-top: 30px;
}
.time {
  font-size: 13px;
  color: gray;
}
</style>

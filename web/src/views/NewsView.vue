<script setup>
import image1 from '@/assets/home1.jpg'
import { computed, onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import formatTime from '@/util/formatTime.js'
import axios from 'axios'
import _ from 'lodash'
import { useRouter } from 'vue-router'
const router = useRouter()
const searchText = ref('')
const visible = ref(false)
const newsList = ref([])
const whichTab = ref(1)
const tabList = [
  {
    label: '最新动态',
    name: 1
  },
  {
    label: '典型案例',
    name: 2
  },
  {
    label: '通知公告',
    name: 3
  }
]
const tabNews = computed(() => _.groupBy(newsList.value, (item) => item.category))

const searchNewsList = computed(() =>
  searchText.value ? newsList.value.filter((item) => item.title.includes(searchText.value)) : []
)
const topNewsList = computed(() => newsList.value.slice(0, 4))
onMounted(async () => {
  const res = await axios.get('/webapi/news/list')
  newsList.value = res.data.data
})
const handleChangePage = (id) => {
  router.push(`news/${id}`)
}
</script>
<template>
  <div class="container">
    <!-- 背景图片 -->
    <div class="news-header" :style="{ backgroundImage: `url(${image1})` }"></div>
    <!-- 搜索框 -->
    <div class="search">
      <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
        <template #reference>
          <el-input
            v-model="searchText"
            placeholder="请输入新闻关键字"
            :prefix-icon="Search"
            size="large"
            :clearable="true"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <!-- 搜索结果 -->
        <div v-if="searchNewsList.length">
          <div
            v-for="data in searchNewsList"
            :key="data._id"
            class="search-item"
            @click="handleChangePage(data._id)"
          >
            {{ data.title }}
          </div>
        </div>
        <div v-else><el-empty description="暂无新闻" :image-size="50" /></div>
      </el-popover>
    </div>
    <!-- 卡片组 -->
    <div class="topnews">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id">
          <el-card shadow="hover" @click="handleChangePage(item._id)">
            <!-- 卡片图片 -->
            <div
              class="image"
              :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }"
            ></div>
            <!-- 卡片文本 -->
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 新闻分类 -->
    <el-tabs v-model="whichTab" class="demo-tabs" style="margin: 20px">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabList" :key="item.name">
        <el-row :gutter="20">
          <!-- 分类卡片 -->
          <el-col :span="18">
            <div v-for="data in tabNews[item.name]" :key="data._id" style="padding: 10px">
              <el-card shadow="hover" @click="handleChangePage(data._id)">
                <!-- 卡片图片 -->
                <div
                  class="tab-image"
                  :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }"
                ></div>
                <!-- 卡片文本 -->
                <div style="padding: 14px; float: left">
                  <span>{{ data.title }}</span>
                  <div class="bottom">
                    <time class="tab-time">{{ formatTime.getTime(data.editTime) }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <!-- 时间线 -->
          <el-col :span="6">
            <el-timeline style="max-width: 600px">
              <el-timeline-item
                v-for="(data, index) in tabNews[item.name]"
                :key="index"
                :timestamp="formatTime.getTime(item.editTime)"
              >
                {{ data.title }}
              </el-timeline-item>
            </el-timeline></el-col
          >
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!--  -->
    <el-backtop :right="100" :bottom="100" :visibility-height="100" />
  </div>
</template>
<style scoped lang="scss">
.container {
  position: relative;
}
.news-header {
  width: 100%;
  height: 400px;
  background-size: cover;
}
.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;
  .el-input {
    width: 50%;
  }
}
.search-item {
  height: 50px;
  line-height: 50px;
  &:hover {
    color: red;
    background-color: rgb(170, 168, 168);
  }
  font-size: 20px;
}
.topnews {
  margin: 20px;
  .image {
    width: 100%;
    height: 150px;
    background-size: cover;
  }
  .time {
    font-size: 13px;
    color: gray;
  }
}
.tab-image {
  width: 150px;
  height: 100px;
  background-size: cover;
  float: left;
  .tab-time {
    font-size: 13px;
    color: gray;
  }
}
</style>

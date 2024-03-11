<script setup>
import image1 from '@/assets/home1.jpg'
import image2 from '@/assets/home2.jpg'
import image3 from '@/assets/home3.jpg'
</script>

<template>
  <div class="container">
    <!--  -->
    <el-carousel height="calc(100vh - 60px)">
      <el-carousel-item :key="1">
        <div :style="{ backgroundImage: `url(${image1})` }"></div>
      </el-carousel-item>
      <!--  -->
      <el-carousel-item :key="2">
        <div :style="{ backgroundImage: `url(${image2})` }"></div>
      </el-carousel-item>
      <!--  -->
      <el-carousel-item :key="3">
        <div :style="{ backgroundImage: `url(${image3})` }"></div>
      </el-carousel-item>
    </el-carousel>
    <div class="center">互联网+时代</div>
  </div>
</template>

<style lang="scss" scoped>
.el-carousel {
  height: 100%;
}
.el-carousel div {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.container {
  position: relative;
}
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100px;
  line-height: 100px;
  font-size: 60px;
  color: white;
  text-align: center;
}
</style>

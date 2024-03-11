<script setup>
import SideMenu from "@/components/mainbox/SideMenu.vue";
import TopHeader from "@/components/mainbox/TopHeader.vue";
</script>
<template>
  <el-container>
    <SideMenu />
    <el-container direction="vertical">
      <TopHeader />
      <el-main>
        <el-empty description="未找到网页 404 not found" />
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.el-main {
  overflow: auto;
  height: calc(100vh - 60px);
}
</style>

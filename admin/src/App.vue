<script setup>
import MainBox from "./views/MainBox.vue";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

//滚动条优化
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb {
  background-color: #1890ff;
}
::-webkit-scrollbar-track {
  background-color: #ddd;
}
</style>

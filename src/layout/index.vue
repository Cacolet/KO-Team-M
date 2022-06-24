<template>
  <el-container>
    <el-aside>
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
<!--        <Tabs></Tabs>-->
      </el-header>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Menu from "./Menu/index.vue"
import Header from "./Header/index.vue"
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
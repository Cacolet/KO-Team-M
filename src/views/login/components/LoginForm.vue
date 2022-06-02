<template>
  <el-form ref="loginFormRef" :model="loginForm">

  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, inject} from "vue";
import { useRouter } from "vue-router";

// 引入login api
// import { Login } from

import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { ElMessage} from "element-plus";
import Login from "@/views/login/index.vue";

const loginForm = reactive<Login.ReqLoginFrom>({
  username: "admin",
  password: "123456"
})
</script>

<style scoped>

</style>
<template>
  <el-form ref="loginFormRef" :model="loginForm">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名:admin / user">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
          type="password"
          v-model="loginForm.password"
          show-password
          autocomplete="new-password"
          placeholder="123456"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round @click="">重置</el-button>
    <el-button :icon="UserFilled" round @click="" size="large" type="primary" :loading="loading">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, inject} from "vue";
import {useRouter} from "vue-router";

// 引入login api
// import { Login } from

import {CircleClose, UserFilled} from "@element-plus/icons-vue";
import type {ElForm} from "element-plus";
import {ElMessage} from "element-plus";
import {Login} from "@/api/interface";

const loginForm = reactive<Login.ReqLoginForm>({
  username: "",
  password: "123456"
})
</script>

<style scoped>

</style>
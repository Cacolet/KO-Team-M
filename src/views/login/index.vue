<template>
  <div class="login-container flx-center">

    <div class="login-box">
      <div class="login-left">
        <img src="@/assets/images/login_left.svg" alt="login">
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img src="@/assets/images/logo.svg" alt="">
          <p class="logo-text">KO-Team-M</p>
        </div>
        <LoginForm ref="loginRef" :age="'20'" :address="['天府三街','天府四街']" :obj="obj" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue"
import {ref, reactive, provide} from "vue";
import {Login} from "@/api/interface";
// 引入全局背景
// import Switc

const obj = reactive<Login.ReqLoginForm>({
  username: "admin",
  password: "123456"
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
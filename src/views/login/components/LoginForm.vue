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
    <el-button :icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary" :loading="loading">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, inject} from "vue";
import {useRouter} from "vue-router";
import {Login} from "@/api/interface";
import {InjectProps} from "@/views/login/interface";
import {CircleClose, UserFilled} from "@element-plus/icons-vue";
import type {ElForm} from "element-plus";
import {ElMessage} from "element-plus";
import {loginApi} from "@/api/modules/login";
import md5 from "js-md5";
import {GlobalStore} from "@/store";
import {MenuStore} from "@/store/modules/menu";
import {TabsStore} from "@/store/modules/tabs";

const globalStore = GlobalStore();
const menuStore = MenuStore();
const tabStore = TabsStore();

// 定义 formRef 校验规则
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur"}],
  password: [{ required: true, message: "请输入密码", trigger: "blur"}]
})

// 登录表单数据
const loginForm = reactive<Login.ReqLoginForm>({
  username: "",
  password: "123456"
});

const loading = ref<boolean>(false);
const router = useRouter();
// login
const login = (formEl: FormInstance | undefined) => {
  if(!formEl) return;
  formEl.validate(async valid => {
    if(valid){
      loading.value = true;
      try{
        const requestLoginForm: Login.ReqLoginForm = {
          username: loginForm.username,
          password: md5(loginForm.password)
        };
        const res = await loginApi(requestLoginForm)
        // * 存储 token
        globalStore.setToken(res.data!.access_token);
        // * 登录成功后清楚上个账号的menulist 和 tabs数据
        menuStore.setMenuList([])
        tabStore.closeMultipleTab();

        ElMessage.success("登录成功!");
        router.push({ name: "home"});
      }finally{
        loading.value = false
      }
    }
  })
}

</script>

<style scoped>

</style>
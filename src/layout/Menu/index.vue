<template>
  <div
      class="menu"
      :style="{ width: isCollapse ? '65px' : '220px'}"
      v-loading="loading"
      element-loading-text="Loading..."
      :element-loading-spinner="loadingSvg"
      element-loading-svg-view-box="-10,-10,50,50"
      element-loading-background="rgba(122, 122, 122, 0.01)"
  >

  </div>
</template>

<script lang="ts" setup>
import { ref,computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import {MenuStore} from "@/store/modules/menu";
import {AuthStore} from "@/store/modules/auth";
import {getMenuList} from "@/api/modules/login";
import {handleRouter} from "@/utils/utils";



const loading = ref(false);

const route = useRoute();
const menuStore = MenuStore();
const authStore = AuthStore()

onMounted(async () => {
  // 获取菜单列表
  loading.value = true;
  try {
    const res = await getMenuList();
    if(!res.data) return;
    // 把路由菜单处理成一维数组存储到 pinia 中
    const dynamicRouter = handleRouter(res.data)
  }finally {
    loading.value = false
  }
})

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
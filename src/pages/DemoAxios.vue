<template>

</template>

<script lang="ts">
import request from "@/utils/axios"
const requestRes = async () => {
  let result = await request({
    url: '/api/xxx',
    method:'get',

    // config
    params:""
  })
}
export default {
  name: "DemoAxios"
}
</script>

<style scoped>

</style>
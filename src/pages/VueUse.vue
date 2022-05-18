<template>
  <h1>测试 vueUse 的鼠标坐标</h1>
  <h3>Mouse: {{x}} : {{y}}</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMouse } from "@vueuse/core";

export default {
  name: "vueUse",
  setup(){
    const {x,y} = useMouse()

    return {
      x,y
    }
  }
}
</script>

<style scoped>

</style>
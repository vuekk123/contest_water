<script lang="ts" setup>
import { useRoute } from "vue-router";
const { query } = useRoute();
defineOptions({
  name: "infocard"
});
console.log(query.deviceId);
</script>

<template>
  <div>
    <div class="mt-4" v-if="query">此页面携带的参数值为：{{ query }}</div>
  </div>
</template>

<style scoped></style>

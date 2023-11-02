<script setup lang="ts">
// import { storageLocal } from "@pureadmin/utils";
// import { type DataInfo, userKey } from "@/utils/auth";
// const userInfo = storageLocal().getItem<DataInfo<number>>(userKey);
defineOptions({
  name: "changepass"
});
</script>

<template>
  <div>修改密码</div>
</template>

<style lang="scss" scoped>
:deep(.el-timeline-item) {
  margin: 6px 0 0 6px;
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>

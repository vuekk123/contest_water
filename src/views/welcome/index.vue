<script setup lang="ts">
import { storageLocal } from "@pureadmin/utils";
import { type DataInfo, userKey } from "@/utils/auth";
import adminpage from "./subview/adminpage.vue";
import commonpage from "./subview/commonpage.vue";
const userInfo = storageLocal().getItem<DataInfo<number>>(userKey);
defineOptions({
  name: "welcomecommon"
});
</script>

<template>
  <div>
    <adminpage v-if="userInfo?.roles[0] == 'admin'" />
    <commonpage v-else />
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-timeline-item) {
  margin: 6px 0 0 6px;
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>

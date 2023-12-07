<script lang="ts" setup>
import { useDetail } from "../../../router/hooks";
const { initToDetail, getParameter } = useDetail();
initToDetail("query");
import type { TabsPaneContext } from "element-plus";
import baseinfo from "../soncomponents/baseinfo.vue";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
const { router } = useDetail();
import { ref } from "vue";
defineOptions({
  name: "deviceinfo"
});
const activeName = ref("baseinfo");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
console.log(typeof getParameter);
if ("deviceId" in getParameter) {
} else {
  useMultiTagsStoreHook().handleTags("splice", "/welcome/deviceinfo");
  useMultiTagsStoreHook().handleTags("splice", "/welcome/deviceinfo");
  router.push({ path: "/list/card" });
}
// sessionStorage.setItem("deviceObj", JSON.stringify(query));
</script>
<template>
  <div v-if="'deviceId' in getParameter">
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      tabPosition="left"
    >
      <el-tab-pane label="基本信息" name="baseinfo">
        <baseinfo :device="getParameter" />
      </el-tab-pane>
      <el-tab-pane label="运行状况" name="runstatus">Config</el-tab-pane>
      <el-tab-pane label="子设备" name="sondevice">Role</el-tab-pane>
      <el-tab-pane label="设备定时" name="devicetime">Task</el-tab-pane>
      <el-tab-pane label="设备用户" name="deviceuser">Task</el-tab-pane>
      <el-tab-pane label="事件日志" name="itemrecord">Task</el-tab-pane>
      <el-tab-pane label="实时监测" name="monitoring">Task</el-tab-pane>
      <el-tab-pane label="监测统计" name="monitoringStatistics"
        >Task</el-tab-pane
      >
    </el-tabs>
  </div>
  <div v-else></div>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

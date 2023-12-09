<script setup lang="ts">
import { ref, computed, watch, type Ref } from "vue";
import { useAppStoreHook } from "@/store/modules/app";
import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";
import barcom from "./bar.vue";
import piecom from "./pie.vue";
const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const pieChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(pieChartRef as Ref<HTMLDivElement>, {
  theme
});

setOptions(
  {
    title: {
      text: "当日统计",
      // subtext: "Fake Data",
      left: "center"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      icon: "circle",
      //@ts-expect-error
      right: true
    },
    series: [
      {
        name: "Github信息",
        type: "pie",
        top: "20%",
        radius: "80%",
        center: ["40%", "50%"],
        color: ["#e6a23c", "#f56c6c", "#53a7ff"],
        data: [
          { value: 2000, name: "水流量" },
          { value: 7200, name: "该月水流量总值" }
        ]
        // emphasis: {
        //   itemStyle: {
        //     shadowBlur: 10,
        //     shadowOffsetX: 0,
        //     shadowColor: "rgba(0, 0, 0, 0.5)"
        //   }
        // }
      }
    ]
  },
  {
    name: "click",
    callback: params => {
      console.log("click", params);
    }
  },
  // 点击空白处
  {
    type: "zrender",
    name: "click",
    callback: params => {
      console.log("点击空白处", params);
    }
  }
);

watch(
  () => useAppStoreHook().getSidebarStatus,
  () => {
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div style="display: flex">
    <div ref="pieChartRef" style="width: 600px; height: 35vh" />
    <piecom />
  </div>
  <barcom />
</template>

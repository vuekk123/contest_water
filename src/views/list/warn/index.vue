<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import dayjs from "dayjs";
import { tableDataMore } from "../card/components/data";
import { HtmlNode } from "@logicflow/core";
import { cloneDeep } from "@pureadmin/utils";
defineOptions({
  name: "devicewarn"
});
// const listdate = ref(cloneDeep(tableDataMore));
const listdate = [
  {
    name: "水流量异常",
    value: 80,
    state: "水流量过高",
    way: "固定值算法治理：固定值为45",
    time: "2023-11-16 15:56:01",
    correct: "20m³/h-50m³/h",
    status: "已自动处理",
    notes: "修复后将再经过算法检查是否正常"
  },
  {
    name: "水压异常",
    value: 800,
    state: "水流量过高",
    way: "固定值算法治理：固定值为45",
    time: "2023-11-16 15:41:01",
    correct: "400kpa-600kpa",
    status: "已自动处理",
    notes: "修复后将再经过算法检查是否正常"
  },
  {
    name: "水流量异常",
    value: 10,
    state: "水压过高",
    way: "固定值算法治理：固定值为45",
    time: "2023-11-16 15:33:21",
    correct: "20m³/h-50m³/h",
    status: "已自动处理",
    notes: "修复后将再经过算法检查是否正常"
  },
  {
    name: "水压异常",
    value: 200,
    state: "水流量过低",
    way: "固定值算法治理：固定值为45",
    time: "2023-11-16 15:00:42",
    correct: "400kpa-600kpa",
    status: "已自动处理",
    notes: "修复后将再经过算法检查是否正常"
  },
  {
    name: "水压异常",
    value: 1500,
    state: "水压过低",
    way: "固定值算法治理：固定值为45",
    time: "2023-11-16 11:21:23",
    correct: "400kpa-600kpa",
    status: "数据异常,已申请人工治理",
    notes: "修复后将再经过算法检查是否正常"
  },
  {
    name: "水流量异常",
    value: 60,
    state: "水流量过高",
    way: "固定值算法治理：固定值为45",
    time: "2023-11-16 15:53:35",
    correct: "20m³/h-50m³/h",
    status: "已自动处理",
    notes: "修复后将再经过算法检查是否正常"
  },
  {
    name: "水流量异常",
    value: 500,
    state: "数据异常",
    way: "固定值算法治理：固定值为45",
    time: "2023-11-16 15:41:47",
    correct: "20m³/h-50m³/h",
    status: "数据异常,已申请人工治理",
    notes: "修复后将再经过算法检查是否正常"
  },
  {
    name: "水压异常",
    value: 200,
    state: "水流量过低",
    way: "固定值算法治理：固定值为45",
    time: "2023-11-16 12:00:42",
    correct: "400kpa-600kpa",
    status: "已自动处理",
    notes: "修复后将再经过算法检查是否正常"
  },
  {
    name: "水压异常",
    value: 1500,
    state: "水压过低",
    way: "固定值算法治理：固定值为45",
    time: "2023-11-15 10:21:26",
    correct: "400kpa-600kpa",
    status: "数据异常,已申请人工治理",
    notes: "修复后将再经过算法检查是否正常"
  },
  {
    name: "水流量异常",
    value: 60,
    state: "水流量过高",
    way: "固定值算法治理：固定值为45",
    time: "2023-11-15 10:12:35",
    correct: "20m³/h-50m³/h",
    status: "已自动处理",
    notes: "修复后将再经过算法检查是否正常"
  }
];

const columns: TableColumnList = [
  {
    label: "异常值名称",
    prop: "name",
    className: "redwarn",
    labelClassName: "balckword"
    // width: "260"
    // fixed: true
  },
  {
    label: "异常数值",
    prop: "value",
    className: "redwarn",
    labelClassName: "balckword"
    // width: "260"
  },
  {
    label: "情况描述",
    prop: "state"
    // width: "260"
  },
  {
    label: "治理方法",
    prop: "way",
    className: "greenright",
    labelClassName: "balckword"
    // width: "260"
  },
  {
    label: "告警时间",
    prop: "time"
    // width: "260"
  },
  {
    label: "正常值区间",
    prop: "correct"
    // width: "260"
  },
  {
    label: "治理情况",
    prop: "status"
    // width: "260"
  },
  {
    label: "备注",
    prop: "notes"
    // width: "260"
  }
];

const now = new Date();

const deleteRow = (index: number) => {
  listdate.value.splice(index, 1);
};

const onAddItem = () => {
  now.setDate(now.getDate() + 1);
  listdate.value.push({
    date: dayjs(now).format("YYYY-MM-DD"),
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    city: "Los Angeles",
    "post-code": "CA 90036"
  });
};
const maxheight = ref();
onMounted(() => {
  const outcontain = document.querySelector(
    ".el-scrollbar__wrap"
  ) as HTMLElement;
  maxheight.value = outcontain.clientHeight - 120 + "px";
  console.log(maxheight.value);
});
</script>

<template>
  <div id="outcontain" :style="{ height: maxheight }" style="overflow: hidden">
    <pure-table :data="listdate" :columns="columns" :maxHeight="maxheight">
      <template #operation="{ $index }">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="deleteRow($index)"
        >
          Remove
        </el-button>
      </template>
    </pure-table>
  </div>
</template>
<style>
.grow {
  flex-grow: 0;
  /* max-height: calc(100% - 50px); */
  /* background-color: black; */
}
.redwarn {
  color: red;
}
.balckword {
  color: #909399;
}
.greenright {
  color: green;
}
</style>
<style scoped lang="scss">
:deep(.layout-footer) {
  display: none;
}
</style>

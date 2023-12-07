<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import dayjs from "dayjs";
// import { tableDataMore } from "./data";
import { HtmlNode } from "@logicflow/core";
import { cloneDeep } from "@pureadmin/utils";
defineOptions({
  name: "devicewarn"
});
const props = defineProps({
  tableDataMore: {
    type: Array,
    default: ""
  },
  turnflag: {
    type: Boolean
  }
});

// const tableData = ref(props.tableDataMore);
const tableData = ref(cloneDeep(props.tableDataMore));
watch(
  () => props.tableDataMore,
  (value, oldvalue) => {
    console.log(value);
    tableData.value = cloneDeep(value);
  },
  { immediate: true }
);
console.log(props.tableDataMore);
const columns: TableColumnList = [
  {
    label: "设备类型",
    prop: "type",
    width: "260",
    fixed: true
  },
  {
    label: "设备型号",
    prop: "name",
    width: "260"
  },
  {
    label: "设备编号",
    prop: "number",
    width: "260"
  },
  {
    label: "设备激活时间",
    prop: "activate",
    width: "260"
  },
  {
    label: "在线状态",
    prop: "status",
    width: "260"
  },
  {
    label: "操作",
    width: "120",
    fixed: "right",
    slot: "operation"
  }
];

const now = new Date();

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
};

const onAddItem = () => {
  now.setDate(now.getDate() + 1);
  tableData.value.push({
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
  maxheight.value = outcontain.clientHeight - 150 + "px";
  console.log(maxheight.value);
});
</script>

<template>
  <transition enter-active-class="animate__animated animate__fadeInRight">
    <div
      v-show="turnflag == true"
      id="outcontain"
      :style="{ height: maxheight }"
      style="overflow: hidden"
    >
      <pure-table :data="tableData" :columns="columns" :maxHeight="maxheight">
        <template #operation="{ $index }">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="deleteRow($index)"
          >
            删除
          </el-button>
        </template>
      </pure-table>
    </div>
  </transition>
</template>
<style>
.grow {
  flex-grow: 0;
  /* max-height: calc(100% - 50px); */
  /* background-color: black; */
}
</style>
<style scoped lang="scss">
:deep(.layout-footer) {
  display: none;
}
</style>

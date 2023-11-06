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
    label: "日期",
    prop: "date",
    width: "260",
    fixed: true
  },
  {
    label: "姓名",
    prop: "name",
    width: "260"
  },
  {
    label: "地区",
    prop: "state",
    width: "260"
  },
  {
    label: "城市",
    prop: "city",
    width: "260"
  },
  {
    label: "地址",
    prop: "address",
    width: "260"
  },
  {
    label: "邮编",
    prop: "post-code",
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
  maxheight.value = outcontain.clientHeight - 120 + "px";
  console.log(maxheight.value);
});
</script>

<template>
  <div id="outcontain" :style="{ height: maxheight }" style="overflow: hidden">
    <!-- <el-button class="mt-4" style="width: 100%" @click="onAddItem">
      Add Item
    </el-button> -->
    <pure-table :data="tableData" :columns="columns" :maxHeight="maxheight">
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
</style>
<style scoped lang="scss">
:deep(.layout-footer) {
  display: none;
}
</style>

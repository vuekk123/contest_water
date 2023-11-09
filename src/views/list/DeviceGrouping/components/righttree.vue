<script lang="ts" setup>
import { ref, watch } from "vue";
const datatree = ref([]);
const propsdata = ref({});
const props = defineProps({
  info: {
    type: Array
  },
  propsinfo: {
    type: Object
  }
});
watch(
  () => props.info,
  value => {
    datatree.value = value;
  },
  {
    deep: true,
    immediate: true
  }
);
watch(
  () => props.propsinfo,
  value => {
    propsdata.value = value;
  },
  {
    deep: true,
    immediate: true
  }
);
const data = [
  {
    type: 1,
    id: 1,
    label: "1-1",
    children: [
      {
        type: 2,
        id: 4,
        label: "1-2-1",
        children: [
          {
            type: 3,
            id: 9,
            label: "1-3-1"
          },
          {
            type: 3,
            id: 10,
            label: "1-3-2"
          }
        ]
      },
      {
        type: 2,
        id: 20,
        label: "1-2-2",
        children: [
          {
            type: 3,
            id: 21,
            label: "1-3-1"
          },
          {
            type: 3,
            id: 22,
            label: "1-3-2"
          }
        ]
      }
    ]
  }
];
</script>
<template>
  <div>
    <el-tree :data="data" :props="propsdata"></el-tree>
  </div>
</template>

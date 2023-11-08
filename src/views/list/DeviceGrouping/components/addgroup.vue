<script lang="ts" setup>
import { watch, ref, onMounted } from "vue";

const props = defineProps({
  dialogVisible: {
    type: Boolean
  },
  treeinfo: {
    type: Array
  }
});
const dialogVisible = ref(false);
const treeinfo = ref([]);
const defaultProps = {
  children: "children",
  label: "label"
};
watch(
  () => props.dialogVisible,
  (value, oldValue) => {
    dialogVisible.value = value;
  },
  {
    deep: true,
    immediate: true
  }
);
watch(
  () => props.treeinfo,
  value => {
    treeinfo.value = value;
  },
  {
    deep: true,
    immediate: true
  }
);
const emit = defineEmits(["close"]);
const close = () => {
  dialogVisible.value = false;
  emit("close", dialogVisible.value);
};
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    draggable
    @close="close"
  >
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">添加分组</h4>
      </div>
    </template>
    <div class="contain">
      <div class="lefttree">
        <el-scrollbar height="300px">
          <el-tree :data="treeinfo" :props="defaultProps" />
        </el-scrollbar>
      </div>
      <div class="rightform"></div>
    </div>
    <!-- <template #footer>
      <span class="dialog-footer" style="">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>
<style scoped lang="scss">
.contain {
  display: flex;
  height: 100%;
  width: 100%;
  .lefttree {
    width: 30%;
    height: 100%;
  }
}
.el-dialog__footer {
  height: 50px !important;
}
</style>

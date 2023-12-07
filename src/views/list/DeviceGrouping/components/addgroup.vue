<script lang="ts" setup>
import { watch, ref, onMounted, reactive } from "vue";
import righttree from "./righttree.vue";
import { Search, Refresh } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
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
const formRef = ref<FormInstance>();
const highlightMap = ref({});
const defaultProps = {
  children: "children",
  label: "label"
};
const addgroupform = reactive({
  parentNode: "",
  parentNodeChild: [],
  addName: "",
  ifhavechild: false,
  chilrenName: ""
});
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
const emit = defineEmits(["close", "addgroup"]);
const close = () => {
  dialogVisible.value = false;
  emit("close", dialogVisible.value);
};
const selectNode = ref();
const nodeClick = value => {
  const nodeId = value.id;
  highlightMap.value[nodeId] = highlightMap.value[nodeId]?.highlight
    ? Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
        highlight: false
      })
    : Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
        highlight: true
      });
  console.log(highlightMap.value[nodeId]);
  Object.values(highlightMap.value).forEach((v: Tree) => {
    if (v.id !== nodeId) {
      v.highlight = false;
    }
  });
  selectNode.value = value;
  addgroupform.parentNode = selectNode.value.label;
  addgroupform.parentNodeChild = findNodeById(
    treeinfo.value,
    selectNode.value.id
  ).children;
  console.log(addgroupform.parentNodeChild);
};
function findNodeById(nodes: any[], targetId: number): any {
  for (const node of nodes) {
    if (node.id === targetId) {
      return node;
    }
    const result = findNodeById(node.children, targetId);
    if (result) {
      return result;
    }
  }
  return null;
}
const getnodeinfo = val => {
  nodeClick(val);
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  addgroupform.ifhavechild = false;
  addgroupform.chilrenName = "";
};
const addgroup = () => {
  emit("addgroup", addgroupform);
}
</script>
<template>
  <el-dialog
    width="37%"
    v-model="dialogVisible"
    title="Tips"
    draggable
    @close="close"
    center
  >
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">添加分组</h4>
      </div>
    </template>
    <div class="contain">
      <div class="lefttree">
        <el-scrollbar height="400px">
          <el-tree
            :data="treeinfo"
            :props="defaultProps"
            :expand-on-click-node="false"
            @node-click="nodeClick"
          >
            <template #default="{ node, data }">
              <span
                :class="[
                  'pl-1',
                  'pr-1',
                  'rounded',
                  'flex',
                  'items-center',
                  'select-none',
                  'hover:text-primary',
                  highlightMap[data.id]?.highlight ? 'dark:text-primary' : ''
                ]"
              >
                <div
                  :style="{
                    color: highlightMap[data.id]?.highlight
                      ? 'var(--el-color-primary)'
                      : '',
                    background: highlightMap[data.id]?.highlight
                      ? 'var(--el-color-primary-light-7)'
                      : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                    borderRadius: '2px'
                  }"
                >
                  <div>{{ node.label }}</div>
                </div>
              </span>
            </template></el-tree
          >
        </el-scrollbar>
      </div>
      <div class="rightform">
        <el-scrollbar height="400px"
          ><div v-if="selectNode">
            <el-form :model="addgroupform" label-position="top" ref="formRef">
              <el-form-item label="祖结点:" prop="parentNode">
                <el-input v-model="addgroupform.parentNode" disabled />
              </el-form-item>
              <el-form-item
                label="祖结点下的子节点:"
                v-if="addgroupform.parentNodeChild.length"
                prop="parentNodeChild"
              >
                <el-scrollbar>
                  <div class="scrollbar-flex-content">
                    <el-scrollbar
                      height="50px"
                      class="scrollbar-demo-item"
                      style="margin: 0 5px"
                      v-for="(item, index) in addgroupform.parentNodeChild"
                      :key="item"
                      ><el-scrollbar>
                        <div class="scrollbar-flex-content">
                          <righttree :info="item" :propsinfo="defaultProps" />
                        </div>
                      </el-scrollbar>
                    </el-scrollbar>
                  </div>
                </el-scrollbar>
              </el-form-item>
              <el-form-item label="新家节点名称" prop="addName">
                <el-input v-model="addgroupform.addName" clearable />
              </el-form-item>
            </el-form>
            <el-form :model="addgroupform">
              <el-form-item label="是非再添加子节点" prop="ifhavechild">
                <el-switch v-model="addgroupform.ifhavechild" />
              </el-form-item>
            </el-form>
            <el-form
              :model="addgroupform"
              label-position="top"
              v-show="addgroupform.ifhavechild"
            >
              <el-form-item label="新填子子节点名称" prop="chilrenName">
                <el-input v-model="addgroupform.chilrenName" clearable />
              </el-form-item>
            </el-form>
            <el-form>
              <el-form-item>
                <div
                  style="
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    margin-top: 20px;
                  "
                >
                  <el-button :icon="Search" type="primary" @click="addgroup">添加</el-button>
                  <el-button :icon="Refresh" @click="resetForm(formRef)"
                    >重置</el-button
                  >
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div
            v-else
            style="
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            "
          >
            <el-empty description="请选择结点" /></div
        ></el-scrollbar>
      </div>
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
.el-dialog__body {
  padding-top: 0;
}
.contain {
  display: flex;
  height: 100%;
  width: 100%;
  // border: 1px #e5e6eb solid;
  padding-top: 0;
  .lefttree {
    width: 30%;
    height: 100%;
    border-right: 1px #e5e6eb solid;
  }
  .rightform {
    width: 100%;
    height: 400px;
    padding: 10px 0px 0 10px;
  }
}
.el-dialog__footer {
  height: 50px !important;
}
.el-dialog__body {
  padding-top: 0 !important;
}
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  width: 100px;
}
</style>
<style>
/* .el-dialog__body {
  padding-top: 0 !important;
} */
</style>

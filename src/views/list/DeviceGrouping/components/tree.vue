<script lang="ts" setup>
import { ref, watch, computed, getCurrentInstance } from "vue";
import { ElTree } from "element-plus";
import addgroup from "./addgroup.vue";
import More2Fill from "@iconify-icons/ri/more-2-fill";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import ExpandIcon from "./svg/expand.svg?component";
import UnExpandIcon from "./svg/unexpand.svg?component";
import Search from "@iconify-icons/ep/search";
import OfficeBuilding from "@iconify-icons/ep/office-building";
import LocationCompany from "@iconify-icons/ep/add-location";
import deletegroup from "@iconify-icons/ep/delete";
import Dept from "@iconify-icons/ri/git-branch-line";
import { Delete, Check, Plus } from "@element-plus/icons-vue";
interface Tree {
  [key: string]: any;
}

const emit = defineEmits(["tree-select"]);
const treeRef = ref<InstanceType<typeof ElTree>>();
const datainfo: Tree[] = [
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
  },
  {
    type: 1,
    id: 2,
    label: "2-1",
    children: [
      {
        type: 2,
        id: 5,
        label: "2-2-1"
      },
      {
        type: 2,
        id: 6,
        label: "2-3-2"
      }
    ]
  },
  {
    type: 1,
    id: 3,
    label: "3-1",
    children: [
      {
        type: 2,
        id: 7,
        label: "3-2-1"
      },
      {
        type: 2,
        id: 8,
        label: "3-2-2"
      }
    ]
  }
];
const data = ref(datainfo);
const filterText = ref("");
const dialogVisible = ref(false);
const defaultProps = {
  children: "children",
  label: "label"
};

watch(filterText, val => {
  treeRef.value!.filter(val);
});

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};
const buttonClass = computed(() => {
  return [
    "!h-[20px]",
    "reset-margin",
    "!text-gray-500",
    "dark:!text-white",
    "dark:hover:!text-primary"
  ];
});
const isExpand = ref(true);
const searchValue = ref("");
const highlightMap = ref({});
const showdelete = ref({});
const { proxy } = getCurrentInstance();
function toggleRowExpansionAll(status) {
  isExpand.value = status;
  const nodes = (proxy.$refs["treeRef"] as any).store._getAllNodes();
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].expanded = status;
  }
}
const nodeClick = value => {
  const nodeId = value.$treeNodeId;
  console.log(nodeId);
  highlightMap.value[nodeId] = highlightMap.value[nodeId]?.highlight
    ? Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
        highlight: false
      })
    : Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
        highlight: true
      });
  Object.values(highlightMap.value).forEach((v: Tree) => {
    if (v.id !== nodeId) {
      v.highlight = false;
    }
  });
  emit("tree-select", value);
};
const checkboxflag = ref(false);
const showcheckbox = () => {
  checkboxflag.value = !checkboxflag.value;
};
const showlist = value => {
  if (treeRef.value!.getCheckedNodes(false, false).length) {
    const nodeId = treeRef.value!.getCheckedNodes(false, false)[0].$treeNodeId;
    showdelete.value = nodeId;
  } else {
    showdelete.value = 0;
  }
};
const remove = (node: Node, data: Tree) => {
  const parent = node.parent;
  const children: Tree[] = parent.data.children || parent.data;
  const index = children.findIndex(d => d.id === data.id);
  children.splice(index, 1);
  data.value = [...data.value];
};

const opendrag = () => {
  dialogVisible.value = true;
};
const closedrag = () => {
  dialogVisible.value = false;
};
</script>
<template>
  <div>
    <div style="width: 100%; display: flex; align-items: center">
      <el-input
        v-model="filterText"
        placeholder="请输入组名"
        class="input"
        clearable
        ><template #suffix>
          <el-icon class="el-input__icon">
            <IconifyIconOffline
              v-show="filterText.length === 0"
              :icon="Search"
            />
          </el-icon> </template
      ></el-input>
      <el-dropdown :hide-on-click="false">
        <IconifyIconOffline
          class="w-[28px] cursor-pointer"
          width="18px"
          :icon="More2Fill"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-button
                :class="buttonClass"
                style="width: 100%"
                link
                type="primary"
                :icon="useRenderIcon(isExpand ? ExpandIcon : UnExpandIcon)"
                @click="toggleRowExpansionAll(isExpand ? false : true)"
              >
                {{ isExpand ? "折叠全部" : "展开全部" }}
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button
                :class="buttonClass"
                style="width: 100%"
                link
                type="primary "
                :icon="checkboxflag ? Check : Delete"
                @click="showcheckbox"
              >
                {{ checkboxflag ? "删除完成" : "删除分组" }}
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button
                :class="buttonClass"
                style="width: 100%"
                link
                type="primary "
                :icon="Plus"
                @click="opendrag"
              >
                {{ "添加分组" }}
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-tree
      ref="treeRef"
      class="filter-tree border"
      :show-checkbox="checkboxflag"
      :data="data"
      :props="defaultProps"
      :expand-on-click-node="false"
      default-expand-all
      :filter-node-method="filterNode"
      @node-click="nodeClick"
      @check="showlist"
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
            searchValue.trim().length > 0 &&
              node.label.includes(searchValue) &&
              'text-red-500',
            highlightMap[node.id]?.highlight ? 'dark:text-primary' : ''
          ]"
        >
          <div
            :style="{
              color: highlightMap[node.id]?.highlight
                ? 'var(--el-color-primary)'
                : '',
              background: highlightMap[node.id]?.highlight
                ? 'var(--el-color-primary-light-7)'
                : 'transparent',
              display: 'flex',
              alignItems: 'center',
              padding: '0 5px',
              borderRadius: '2px'
            }"
          >
            <IconifyIconOffline
              :icon="
                data.type === 1
                  ? OfficeBuilding
                  : data.type === 2
                  ? LocationCompany
                  : Dept
              "
            />
            <div>{{ node.label }}</div>
          </div>

          <el-button
            v-show="showdelete == node.id"
            @click.stop=""
            style="
              height: 26px;
              margin-left: 15px;
              font-size: 11px;
              padding: 8px;
            "
            @click="remove(node, data)"
            >删除</el-button
          >
        </span>
      </template></el-tree
    >
    <addgroup :dialogVisible="dialogVisible" @close="closedrag" :treeinfo="data"/>
  </div>
</template>
<style scoped lang="scss">
.el-input {
  display: block;
}
.input {
  margin: 5px 0;
  width: 90%;
}
.border {
  border: none;
  border-top: 1px #dcdfe6 solid;
  margin-top: 5px;
}
</style>
<style>
.el-tree-node {
  margin: 10px 0;
}
</style>

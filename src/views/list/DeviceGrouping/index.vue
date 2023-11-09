<script lang="ts" setup>
import tree from "./components/tree.vue";
import splitpane, { ContextProps } from "@/components/ReSplitPane";
import { onMounted, reactive, onBeforeMount, ref } from "vue";
import { Search, Refresh } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
import { PureTableBar } from "@/components/RePureTableBar";
import { useUser } from "./utilsinfo/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Upload from "@iconify-icons/ri/upload-line";
import Role from "@iconify-icons/ri/admin-line";
import Password from "@iconify-icons/ri/lock-password-line";
import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
// import Search from "@iconify-icons/ep/search";
// import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
const formRef = ref<FormInstance>();
const tableRef = ref();
const {
  selectedNum,
  onSelectionCancel,
  onbatchDel,
  loading,
  form,
  pagination,
  columns,
  dataList,
  onTreeSelect,
  onSearch,
  handleSelectionChange,
  buttonClass
} = useUser(tableRef);
defineOptions({
  name: "deviceGrouping"
});
const settingLR: ContextProps = reactive({
  minPercent: 14,
  defaultPercent: 14,
  split: "vertical"
});

const settingTB: ContextProps = reactive({
  minPercent: 20,
  defaultPercent: 40,
  split: "vertical"
});
const selectinfo = ref([]);
const recursion = value => {
  if (value.hasOwnProperty("children")) {
    value.children.forEach(item => {
      recursion(item);
    });
  } else {
    selectinfo.value.push(value.id);
  }
};

const onTreeSelectFIr = value => {
  selectinfo.value = [];
  recursion(value);
  onTreeSelect(selectinfo.value,value);
};
const formInline = reactive({
  deviceName: "",
  deviceId: "",
  deviceStatus: "ALL"
});
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<template>
  <el-card shadow="never">
    <div class="split-pane" id="inherent">
      <splitpane :splitSet="settingLR">
        <!-- #paneL 表示指定该组件为左侧面板 -->
        <template #paneL>
          <!-- 自定义左侧面板的内容 -->
          <tree @tree-select="onTreeSelectFIr" />
        </template>
        <!-- #paneR 表示指定该组件为右侧面板 -->
        <template #paneR>
          <!-- 再次将右侧面板进行拆分 -->
          <div class="container">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: nowrap;
                background-color: white;
                height: 10%;
                margin-bottom: 0.7%;
              "
            >
              <el-form :inline="true" :model="formInline" ref="formRef">
                <el-form-item
                  label="设备名称:"
                  prop="deviceName"
                  class="marginbottom"
                >
                  <el-input
                    v-model="formInline.deviceName"
                    placeholder="请输入设备名称"
                    clearable
                    class="!w-[160px]"
                  />
                </el-form-item>
                <el-form-item
                  label="设备ID:"
                  prop="deviceId"
                  class="marginbottom"
                >
                  <el-input
                    v-model="formInline.deviceId"
                    placeholder="请输入设备ID"
                    clearable
                    class="!w-[160px]"
                  />
                </el-form-item>
                <el-form-item
                  label="设备状态"
                  prop="deviceStatus"
                  class="marginbottom"
                >
                  <el-select v-model="formInline.deviceStatus">
                    <el-option label="全部" value="ALL" />
                    <el-option label="已开启" value="OPEN" />
                    <el-option label="已关闭" value="CLOSE" />
                  </el-select>
                </el-form-item>
                <el-form-item class="marginbottom">
                  <el-button :icon="Search" type="primary">搜索</el-button>
                  <el-button :icon="Refresh" @click="resetForm(formRef)"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div style="width: 100%; background-color: white; height: 100%">
              <PureTableBar
                :columns="columns"
                @refresh="onSearch"
                :title="form.deptId == '' ? form.default : form.deptId"
              >
                <template #buttons>
                  <el-button type="primary" :icon="useRenderIcon(AddFill)">
                    新增设备
                  </el-button>
                </template>
                <template v-slot="{ size, dynamicColumns }">
                  <div
                    v-if="selectedNum > 0"
                    v-motion-fade
                    class="bg-[var(--el-fill-color-light)] w-full h-[46px] mb-2 pl-4 flex items-center"
                  >
                    <div class="flex-auto">
                      <span
                        style="font-size: var(--el-font-size-base)"
                        class="text-[rgba(42,46,54,0.5)] dark:text-[rgba(220,220,242,0.5)]"
                      >
                        已选 {{ selectedNum }} 项
                      </span>
                      <el-button type="primary" text @click="onSelectionCancel">
                        取消选择
                      </el-button>
                    </div>
                    <el-popconfirm title="是否确认删除?" @confirm="onbatchDel">
                      <template #reference>
                        <el-button type="danger" text class="mr-1">
                          批量删除
                        </el-button>
                      </template>
                    </el-popconfirm>
                  </div>
                  <PureTable
                    row-key="id"
                    ref="tableRef"
                    adaptive
                    align-whole="center"
                    table-layout="auto"
                    :loading="loading"
                    :size="size"
                    :data="dataList"
                    :columns="dynamicColumns"
                    :pagination="pagination"
                    :paginationSmall="size === 'small' ? true : false"
                    :header-cell-style="{
                      background: 'var(--el-fill-color-light)',
                      color: 'var(--el-text-color-primary)'
                    }"
                    @selection-change="handleSelectionChange"
                  >
                    <template #operation="{ row }">
                      <el-button
                        class="reset-margin"
                        link
                        type="primary"
                        :size="size"
                        :icon="useRenderIcon(EditPen)"
                      >
                        修改
                      </el-button>
                      <el-popconfirm
                        :title="`是否确认删除用户编号为${row.id}的这条数据`"
                      >
                        <template #reference>
                          <el-button
                            class="reset-margin"
                            link
                            type="primary"
                            :size="size"
                            :icon="useRenderIcon(Delete)"
                          >
                            删除
                          </el-button>
                        </template>
                      </el-popconfirm>
                      <el-dropdown>
                        <el-button
                          class="ml-3 mt-[2px]"
                          link
                          type="primary"
                          :size="size"
                          :icon="useRenderIcon(More)"
                        />
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item>
                              <el-button
                                :class="buttonClass"
                                link
                                type="primary"
                                :size="size"
                                :icon="useRenderIcon(Upload)"
                              >
                                上传头像
                              </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <el-button
                                :class="buttonClass"
                                link
                                type="primary"
                                :size="size"
                                :icon="useRenderIcon(Password)"
                              >
                                重置密码
                              </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <el-button
                                :class="buttonClass"
                                link
                                type="primary"
                                :size="size"
                                :icon="useRenderIcon(Role)"
                              >
                                分配角色
                              </el-button>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </template>
                  </PureTable>
                </template>
              </PureTableBar>
            </div>
          </div>
        </template>
      </splitpane>
    </div>
  </el-card>
</template>
<style lang="scss" scoped>
$W: 100%;
$H: 84vh;

.split-pane {
  width: $W;
  height: $H;
  font-size: 50px;
  border: 1px solid #e5e6eb;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
}
.marginbottom {
  margin-bottom: 0 !important;
}
.splitter-pane.vertical.splitter-paneL {
  overflow: hidden;
}
</style>
<style>
.font-bold {
  font-size: 14px !important;
  font-weight: 400 !important;
}
.flex-auto {
  display: flex;
  align-items: center;
}
</style>

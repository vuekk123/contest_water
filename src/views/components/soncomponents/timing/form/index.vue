<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="newFormInline"
      :rules="formRules"
      label-width="82px"
    >
      <el-row :gutter="30">
        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="定时名称" prop="nickname">
            <el-input
              v-model="newFormInline.nickname"
              clearable
              placeholder="请输入用户昵称"
            />
          </el-form-item>
        </re-col>
        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="执行时间" prop="username">
            <el-input
              v-model="newFormInline.username"
              clearable
              placeholder="请输入用户名称"
            />
          </el-form-item>
        </re-col>

        <re-col
          :value="12"
          :xs="24"
          :sm="24"
          v-if="newFormInline.title === '新增'"
        >
          <el-form-item label="选择时间" prop="password">
            <el-input
              v-model="newFormInline.password"
              clearable
              placeholder="请输入用户密码"
            />
          </el-form-item>
        </re-col>

        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="cron表达">
            <el-input v-model="state.cron" placeholder="cron表达式...">
              <template #append>
                <el-popover
                  v-model:visible="state.cronPopover"
                  width="700px"
                  trigger="manual"
                >
                  <noVue3Cron
                    :cron-value="state.cron"
                    @change="changeCron"
                    @close="close"
                    max-height="400px"
                    i18n="cn"
                  >
                  </noVue3Cron>
                  <template #reference>
                    <el-button @click="state.cronPopover = !state.cronPopover"
                      >设置</el-button
                    >
                  </template>
                </el-popover>
              </template>
            </el-input>
          </el-form-item>
        </re-col>
        <re-col
          :value="12"
          :xs="24"
          :sm="24"
          v-if="newFormInline.title === '新增'"
        >
          <el-form-item label="定时状态">
            <el-switch
              v-model="newFormInline.status"
              inline-prompt
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="停用"
              :style="switchStyle"
            />
          </el-form-item>
        </re-col>

        <re-col>
          <el-form-item label="备注" style="align-items: center">
            <el-select
              v-model="newFormInline.remark"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option value="key" label="属性" />
              <el-option value="able" label="功能" />
            </el-select>
            <el-select
              v-model="newFormInline.remark"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option value="key" label="属性" />
              <el-option value="able" label="功能" />
            </el-select>
          </el-form-item>
        </re-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineComponent, ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
import { noVue3Cron } from "no-vue3-cron";
import "no-vue3-cron/lib/noVue3Cron.css";
const state = reactive({
  cronPopover: false,
  cron: ""
});
const changeCron = val => {
  if (typeof val !== "string") return false;
  state.cron = val;
};
const close = () => {
  state.cronPopover = false;
};

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    higherDeptOptions: [],
    parentId: 0,
    nickname: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    sex: "",
    status: 1,
    remark: ""
  })
});

const sexOptions = [
  {
    value: 0,
    label: "男"
  },
  {
    value: 1,
    label: "女"
  }
];
const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<style lang="scss" scoped></style>

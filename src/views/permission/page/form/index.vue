<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    name: "",
    encoding: "",
    address: "",
    type: "",
    summary: ""
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

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="协议名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入协议名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="协议编码" prop="encoding">
          <el-input
            v-model="newFormInline.encoding"
            clearable
            placeholder="请输入协议编码"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="上传地址" prop="address">
          <el-input
            v-model="newFormInline.address"
            clearable
            placeholder="请输入上传地址"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="协议类型" prop="type">
          <el-input
            v-model="newFormInline.type"
            clearable
            placeholder="请输入协议类型"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="协议摘要" prop="summary">
          <el-input
            v-model="newFormInline.summary"
            clearable
            placeholder="请输入协议摘要"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

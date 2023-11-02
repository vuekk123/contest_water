<script setup lang="ts">
import {
  ref,
  toRaw,
  reactive,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
  onBeforeMount
} from "vue";
import { useI18n } from "vue-i18n";
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import phone from "./components/phone.vue";
import TypeIt from "@/components/ReTypeit";
import qrCode from "./components/qrCode.vue";
import regist from "./components/regist.vue";
import update from "./components/update.vue";
import { useNav } from "@/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { $t, transformI18n } from "@/plugins/i18n";
import { operates, thirdParty } from "./utils/enums";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import {
  bg,
  avatar,
  illustration,
  exam,
  book,
  bgpic,
  waterbox
} from "./utils/static";
import { ReImageVerify } from "@/components/ReImageVerify";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import globalization from "@/assets/svg/globalization.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import Check from "@iconify-icons/ep/check";
import User from "@iconify-icons/ri/user-3-fill";
import Info from "@iconify-icons/ri/information-line";
import { ElLoading, ElMessage } from "element-plus";
defineOptions({
  name: "Login"
});

const imgCode = ref("");
const loginDay = ref(7);
const router = useRouter();
const loading = ref(false);
const checked = ref(false);
const ruleFormRef = ref<FormInstance>();
const currentPage = computed(() => {
  return useUserStoreHook().currentPage;
});

const { t } = useI18n();
const { initStorage } = useLayout();
initStorage();
const { dataTheme, dataThemeChange } = useDataThemeChange();
dataThemeChange();
const { title, getDropdownItemStyle, getDropdownItemClass } = useNav();
const { locale, translationCh, translationEn } = useTranslationLang();

const ruleForm = reactive({
  username: "admin",
  password: "admin123",
  verifyCode: ""
});

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      useUserStoreHook()
        .loginByUsername({ username: ruleForm.username, password: "admin123" })
        .then(res => {
          if (res.success) {
            // 获取后端路由
            initRouter().then(() => {
              router.push(getTopMenu(true).path);
              message("登录成功", { type: "success" });
            });
          }
        })
        .finally(() => (loading.value = false));
    } else {
      loading.value = false;
      return fields;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
  dataThemeChange();
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});

watch(imgCode, value => {
  useUserStoreHook().SET_VERIFYCODE(value);
});
watch(checked, bool => {
  useUserStoreHook().SET_ISREMEMBERED(bool);
});
watch(loginDay, value => {
  useUserStoreHook().SET_LOGINDAY(value);
});
const picloadflag = ref(false);
onBeforeMount(() => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)"
  });
  var check = setInterval(() => {
    if (picloadflag.value) {
      loading.close();
      clearInterval(check);
    }
  }, 100);
  check;
});
const loadtrue = () => {
  picloadflag.value = true;
};
</script>

<template>
  <div class="select-none">
    <!-- <img
      :src="bg"
      class="wave"
      style="position: absolute; z-index: 9; opacity: 0.8"
    /> -->

    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        class="changelight"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="dataThemeChange"
      />
      <!-- 国际化 -->
      <el-dropdown trigger="click">
        <globalization
          class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300"
        />
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'zh')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'zh')]"
              @click="translationCh"
            >
              <IconifyIconOffline
                class="check-zh"
                v-show="locale === 'zh'"
                :icon="Check"
              />
              简体中文
            </el-dropdown-item>
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'en')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'en')]"
              @click="translationEn"
            >
              <span class="check-en" v-show="locale === 'en'">
                <IconifyIconOffline :icon="Check" />
              </span>
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="login-container">
      <div class="img">
        <div class="img" style="flex-direction: row-reverse">
          <el-image
            class="wave loginbgpic"
            style="width: 100vw"
            :src="bgpic"
            @load="loadtrue"
          />
        </div>
        <!-- <component :is="waterbox" style="position: absolute; z-index: 999" /> -->
      </div>
      <div class="login-box">
        <div class="login-form">
          <div
            class="avatar"
            style="display: flex; justify-content: center; align-items: center"
          >
            <avatar />
          </div>
          <!-- <avatar class="avatar" /> -->
          <Motion>
            <h2 class="outline-none">
              <TypeIt :values="[title]" :cursor="false" :speed="150" />
            </h2>
          </Motion>

          <el-form
            v-if="currentPage === 0"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
            style=""
          >
            <Motion :delay="100">
              <el-form-item
                :rules="[
                  {
                    required: true,
                    message: transformI18n($t('login.usernameReg')),
                    trigger: 'blur'
                  }
                ]"
                prop="username"
              >
                <el-input
                  clearable
                  v-model="ruleForm.username"
                  :placeholder="t('login.username')"
                  :prefix-icon="useRenderIcon(User)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input
                  clearable
                  show-password
                  v-model="ruleForm.password"
                  :placeholder="t('login.password')"
                  :prefix-icon="useRenderIcon(Lock)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="200">
              <el-form-item prop="verifyCode">
                <el-input
                  clearable
                  v-model="ruleForm.verifyCode"
                  :placeholder="t('login.verifyCode')"
                  :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
                >
                  <template v-slot:append>
                    <ReImageVerify v-model:code="imgCode" />
                  </template>
                </el-input>
              </el-form-item>
            </Motion>

            <Motion :delay="250">
              <el-form-item>
                <div class="w-full h-[20px] flex justify-between items-center">
                  <el-checkbox v-model="checked">
                    <span class="flex">
                      <select
                        v-model="loginDay"
                        :style="{
                          width: loginDay < 10 ? '10px' : '16px',
                          outline: 'none',
                          background: 'none',
                          appearance: 'none'
                        }"
                      >
                        <option value="1">1</option>
                        <option value="7">7</option>
                        <option value="30">30</option>
                      </select>
                      {{ t("login.remember") }}
                      <el-tooltip
                        effect="dark"
                        placement="top"
                        :content="t('login.rememberInfo')"
                      >
                        <IconifyIconOffline :icon="Info" class="ml-1" />
                      </el-tooltip>
                    </span>
                  </el-checkbox>
                  <el-button
                    link
                    type="primary"
                    @click="useUserStoreHook().SET_CURRENTPAGE(4)"
                  >
                    {{ t("login.forget") }}
                  </el-button>
                </div>
                <el-button
                  class="w-full mt-4"
                  size="default"
                  type="primary"
                  :loading="loading"
                  @click="onLogin(ruleFormRef)"
                >
                  {{ t("login.login") }}
                </el-button>
              </el-form-item>
            </Motion>

            <Motion :delay="300">
              <el-form-item>
                <div class="w-full h-[20px] flex justify-between items-center">
                  <el-button
                    v-for="(item, index) in operates"
                    :key="index"
                    class="w-full mt-4"
                    size="default"
                    @click="useUserStoreHook().SET_CURRENTPAGE(index + 1)"
                  >
                    {{ t(item.title) }}
                  </el-button>
                </div>
              </el-form-item>
            </Motion>
          </el-form>

          <Motion v-if="currentPage === 0" :delay="350">
            <el-form-item>
              <el-divider>
                <p class="text-gray-500 text-xs">{{ t("login.thirdLogin") }}</p>
              </el-divider>
              <div class="w-full flex justify-evenly">
                <span
                  v-for="(item, index) in thirdParty"
                  :key="index"
                  :title="t(item.title)"
                >
                  <IconifyIconOnline
                    :icon="`ri:${item.icon}-fill`"
                    width="20"
                    class="cursor-pointer text-gray-500 hover:text-blue-400"
                  />
                </span>
              </div>
            </el-form-item>
          </Motion>
          <!-- 手机号登录 -->
          <phone v-if="currentPage === 1" />
          <!-- 二维码登录 -->
          <qrCode v-if="currentPage === 2" />
          <!-- 注册 -->
          <regist v-if="currentPage === 3" />
          <!-- 忘记密码 -->
          <update v-if="currentPage === 4" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
.changelight {
  :deep(.el-switch__core) {
    min-width: 77px;
    height: 30px;
    .el-switch__action {
      position: absolute;
      left: 6px;
      border-radius: 5px;
      transition: all var(--el-transition-duration);
      width: 15px;
      height: 15px;
      background-color: var(--el-color-white);
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--el-switch-off-color);
    }
  }
}
:deep(.el-switch.is-checked .el-switch__core .el-switch__action) {
  left: calc(100% - 26px);
  color: var(--el-switch-on-color);
}
</style>

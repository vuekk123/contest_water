<script setup lang="ts">
import Card from "./components/Card.vue";
import { getCardList } from "@/api/list";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { ref, onMounted, nextTick } from "vue";
import dialogForm from "./components/DialogForm.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import AddFill from "@iconify-icons/ri/add-circle-line";
// import { list } from "../static";
// import { isDark } from '~/composables/dark'
import { Menu, Grid } from "@element-plus/icons-vue";
import list from "./components/list.vue";
import { animates } from "@/components/ReAnimateSelector/src/animate";
import { tableDataMore } from "./components/data";
import { array } from "vue-types";
import { cloneDeep } from "@pureadmin/utils";
import { useDetail } from "@/router/hooks";
const { toDetail, router } = useDetail();
defineOptions({
  name: "ListCard"
});
const tableListDate = cloneDeep(tableDataMore);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

const INITIAL_DATA = {
  name: "",
  status: "",
  description: "",
  type: "",
  mark: ""
};

const pagination = ref({ current: 1, pageSize: 12, total: 0 });

const productList = ref([]);
const dataLoading = ref(true);

const getCardListData = async () => {
  try {
    const { data } = await getCardList();
    productList.value = data.list;
    pagination.value = {
      ...pagination.value,
      total: data.list.length
    };
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      dataLoading.value = false;
    }, 500);
  }
};

onMounted(() => {
  getCardListData();
});

const formDialogVisible = ref(false);
const formData = ref({ ...INITIAL_DATA });
const searchValue = ref("");
const searchValueThen = ref("");

const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.current = 1;
};
const onCurrentChange = (current: number) => {
  pagination.value.current = current;
};
const deviceDetails = product => {
  console.log(product);
  toDetail({ deviceId: product.number }, "query");
  // ElMessageBox.confirm(
  //   product
  //     ? `确认删除后${product.name}的所有产品信息将被清空, 且无法恢复`
  //     : "",
  //   "提示",
  //   {
  //     type: "warning"
  //   }
  // )
  //   .then(() => {
  //     message("删除成功", { type: "success" });
  //   })
  //   .catch(() => {});
};
const handleManageProduct = product => {
  formDialogVisible.value = true;
  nextTick(() => {
    formData.value = { ...product, status: product?.isSetup ? "1" : "0" };
  });
};
const turnName = ref("列表");
const turnIcon = ref(Grid);
const turnIconFir = ref(Grid);
const turnIconthen = ref(Menu);
const turnflag = ref(false);
const turnmodel = () => {
  turnflag.value = !turnflag.value;
  if (turnflag.value) {
    turnName.value = "卡片";
    turnIcon.value = turnIconthen.value;
  } else {
    turnName.value = "列表";
    turnIcon.value = turnIconFir.value;
  }
};
onMounted(() => {
  const footerdom = document.querySelector(".layout-footer") as HTMLElement;
  // const background = document.querySelector("#background") as HTMLElement;
  // const cardlist = document.querySelector("#cardlist") as HTMLElement;
  // background.style.height = cardlist.clientHeight + "px";
  // footerdom.style.display = "none";
  // const clientHeight = cardlist.clientHeight;
  // footerdom.style.position = "relative";
  // footerdom.style.top = clientHeight + 10 + "px";
});
</script>

<template>
  <div class="main">
    <div class="w-full flex justify-between mb-4">
      <el-button
        :icon="useRenderIcon(AddFill)"
        @click="formDialogVisible = true"
      >
        新建产品
      </el-button>
      <!-- <el-button class="turnlist">Plain</el-button> -->
      <el-button
        type="primary"
        :icon="turnIcon"
        @click="turnmodel"
        id="turnbtn"
        >{{ "切换" + turnName }}</el-button
      >
      <!-- <Menu style="width: 1em; height: 1em; margin-right: 8px; color: white" /> -->
      <el-input
        v-if="turnflag == false"
        style="width: 300px"
        v-model="searchValue"
        placeholder="请输入设备名称"
        clearable
      >
        <template #suffix>
          <el-icon class="el-input__icon">
            <IconifyIconOffline
              v-show="searchValue.length === 0"
              :icon="Search"
            />
          </el-icon>
        </template>
      </el-input>
      <el-input
        v-show="turnflag == true"
        style="width: 300px"
        v-model="searchValueThen"
        placeholder="请输入设备名称"
        clearable
      >
        <template #suffix>
          <el-icon class="el-input__icon">
            <IconifyIconOffline
              v-show="searchValue.length === 0"
              :icon="Search"
            />
          </el-icon>
        </template>
      </el-input>
    </div>
    <div style="flex-shrink: 0">
      <transition enter-active-class="animate__animated animate__fadeInLeft">
        <div
          id="cardlist"
          style="display: inline-block; width: 100%"
          v-if="turnflag == false"
          v-loading="dataLoading"
          :element-loading-svg="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
        >
          <el-empty
            description="暂无数据"
            v-show="
              productList
                .slice(
                  pagination.pageSize * (pagination.current - 1),
                  pagination.pageSize * pagination.current
                )
                .filter(v =>
                  v.name.toLowerCase().includes(searchValue.toLowerCase())
                ).length === 0
            "
          />
          <template v-if="pagination.total > 0">
            <div style="width: 100%">
              <el-row :gutter="16">
                <el-col
                  v-for="(product, index) in productList
                    .slice(
                      pagination.pageSize * (pagination.current - 1),
                      pagination.pageSize * pagination.current
                    )
                    .filter(v =>
                      v.name.toLowerCase().includes(searchValue.toLowerCase())
                    )"
                  :key="index"
                  :xs="24"
                  :sm="12"
                  :md="8"
                  :lg="6"
                  :xl="4"
                >
                  <Card
                    :product="product"
                    @findDevice="deviceDetails"
                    @manage-product="handleManageProduct"
                  />
                </el-col>
              </el-row>
            </div>

            <el-pagination
              class="float-right"
              v-model:currentPage="pagination.current"
              :page-size="pagination.pageSize"
              :total="pagination.total"
              :page-sizes="[12, 24, 36]"
              :background="true"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="onPageSizeChange"
              @current-change="onCurrentChange"
            />
          </template>
        </div>
      </transition>

      <list
        :tableDataMore="
          searchValueThen == ''
            ? tableListDate
            : tableListDate.filter(item => item.name.includes(searchValueThen))
        "
        :turnflag="turnflag"
        style="
          display: inline-block;
          position: relative;
          width: 100%;
          display: none;
        "
      />
    </div>

    <dialogForm v-model:visible="formDialogVisible" :data="formData" />
  </div>
</template>
<style scoped>
.el-button--primary {
  --el-button-bg-color: #409eff;
  --el-button-hover-bg-color: #409eff;
}
.el-button--primary:hover {
  --el-button-hover-bg-color: #79bbff;
}

.el-button--warning.is-plain {
  --el-button-bg-color: #fdf6ec;
  --el-button-hover-text-color: #e6a23c;
  --el-button-hover-bg-color: #fdf6ec;
}
.el-button--warning.is-plain:hover {
  --el-button-hover-text-color: #fff;
  --el-button-hover-bg-color: #e6a23c;
}
.el-button--danger.is-plain {
  --el-button-bg-color: #fef0f0;
  --el-button-hover-text-color: #f56c6c;
  --el-button-hover-bg-color: #fef0f0;
}
.el-button--danger.is-plain:hover {
  --el-button-hover-text-color: #fff;
  --el-button-hover-bg-color: #f56c6c;
}
.animate__animated.animate__fadeInLeft {
  --animate-duration: 0.75s;
}
.animate__animated.animate__fadeOutRight {
  --animate-duration: 0.75s;
}
.animate__animated.animate__fadeInRight {
  --animate-duration: 0.75s;
}
.animate__animated.animate__fadeOutLeft {
  --animate-duration: 0.75s;
}
.el-scrollbar__view {
  overflow-x: hidden;
}
.main.main-content {
  overflow-x: hidden;
}
</style>
<style>
/* .layout-footer {
  position: absolute;
  bottom: 0;
} */
</style>

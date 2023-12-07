<template>
  <div class="cron">
    <el-input v-model="state.cron" placeholder="cron表达式...">
      <template #append>
        <el-popover
          v-model:visible="state.cronPopover"
          width="700px"
          trigger="manual"
        >
          <noVue3Cron :cron-value="state.cron" @change="changeCron" @close="state.cronPopover=false">
          </noVue3Cron>
          <template #reference>
            <el-button @click="state.cronPopover = !state.cronPopover"
              >设置</el-button
            >
          </template>
        </el-popover>
      </template>
    </el-input>
  </div>
</template>

<script>
import { reactive, defineComponent } from "vue";
import { noVue3Cron } from "no-vue3-cron";
import "no-vue3-cron/lib/noVue3Cron.css";
export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({
      cronPopover: false,
      cron: ""
    });
    const changeCron = val => {
      if (typeof val !== "string") return false;
      state.cron = val;
    };

    return {
      state,
      changeCron
    };
  }
});
</script>

<style lang="scss" scoped>
.cron {
  width: 700px;
  margin: 0 auto;
  margin-top: 100px;
  h1 {
    font-size: 50px;
    text-align: center;
  }
}
</style>

import { $t } from "@/plugins/i18n";
import { test } from "@/router/enums";
import { Monitor, Location, Platform } from "@element-plus/icons-vue";

export default {
  path: "/screen",
  redirect: "/screen/index",
  meta: {
    icon: Monitor,
    title: "数据可视化",
    rank: test
  },
  children: [
    {
      path: "/screen/index",
      name: "dataVplatform",
      component: () => import("@/views/DataVisualization/dataVplatform.vue"),
      meta: {
        icon: Location,
        title: "大数据可视化平台"
      }
    },
    {
      path: "/screen/manage",
      name: "screenManagement",
      component: () => import("@/views/DataVisualization/screenManagement.vue"),
      meta: {
        icon: Platform,
        title: "大屏管理"
      }
    }
  ]
} as RouteConfigsTable;

import { $t } from "@/plugins/i18n";
import { test } from "@/router/enums";
import { Monitor, Location, Platform } from "@element-plus/icons-vue";

export default {
  path: "/screen",
  meta: {
    icon: Monitor,
    title: "数据可视化",
    rank: test
  },
  children: [
    {
      path: "/screen/index",
      name: "http://localhost:5173/#/chart/home/2pitrw2w52a000",
      meta: {
        icon: Location,
        title: "大数据可视化平台",
        frameSrc: "http://localhost:5173/#/chart/home/2pitrw2w52a000"
      }
    },
    {
      path: "/screen/manage",
      name: "http://localhost:5173/#/project/items",
      meta: {
        icon: Platform,
        title: "大屏管理",
        frameSrc: "http://localhost:5173/#/project/items"
      }
    }
  ]
};

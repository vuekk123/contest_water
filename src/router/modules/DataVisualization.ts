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
      name: "https://miyuesc.github.io/data-visualization/",
      meta: {
        icon: Location,
        title: "大数据可视化平台",
        frameSrc: "https://miyuesc.github.io/data-visualization/"
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

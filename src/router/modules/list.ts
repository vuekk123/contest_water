import { $t } from "@/plugins/i18n";
import { list } from "@/router/enums";
import { Platform } from "@element-plus/icons-vue"
// import device from "@iconify-icons/ep/platform";
import device from "@/assets/icons/svg/device.svg"

export default {
  path: "/list",
  redirect: "/list/card",
  meta: {
    icon: "monitor",
    title: $t("menus.hsdevice"),
    rank: list
  },
  children: [
    {
      path: "/list/card",
      name: "ListCard",
      component: () => import("@/views/list/card/index.vue"),
      meta: {
        icon:device,
        title: $t("menus.hsdevice"),
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;

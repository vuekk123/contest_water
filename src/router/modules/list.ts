import { $t } from "@/plugins/i18n";
import { list } from "@/router/enums";
import { Platform } from "@element-plus/icons-vue"
// import device from "@iconify-icons/ep/platform";
import device1 from "@iconify-icons/ep/more";
import {WarningFilled} from "@element-plus/icons-vue"
import device from "@/assets/icons/svg/device.svg"
import deviceGrouping from "@/assets/icons/svg/group.svg"
import { tr } from "element-plus/es/locale";

export default {
  path: "/list",
  redirect: "/list/card",
  meta: {
    icon: "monitor",
    title: $t("menus.hsdevice"),
    rank: list,
  },
  children: [
    {
      path: "/list/card",
      name: "ListCard",
      component: () => import("@/views/list/card/index.vue"),
      meta: {
        icon:device,
        title: $t("menus.hsdevice"),
        showParent: true,
        keepAlive:true
      }
    },
    {
      path: "/list/deviceGrouping",
      name: "deviceGrouping",
      component: () => import("@/views/list/DeviceGrouping/index.vue"),
      meta: {
        icon:deviceGrouping,
        title: $t("menus.hsdeviceGrouping"),
        showParent: true
      }
    },
    {
      path: "/list/warn",
      name: "devicewarn",
      component: () => import("@/views/list/warn/index.vue"),
      meta: {
        icon:WarningFilled,
        title: $t("menus.hswarn"),
        showParent: true
      }
    },
    
  ]
} as RouteConfigsTable;


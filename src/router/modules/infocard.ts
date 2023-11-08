import { $t } from "@/plugins/i18n";
import { deviceinfo } from "@/router/enums";

export default {
  path: "/infocard",
  redirect: "/infocard/deviceinfo",
  meta: {
    icon: "User",
    title: $t("menus.hsdeviceinfo"),
    rank: deviceinfo,
    showLink:false
  },
  children: [
    {
      path: "/infocard/deviceinfo",
      name: "infocard",
      component: () => import("@/views/components/infocard/index.vue"),
      meta: {
        icon: "card",
        title: $t("menus.hsdeviceinfo"),
        keepAlive:true
      }
    }
  ]
} as RouteConfigsTable;

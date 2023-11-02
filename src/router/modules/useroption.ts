import { $t } from "@/plugins/i18n";
import { info } from "@/router/enums";

export default {
  path: "/user",
  redirect: "/user/personcenter",
  meta: {
    icon: "User",
    title: $t("menus.hspersoncenter"),
    rank: info,
    showLink:false
  },
  children: [
    {
      path: "/user/personcenter",
      name: "personcenter",
      component: () => import("@/views/userOption/personal.vue"),
      meta: {
        icon: "card",
        title: $t("menus.hspersoncenter"),
      }
    },
    {
      path: "/user/changepass",
      name: "changepass",
      component: () => import("@/views/userOption/changepass.vue"),
      meta: {
        icon: "card",
        title: $t("menus.hschangepass"),
      }
    }
  ]
} as RouteConfigsTable;

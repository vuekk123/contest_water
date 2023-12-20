// 模拟后端动态生成路由
import { MockMethod } from "vite-plugin-mock";
import { system, permission } from "@/router/enums";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const systemRouter = {
  path: "/system",
  meta: {
    icon: "setting",
    title: "menus.hssysManagement",
    rank: system
  },
  children: [
    {
      path: "/system/user/index",
      name: "User",
      meta: {
        icon: "flUser",
        title: "menus.hsUser",
        roles: ["admin"]
      }
    },
    {
      path: "/system/role/index",
      name: "Role",
      meta: {
        icon: "role",
        title: "menus.hsRole",
        roles: ["admin"]
      }
    },
    {
      path: "/system/dept/index",
      name: "Dept",
      meta: {
        icon: "dept",
        title: "menus.hsDept",
        roles: ["admin"]
      }
    }
  ]
};

const permissionRouter = {
  path: "/permission",
  meta: {
    title: "运维管理",
    icon: "lollipop",
    rank: permission
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "协议管理",
        roles: ["admin", "common"]
      }
    }
  ]
};

export default [
  {
    url: "/get-async-routes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [systemRouter, permissionRouter]
      };
    }
  }
] as MockMethod[];

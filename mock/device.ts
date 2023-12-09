import { MockMethod } from "vite-plugin-mock";

export default [
  // 用户管理
  {
    url: "/getdevicelog",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          type: 1,
          mode: "其他信息",
          time: "2023-11-06 14:06:34",
          identifier: "online",
          action: "设备上线",
          remark: "设备上线"
        },
        {
          type: 2,
          mode: "其他信息",
          time: "2023-11-06 14:03:33",
          identifier: "offline",
          action: "设备离线",
          remark: "设备离线"
        }
      ];
      // list = list.filter(item => item.type == body.type);
      // list = list.filter(item =>
      //   String(item.type).includes(String(body?.type))
      // );

      list = list.filter(item =>
        String(item.type).includes(String(body?.type))
      );
      list = list.filter(item => item.identifier.includes(body?.identifier));
      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  {
    url: "/getInstruction",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          name: "修改参数",
          type: 0,
          value: 11,
          numbering: "D1PGLPG58K88",
          time: 1605456000000,
          result: 1
        },
        {
          name: "配置参数",
          type: 1,
          value: 11,
          numbering: "D1PGLPG58K88",
          time: 1605456000000,
          result: 1
        }
      ];
      list = list.filter(item =>
        String(item.type).includes(String(body?.type))
      );
      list = list.filter(item => item.name.includes(body?.name));
      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  }
] as MockMethod[];

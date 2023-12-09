import { MockMethod } from "vite-plugin-mock";

export default [
  // 用户管理
  {
    url: "/getagreement",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          name: "JSON解析协议",
          encoding: "JSON",
          address: "/",
          type: "0",
          summary: "系统内置JSON解析协议"
        },
        {
          name: "ModbusRtu协议",
          encoding: "MODBUS-RTU",
          address: "/",
          type: "0",
          summary: "系统内置ModbusRtu解析协议"
        },
        {
          name: "包装Modbus-rtu协议",
          encoding: "MODBUS-RTU-PAK",
          address: "/",
          type: "0",
          summary: "系统内置Modbus-rtu解析协议"
        }
      ];
      // list = list.filter(item => item.type == body.type);
      // list = list.filter(item =>
      //   String(item.type).includes(String(body?.type))
      // );

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

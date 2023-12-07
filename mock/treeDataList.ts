import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/getDataFromtree",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          groupID: 9,
          maingroup: 'maingroup',
          devicename: "水质传感器",
          devicerole: "WaterQualityProbe-3000",
          devicepic:
            "https://ts4.cn.mm.bing.net/th?id=OIP-C.QVHLIDZnp_SuF3SbabnAiQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          serialNumber: "D1PGLPG58K88",
          type: 0,
          id: 1,
          status: 1,
          location: "杭州",
          createTime: 1605456000000,
        },
        {
          groupID: 10,
          maingroup: 'secgroup',
          devicename: "温度传感器",
          devicerole: "TempSensor-T200",
          devicepic:
            "https://tse1-mm.cn.bing.net/th/id/OIP-C.HiSSJPpDaqeqCZXoTanDWwHaHa?w=201&h=201&c=7&r=0&o=5&dpr=1.5&pid=1.7",
          serialNumber: "SNINC291139SSKO",
          type: 1,
          id: 2,
          status: 1,
          location: "临安",
          createTime: 1605456000000
        }
      ];
      // return body
      let returnlist = []
      if (body.length) {
        body.forEach(id => {
        let filterinfo = list.filter(item => item.groupID == id)
        if (filterinfo.length) {
          returnlist.push(filterinfo[0])
        }
      })
      } else {
        list.forEach(item => {
          returnlist.push(item)
        })
      }
      
      // console.log(body)
      return {
        success: true,
        data: {
          returnlist,
          total: returnlist.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
      // list = list.filter(item => item.username.includes(body?.username));
    }
  },
] as MockMethod[];
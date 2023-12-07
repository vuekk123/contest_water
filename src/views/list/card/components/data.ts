import dayjs from "dayjs";
import { clone } from "@pureadmin/utils";

const date = dayjs(new Date()).format("YYYY-MM-DD");

const tableData = [
  {
    name: "智能流量计 - SMF100",
    number: "D1PGLPG58K88",
    type: "★智能流量计",
    activate: "2023-08-29",
    status: "在线"
  },
  {
    name: "水质检测仪 - WQD200",
    number: "X9K5L2Z7Y1A3B",
    type: "★人脸识别设备",
    activate: "2021-03-28",
    status: "离线"
  },
  {
    name: "压力传感器 - PPS300",
    number: "D7H2N5G4R1K3O",
    type: "★水压感应器设备",
    activate: "2020-08-12",
    status: "离线"
  },
  {
    name: "液位计 - LLJ400",
    number: "D7H2N5G4R1K3O",
    type: "★液位计",
    activate: "2022-05-06",
    status: "离线"
  },
  {
    name: "温度传感器 - TMS500",
    number: "V5C9X2Z8N1T3G",
    type: "★温度传感器",
    activate: "2021-09-20",
    status: "在线"
  },
  {
    name: "智能水泵控制器 - SKC600",
    number: "B6P5K9H2G1Y3A",
    type: "★智能水泵控制器",
    activate: "2020-11-04",
    status: "在线"
  },
  {
    name: "漏水检测仪 - LJD700",
    number: "R9L8F5D2Z1H3Q",
    type: "★漏水检测仪",
    activate: "2023-02-18",
    status: "离线"
  },
  {
    name: "水质在线分析仪 - WZA800",
    number: "W4T6U9S2R1K3V",
    type: "★水质在线分析仪",
    activate: "2021-07-09",
    status: "在线"
  },
  {
    name: "图像识别摄像头 - SCC900",
    number: "N7G9K4D2B1H3L",
    type: "★图像识别摄像头",
    activate: "2023-06-03",
    status: "离线"
  },
  {
    name: "电磁流量计 - EMF1000",
    number: "E2X9D8C5Z1G3Q",
    type: "★电磁流量计",
    activate: "2022-01-15",
    status: "在线"
  },
  {
    name: "超声波液位计 - UCL1100",
    number: "Y5K7O9N2H1R3D",
    type: "★超声波液位计",
    activate: "2021-04-25",
    status: "在线"
  },
  {
    name: "pH值检测仪 - pHD1200",
    number: "A8S6X2W5T1U3V",
    type: "★pH值检测仪",
    activate: "2022-10-10",
    status: "在线"
  }
];

const cloneData = clone(tableData, true);

const tableDataMore = cloneData;
const tableDataImage = cloneData.map((item, index) =>
  Object.assign(item, {
    image: `https://pure-admin.github.io/pure-admin-table/imgs/${index + 1}.jpg`
  })
);

const tableDataSortable = cloneData.map((item, index) =>
  Object.assign(item, {
    date: `${dayjs(new Date()).format("YYYY-MM")}-${index + 1}`
  })
);

const tableDataExpand = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-08",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-06",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-07",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  }
];

export {
  tableData,
  tableDataMore,
  tableDataImage,
  tableDataExpand,
  tableDataSortable
};

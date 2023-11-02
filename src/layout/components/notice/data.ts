export interface ListItem {
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  description: string;
  status?: "" | "success" | "warning" | "info" | "danger";
  extra?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
}

export const noticesData: TabItem[] = [
  {
    key: "1",
    name: "通知",
    list: [
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
        title: "你的综合成绩已出!",
        datetime: "一小时前",
        description: "",
        type: "1"
      },
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
        title: "你接下来将进行...考试",
        datetime: "一天前",
        description: "",
        type: "1"
      },
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title: "有关考试须知",
        datetime: "一天前",
        description: "考前须知",
        type: "1"
      }
    ]
  },
  {
    key: "2",
    name: "待办",
    list: [
      {
        avatar: "",
        title: "考前报名",
        description: "任务需要在 2023-11-16 20:00 前启动",
        datetime: "",
        extra: "未开始",
        status: "info",
        type: "3"
      },
      {
        avatar: "",
        title: "考试即将进行",
        description:
          "考试即将进行,请尽快赶到考场",
        datetime: "",
        extra: "马上到期",
        status: "danger",
        type: "3"
      }
    ]
  }
];

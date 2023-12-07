// 完整版菜单比较多，将 rank 抽离出来，在此方便维护

const home = 0, // 平台规定只有 home 路由的 rank 才能为 0 ，所以后端在返回 rank 的时候需要从 1 开始哦
  info = 2,
  deviceinfo = 3,
  error = 9,
  list = 10,
  permission = 11,
  system = 12,
  test = 13,
  ppt = 14,
  about = 20;

export {
  home,
  info,
  deviceinfo,
  error,
  list,
  permission,
  system,
  test,
  ppt,
  about
};

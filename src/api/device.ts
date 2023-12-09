import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

type Result = {
  success: boolean;
  data?: Array<any>;
};
type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};
/** 设备详情-获取日志操作 */
export const getdevicelog = (data?: object) => {
  return http.request<ResultTable>("post", "/getdevicelog", { data });
};
export const getInstruction = (data?: object) => {
  return http.request<ResultTable>("post", "/getInstruction", { data });
};

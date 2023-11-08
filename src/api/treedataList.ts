import { http } from "@/utils/http";
type Result = {
  success: boolean;
  data?: Array<any>;
};

type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    returnlist: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};
export const getinfofromtree = (data?:Array<any>) => {
  return http.request<ResultTable>("post", "/getDataFromtree",{data});
};
import "./reset.css";
import dayjs from "dayjs";
import { hideTextAtIndex, getKeyList } from "@pureadmin/utils";
import { type PaginationProps } from "@pureadmin/table";
import { usePublicHooks } from "../hooks";
import {
  getRoleIds,
  getDeptList,
  getUserList,
  getAllRoleList
} from "@/api/system";
import {
  ElForm,
  ElInput,
  ElFormItem,
  ElProgress,
  ElMessageBox
} from "element-plus";
import {
  type Ref,
  h,
  ref,
  toRaw,
  watch,
  computed,
  reactive,
  onMounted
} from "vue";
import { message } from "@/utils/message";
import { getinfofromtree } from "@/api/treedataList";
const loading = ref(true);
const dataList = ref([]);
const selectedNum = ref(0);
const switchLoadMap = ref({});
const treeinfolist = ref([]);
const { switchStyle } = usePublicHooks();
const pagination = reactive<PaginationProps>({
  total: 0,
  pageSize: 10,
  currentPage: 1,
  background: true
});
export function useUser(tableRef: Ref) {
  const form = reactive({
    // 左侧部门树的id
    deptId: "",
    default: "全部"
  });
  // 列标题
  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "设备ID",
      prop: "id",
      width: 90
    },
    {
      label: "设备图片",
      prop: "devicepic",
      cellRenderer: ({ row }) => (
        <el-image
          fit="cover"
          preview-teleported={true}
          src={row.devicepic}
          preview-src-list={Array.of(row.devicepic)}
          class="w-[24px] h-[24px] rounded-full align-middle"
        />
      ),
      width: 90
    },
    {
      label: "设备名称",
      prop: "devicename",
      minWidth: 130
    },
    {
      label: "设备型号",
      prop: "devicerole",
      minWidth: 130
    },
    {
      label: "设备类型",
      prop: "type",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.type === 1 ? "danger" : ""}
          effect="plain"
        >
          {row.type === 1 ? "水压感应器" : "智能水阀"}
        </el-tag>
      )
    },
    {
      label: "地点",
      prop: "location",
      width: 90
    },
    {
      label: "设备编号",
      prop: "serialNumber",
      minWidth: 90
      // formatter: ({ serialNumber }) =>
      //   hideTextAtIndex(serialNumber, { start: 3, end: 6 })
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 90,
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          active-value={1}
          inactive-value={0}
          active-text="已启用"
          inactive-text="已停用"
          inline-prompt
          style={switchStyle.value}
          onChange={() => onChange(scope as any)}
        />
      )
    },
    {
      label: "创建时间",
      minWidth: 90,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];
  //搜索数据
  async function onSearch() {
    loading.value = true;
    console.log(treeinfolist.value);
    const { data } = await getinfofromtree(treeinfolist.value);
    dataList.value = data.returnlist;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  //导航树信息
  function onTreeSelect(value, val) {
    treeinfolist.value = value;
    form.deptId = val.label;
    console.log(val);
    console.log(form.deptId);
    // console.log(value);
    // treeinfolist.value.push(value.id);
    // console.log(treeinfolist.value);
    // form.deptId = selected ? id : "";
    // console.log(form.deptId);
    onSearch();
  }
  //多选框点击
  function handleSelectionChange(val) {
    selectedNum.value = val.length;
    // 重置表格高度
    tableRef.value.setAdaptive();
  }
  //按钮样式
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });
  //取消多选
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空用户的选择
    console.log(tableRef.value.getTableRef().data);
    tableRef.value.getTableRef().clearSelection();
  }
  //改变状态框
  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.status === 0 ? "停用编号为:" : "启用编号为:"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.serialNumber
      }</strong>的设备吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(() => {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );
        setTimeout(() => {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          message(`已成功修改编号:${row.serialNumber}的状态`, {
            type: "success"
          });
        }, 300);
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
  }
  //删除数据
  function onbatchDel() {
    // 返回当前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();
    // 接下来根据实际业务，通过选中行的某项数据，比如下面的id，调用接口进行批量删除
    message(
      `已删除设备编号为 ${getKeyList(curSelected, "serialNumber")} 的数据`,
      {
        type: "success"
      }
    );
    tableRef.value.getTableRef().clearSelection();
  }
  onMounted(async () => {
    onSearch();
  });
  return {
    selectedNum,
    onSelectionCancel,
    onbatchDel,
    loading,
    form,
    pagination,
    columns,
    dataList,
    onSearch,
    onTreeSelect,
    handleSelectionChange,
    buttonClass
  };
}

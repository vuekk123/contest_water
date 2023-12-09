import dayjs from "dayjs";
import editForm from "../form/index.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import { type PaginationProps } from "@pureadmin/table";
import type { FormItemProps } from "../utils/types";
import { hideTextAtIndex } from "@pureadmin/utils";
import { getagreement } from "@/api/agreement";
import { type Ref, h, ref, toRaw, reactive, onMounted } from "vue";

export function useUser(tableRef: Ref, treeRef: Ref) {
  const form = reactive({
    // 左侧部门树的id
    name: ""
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  // 上传头像信息
  const switchLoadMap = ref({});
  const higherDeptOptions = ref();
  const selectedNum = ref(0);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "协议名称",
      prop: "name",
      width: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size}>{row.name}</el-tag>
      )
    },
    {
      label: "协议编码",
      prop: "encoding",
      minWidth: 130
    },
    {
      label: "上传地址",
      prop: "address",
      minWidth: 90
    },
    {
      label: "协议类型",
      prop: "type",
      minWidth: 90
      // formatter: ({ phone }) => hideTextAtIndex(phone, { start: 3, end: 6 })
    },
    {
      label: "协议摘要",
      minWidth: 90,
      prop: "summary"
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    message(`您删除了用户编号为${row.id}的这条数据`, { type: "success" });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getagreement(toRaw(form));
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    // treeRef.value.onTreeReset();
    onSearch();
  };

  function formatHigherDeptOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = treeList[i].status === 0 ? true : false;
      formatHigherDeptOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}协议`,
      props: {
        formInline: {
          title,
          name: row?.name ?? "",
          encoding: row?.encoding ?? "",
          address: row?.address ?? "",
          type: row?.type ?? "",
          summary: row?.summary ?? ""
          // higherDeptOptions: formatHigherDeptOptions(higherDeptOptions.value)
          // parentId: row?.dept.id ?? 0,
          // nickname: row?.nickname ?? "",
          // username: row?.username ?? "",
          // password: row?.password ?? "",
          // phone: row?.phone ?? "",
          // email: row?.email ?? "",
          // sex: row?.sex ?? "",
          // status: row?.status ?? 1,
          // remark: row?.remark ?? ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了协议名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              chores();
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }
  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    selectedNum,
    pagination,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange
  };
}

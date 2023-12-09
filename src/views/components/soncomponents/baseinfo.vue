<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { nextTick, onActivated, onMounted } from "vue";
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
import { useDetail } from "@/router/hooks";
const { toDetail, router } = useDetail();
const deviceNumber = ref();
const props = defineProps({
  device: {
    type: Object
  }
});
watch(
  () => props.device,
  value => {
    deviceNumber.value = value.deviceId;
  },
  {
    deep: true,
    immediate: true
  }
);
interface RuleForm {
  name: string;
  devicetype: string;
  deviceNum: string;
  FirmwareVersion: string;
  delivery: boolean;
  desc: string;
  TargetingMethod: string;
  longitude: string;
  dimension: string;
  address: string;
  accessAdress: string;
  activation: string;
}

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "水流量传感器",
  devicetype: "Flowmeter",
  deviceNum: deviceNumber.value,
  FirmwareVersion: "Version2.0",
  delivery: true,
  desc: "测量水流量",
  TargetingMethod: "temTransducer",
  longitude: "120.2",
  dimension: "30.3",
  address: "杭州天杭试验学校",
  accessAdress: "110.155.115.72",
  activation: "2023-11-06 14:06:34"
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ],
  devicetype: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change"
    }
  ],
  deviceNum: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ],
  FirmwareVersion: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ]
});
function loadBMap() {
  return new Promise(function (resolve, reject) {
    if (typeof BMap !== "undefined") {
      resolve(BMap);
      return true;
    }
    window.onBMapCallback = function () {
      resolve(BMap);
    };
    // 使用https协议需要添加一下meta标签
    var protocolStr = document.location.protocol;
    if (protocolStr == "https:") {
      let meta = document.createElement("meta");
      meta.httpEquiv = "Content-Security-Policy";
      meta.content = "upgrade-insecure-requests";
      meta.onerror = reject;
      document.head.appendChild(meta);
    }
    // 引入百度地图
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "http://api.map.baidu.com/api?v=2.0&ak=" +
      "ymIsTuk5HB15Qorioz8hzQDl03KGegmE" +
      "&__ec_v__=20190126&callback=onBMapCallback";
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
loadMap();
function loadMap() {
  nextTick(() => {
    loadBMap().then(() => {
      getmap();
    });
  });
}
const tooltip = {
  trigger: "item",
  formatter: function (params) {
    var htmlStr = '<div style="padding:5px;line-height:28px;">';
    htmlStr +=
      "设备名称： <span style='color:#409EFF'>" +
      params.data.name +
      "</span><br />";
    htmlStr += "设备编号： " + params.data.serialNumber + "<br />";
    htmlStr += "设备状态： ";
    if (params.data.status == 1) {
      htmlStr += "<span style='color:#32CD32'>在线</span>" + "<br />";
    } else if (params.data.status == 2) {
      htmlStr += "<span style='color:#909399'>离线</span>" + "<br />";
    } else if (params.data.status == 3) {
      htmlStr += "<span style='color:#E6A23C'>禁用</span>" + "<br />";
    } else if (params.data.status == 4) {
      htmlStr += "<span style='color:#F56C6C'>报警</span>" + "<br />";
    }
    htmlStr += "固件版本： Version " + params.data.firmwareVersion + "<br />";
    htmlStr += "激活时间： " + params.data.activeTime + "<br />";
    htmlStr += "所在地址： " + params.data.networkAddress + "<br />";
    htmlStr += "</div>";
    return htmlStr;
  }
};
function getmap() {
  var myChart = echarts.init(document.getElementById("map"));
  var option;
  // 格式化数据
  var option;

  var data = [
    {
      devicename: "水流量传感器(FlowMeter-X100)",
      longitude: 120.2,
      latitude: 30.3,
      serialNumber: "D1PGLPG58K88",
      status: 1,
      firmwareVersion: "2.0",
      activeTime: "2023-11-05",
      networkAddress: "杭州上城区"
    }
  ];
  var convertData = function (data, status) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = [data[i].longitude, data[i].latitude];
      // var geoCoord = geoCoordMap[data[i].devicename];
      if (geoCoord && data[i].status == status) {
        res.push({
          name: data[i].devicename,
          value: geoCoord,
          serialNumber: data[i].serialNumber,
          status: data[i].status,
          firmwareVersion: data[i].firmwareVersion,
          networkAddress: data[i].networkAddress,
          activeTime: data[i].activeTime == null ? "" : data[i].activeTime
        });
      }
    }
    return res;
  };
  function renderItem(params, api) {
    var coords = [
      // [116.7, 39.53],
      // [103.73, 36.03],
      // [112.91, 27.87],
      // [120.65, 28.01],
      // [119.57, 39.95]
    ];
    var points = [];
    for (var i = 0; i < coords.length; i++) {
      points.push(api.coord(coords[i]));
    }
    var color = api.visual("color");
    return {
      type: "polygon",
      shape: {
        points: echarts.graphic.clipPointsByRect(points, {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
        })
      },
      style: api.style({
        fill: color,
        stroke: echarts.color.lift(color)
      })
    };
  }
  option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item"
    },
    bmap: {
      center: [120.21, 30.29],
      zoom: 15,
      roam: true,
      mapStyle: {}
    },
    series: [
      {
        name: "设备详情",
        type: "effectScatter",
        coordinateSystem: "bmap",
        showEffectOn: "render",
        rippleEffect: {
          //设置涟漪动画样式
          // color:'purple',  //涟漪颜色,默认为散点自身颜色
          brushType: "stroke", //动画方式,全填充或只有线条,'stroke'
          period: 4, //动画周期
          scale: "4" //涟漪规模
        },
        data: convertData(data, 1),
        encode: {
          value: 2
        },
        symbolSize: function (val) {
          return 20;
        },
        label: {
          formatter: "{b}",
          position: "right"
        },
        itemStyle: {
          color: "#32CD32"
        },
        emphasis: {
          label: {
            show: true
          }
        },
        tooltip
      },
      {
        name: "设备详情",
        type: "effectScatter",
        coordinateSystem: "bmap",
        // showEffectOn: "render",
        rippleEffect: {
          //设置涟漪动画样式
          // color:'purple',  //涟漪颜色,默认为散点自身颜色
          brushType: "fill", //动画方式,全填充或只有线条,'stroke'
          period: 4, //动画周期
          scale: "2" //涟漪规模
        },
        data: convertData(data, 2),
        encode: {
          value: 2
        },
        symbolSize: function (val) {
          return 20;
        },
        label: {
          formatter: "{b}",
          position: "right"
        },
        itemStyle: {
          color: "#909399"
        },
        emphasis: {
          label: {
            show: true
          }
        },
        tooltip
      },
      {
        name: "设备详情",
        type: "effectScatter",
        coordinateSystem: "bmap",
        // showEffectOn: "render",
        rippleEffect: {
          //设置涟漪动画样式
          // color:'purple',  //涟漪颜色,默认为散点自身颜色
          brushType: "fill", //动画方式,全填充或只有线条,'stroke'
          period: 4, //动画周期
          scale: "2" //涟漪规模
        },
        data: convertData(data, 3),
        encode: {
          value: 2
        },
        symbolSize: function (val) {
          return 20;
        },
        label: {
          formatter: "{b}",
          position: "right"
        },
        itemStyle: {
          color: "#E6A23C"
        },
        emphasis: {
          label: {
            show: true
          }
        },
        tooltip
      },
      {
        name: "设备详情",
        type: "effectScatter",
        coordinateSystem: "bmap",
        // showEffectOn: "render",
        rippleEffect: {
          //设置涟漪动画样式
          // color:'purple',  //涟漪颜色,默认为散点自身颜色
          brushType: "fill", //动画方式,全填充或只有线条,'stroke'
          period: 4, //动画周期
          scale: "3.5" //涟漪规模
        },
        data: convertData(data, 4),
        encode: {
          value: 2
        },
        symbolSize: function (val) {
          return 20;
        },
        label: {
          formatter: "{b}",
          position: "right"
        },
        itemStyle: {
          color: "#F56C6C"
        },
        emphasis: {
          label: {
            show: true
          }
        },
        tooltip
      }
    ]
  };

  option && myChart.setOption(option);
}
</script>
<!-- <template>{{ deviceNumber }}</template> -->
<template>
  <div class="outbox">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      size="large"
      status-icon
      style="width: 45%; height: 100%"
    >
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="ruleForm.name" disabled />
      </el-form-item>
      <el-form-item label="设备类型" prop="devicetype">
        <el-select v-model="ruleForm.devicetype" disabled>
          <el-option label="水流量检测器" value="Flowmeter" />
          <el-option label="温度传感器" value="temTransducer" />
          <el-option label="水压感应器" value="pressureSen" />
          <el-option label="水质传感器" value="waterQuaSen" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备编号" prop="deviceNum">
        <el-input v-model="ruleForm.deviceNum" disabled />
      </el-form-item>
      <el-form-item label="固件版本" prop="FirmwareVersion">
        <el-input v-model="ruleForm.FirmwareVersion" disabled />
      </el-form-item>
      <el-form-item label="启动状态" prop="delivery">
        <el-switch v-model="ruleForm.delivery" />
      </el-form-item>
      <el-form-item label="设备描述" prop="desc">
        <el-input
          v-model="ruleForm.desc"
          type="textarea"
          style="position: absolute; z-index: 9"
        />
      </el-form-item>
    </el-form>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      size="large"
      status-icon
      style="width: 45%"
    >
      <el-form-item label="定位方式" prop="TargetingMethod">
        <el-select v-model="ruleForm.TargetingMethod" disabled>
          <el-option label="自动定位" value="Flowmeter" />
          <el-option label="设备定位" value="temTransducer" />
          <el-option label="自定义定位" value="pressureSen" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备经度" prop="longitude">
        <el-input
          v-model="ruleForm.longitude"
          :disabled="ruleForm.TargetingMethod !== 'pressureSen'"
        />
      </el-form-item>
      <el-form-item label="设备维度" prop="dimension">
        <el-input
          v-model="ruleForm.dimension"
          :disabled="ruleForm.TargetingMethod !== 'pressureSen'"
        />
      </el-form-item>
      <el-form-item label="所在地址" prop="address">
        <el-input v-model="ruleForm.address" disabled />
      </el-form-item>
      <el-form-item label="入网地址" prop="accessAdress">
        <el-input v-model="ruleForm.accessAdress" disabled />
      </el-form-item>
      <el-form-item label="激活时间" prop="activation ">
        <el-input v-model="ruleForm.activation" disabled />
      </el-form-item>
    </el-form>
  </div>
  <div style="display: flex; justify-content: center; width: 100%">
    <div id="map" ref="map"></div>
  </div>
</template>
<style scoped lang="scss">
.outbox {
  display: flex;
}
#map {
  width: 80%;
  height: 438px;
}
</style>
<style lang="scss">
.mapcontain {
  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
